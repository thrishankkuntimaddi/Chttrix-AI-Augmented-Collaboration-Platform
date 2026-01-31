/**
 * PHASE 0 DAY 3: E2EE Atomic Rollback Test
 * 
 * Simulates transaction failure to verify rollback works correctly
 * 
 * TEMPORARY TEST CODE - DELETE AFTER VERIFICATION
 */

const mongoose = require('mongoose');
const { joinChannelAtomic } = require('../src/shared/e2ee.transactions');
const Channel = require('../models/Channel');
const ConversationKey = require('../models/ConversationKey');

async function testAtomicRollback() {
    try {
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('🧪 PHASE 0 DAY 3: E2EE Atomic Rollback Test');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');

        // Find a test channel (use a public channel for testing)
        const testChannel = await Channel.findOne({ isPrivate: false })
            .select('_id name members workspace')
            .lean();

        if (!testChannel) {
            console.error('❌ No test channel found');
            process.exit(1);
        }

        console.log(`📋 Test channel: ${testChannel.name} (${testChannel._id})`);
        console.log(`   Current members: ${testChannel.members.length}\n`);

        // Create a fake test user ID (doesn't need to exist for this test)
        const testUserId = new mongoose.Types.ObjectId().toString();
        console.log(`👤 Test user ID: ${testUserId}\n`);

        // Record state BEFORE transaction
        console.log('📸 BEFORE TRANSACTION:');
        const channelBefore = await Channel.findById(testChannel._id).select('members').lean();
        const keysBefore = await ConversationKey.findOne({
            conversationId: testChannel._id,
            conversationType: 'channel'
        }).lean();

        const memberCountBefore = channelBefore.members.length;
        const keyCountBefore = keysBefore ? keysBefore.encryptedKeys.length : 0;

        console.log(`   Members in channel: ${memberCountBefore}`);
        console.log(`   Keys in encryptedKeys[]: ${keyCountBefore}\n`);

        // INJECT FAILURE by monkey-patching the distributeKeyToNewMember function
        const conversationKeysService = require('../src/modules/conversations/conversationKeys.service');
        const originalDistribute = conversationKeysService.distributeKeyToNewMember;

        conversationKeysService.distributeKeyToNewMember = async () => {
            console.log('💉 INJECTED FAILURE: Simulating key distribution error\n');
            throw new Error('SIMULATED_KEY_DISTRIBUTION_FAILURE');
        };

        // Attempt atomic join (should fail and rollback)
        console.log('🔄 Attempting atomic channel join (will fail)...\n');
        const result = await joinChannelAtomic(testChannel._id, testUserId);

        console.log('Result:', result);

        // Restore original function
        conversationKeysService.distributeKeyToNewMember = originalDistribute;

        // Record state AFTER transaction
        console.log('\n📸 AFTER TRANSACTION:');
        const channelAfter = await Channel.findById(testChannel._id).select('members').lean();
        const keysAfter = await ConversationKey.findOne({
            conversationId: testChannel._id,
            conversationType: 'channel'
        }).lean();

        const memberCountAfter = channelAfter.members.length;
        const keyCountAfter = keysAfter ? keysAfter.encryptedKeys.length : 0;

        console.log(`   Members in channel: ${memberCountAfter}`);
        console.log(`   Keys in encryptedKeys[]: ${keyCountAfter}\n`);

        // Verify rollback
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('📊 VERIFICATION RESULTS:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        const memberCountSame = memberCountBefore === memberCountAfter;
        const keyCountSame = keyCountBefore === keyCountAfter;
        const noPartialState = memberCountSame && keyCountSame;

        console.log(`✓ Member count unchanged: ${memberCountSame ? '✅ PASS' : '❌ FAIL'}`);
        console.log(`   Before: ${memberCountBefore}, After: ${memberCountAfter}`);
        console.log(`✓ Key count unchanged: ${keyCountSame ? '✅ PASS' : '❌ FAIL'}`);
        console.log(`   Before: ${keyCountBefore}, After: ${keyCountAfter}`);
        console.log(`✓ No partial state: ${noPartialState ? '✅ PASS' : '❌ FAIL'}`);
        console.log(`✓ Transaction failed safely: ${!result.success ? '✅ PASS' : '❌ FAIL'}\n`);

        if (noPartialState && !result.success) {
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.log('✅ ATOMIC ROLLBACK TEST PASSED');
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
            console.log('Transaction correctly rolled back membership on key failure.');
            console.log('No orphaned members. System is atomic and safe.\n');
            process.exit(0);
        } else {
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.log('❌ ATOMIC ROLLBACK TEST FAILED');
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
            process.exit(1);
        }

    } catch (error) {
        console.error('\n❌ Test script error:', error);
        process.exit(1);
    } finally {
        await mongoose.disconnect();
    }
}

// Run test
testAtomicRollback();
