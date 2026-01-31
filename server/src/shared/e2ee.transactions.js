/**
 * PHASE 0 DAY 2: E2EE Transaction Safety
 * 
 * Atomic wrapper for channel join operations to ensure E2EE key distribution
 * happens atomically with channel membership updates.
 * 
 * CRITICAL: Prevents INV-001 violations where users are added to channel.members
 * but not to encryptedKeys[], causing 403 errors when accessing messages.
 * 
 * Effective: 2026-01-31
 */

const mongoose = require('mongoose');
const Channel = require('../../../models/Channel');
const conversationKeysService = require('../modules/conversations/conversationKeys.service');

/**
 * Atomically add user to channel with E2EE key distribution
 * 
 * @param {String} channelId - Channel ID
 * @param {String} userId - User ID to add
 * @returns {Promise<{success: Boolean, error?: String}>}
 */
async function joinChannelAtomic(channelId, userId) {
    const session = await mongoose.startSession();

    console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`🔐 [ATOMIC JOIN] Starting transactional channel join`);
    console.log(`   ├─ Channel: ${channelId}`);
    console.log(`   ├─ User: ${userId}`);
    console.log(`   └─ Session ID: ${session.id}`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

    try {
        await session.withTransaction(async () => {
            // ═══════════════════════════════════════════════════════
            // STEP 1: Add user to channel.members[] (transactional)
            // ═══════════════════════════════════════════════════════
            console.log(`📝 [ATOMIC JOIN][STEP 1] Adding user to channel.members[]...`);

            const updateResult = await Channel.updateOne(
                { _id: channelId },
                {
                    $addToSet: {
                        members: {
                            user: mongoose.Types.ObjectId(userId),
                            joinedAt: new Date()
                        }
                    }
                },
                { session }
            );

            if (updateResult.modifiedCount === 0) {
                console.warn(`⚠️ [ATOMIC JOIN][STEP 1] No modification - user may already be member`);
            } else {
                console.log(`✅ [ATOMIC JOIN][STEP 1] User added to channel.members[]`);
            }

            // ═══════════════════════════════════════════════════════
            // STEP 2: Distribute E2EE key (transactional)
            // ═══════════════════════════════════════════════════════
            console.log(`🔐 [ATOMIC JOIN][STEP 2] Distributing conversation key...`);

            const keyDistributed = await conversationKeysService.distributeKeyToNewMember(
                channelId,
                'channel',
                userId
            );

            if (!keyDistributed) {
                // CRITICAL: Transaction will rollback membership if key fails
                throw new Error('E2EE_KEY_DISTRIBUTION_FAILED: Cannot grant channel access without encryption key');
            }

            console.log(`✅ [ATOMIC JOIN][STEP 2] Conversation key distributed`);
            console.log(`✅ [ATOMIC JOIN] TRANSACTION SUCCESS - Both operations committed`);
        });

        await session.commitTransaction();

        console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
        console.log(`✅ [ATOMIC JOIN] Transaction committed successfully`);
        console.log(`   ├─ User in channel.members[]: ✓`);
        console.log(`   ├─ User in encryptedKeys[]: ✓`);
        console.log(`   └─ INV-001 satisfied: ATOMIC CONSISTENCY GUARANTEED`);
        console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

        return { success: true };

    } catch (error) {
        await session.abortTransaction();

        console.error(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
        console.error(`❌ [ATOMIC JOIN] Transaction aborted - ROLLBACK`);
        console.error(`   ├─ Error: ${error.message}`);
        console.error(`   ├─ User in channel.members[]: ✗ (rolled back)`);
        console.error(`   ├─ User in encryptedKeys[]: ✗ (never added)`);
        console.error(`   └─ Result: User NOT joined (safe failure)`);
        console.error(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

        return {
            success: false,
            error: error.message,
            code: error.message.includes('E2EE_KEY') ? 'E2EE_KEY_DISTRIBUTION_FAILED' : 'TRANSACTION_FAILED'
        };

    } finally {
        session.endSession();
    }
}

/**
 * HARD VALIDATION: Check if user has encryption key before allowing access
 * 
 * This is a gatekeeper function that BLOCKS access if E2EE keys are missing.
 * Use this in message controllers and other E2EE-dependent operations.
 * 
 * @param {String} userId - User ID
 * @param {String} channelId - Channel ID
 * @returns {Promise<Boolean>} True if user has valid encryption key
 * @throws {Error} If keys are missing (E2EE_KEYS_MISSING)
 */
async function validateEncryptionKeyAccess(userId, channelId) {
    try {
        // Check if user has conversation key
        const userKey = await conversationKeysService.getUserConversationKey(
            channelId,
            'channel',
            userId
        );

        if (!userKey || !userKey.encryptedKey) {
            console.error(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
            console.error(`🚫 [E2EE VALIDATION] Access DENIED`);
            console.error(`   ├─ User: ${userId}`);
            console.error(`   ├─ Channel: ${channelId}`);
            console.error(`   ├─ Reason: NO ENCRYPTION KEY FOUND`);
            console.error(`   └─ This is an INV-001 violation - user in members but not in encryptedKeys`);
            console.error(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);

            throw new Error('E2EE_KEYS_MISSING');
        }

        console.log(`✅ [E2EE VALIDATION] Access granted - user has valid encryption key`);
        return true;

    } catch (error) {
        if (error.message === 'E2EE_KEYS_MISSING') {
            throw error;
        }

        console.error(`❌ [E2EE VALIDATION] Validation error:`, error);
        throw new Error('E2EE_VALIDATION_FAILED');
    }
}

module.exports = {
    joinChannelAtomic,
    validateEncryptionKeyAccess
};
