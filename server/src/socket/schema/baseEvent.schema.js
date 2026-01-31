/**
 * PHASE 0 DAY 2: Socket Event Schema Validation
 * 
 * Base Zod schemas for Socket.IO event validation
 * Ensures all socket events conform to expected structure
 * 
 * Effective: 2026-01-31
 */

const { z } = require('zod');

/**
 * Base socket event schema
 * All socket events should extend this schema
 */
const BaseSocketEvent = z.object({
    type: z.string().min(1, 'Event type is required'),
    payload: z.any().optional(),
    version: z.number().int().positive().default(1)
});

/**
 * Message event schema (for new message events)
 * 🔐 PHASE 1 DAY 6: Enhanced validation with E2EE requirements
 */
const MessageSocketEvent = z.object({
    type: z.literal('messages:new'),
    payload: z.object({
        channelId: z.string().min(1, 'Channel ID required'),
        workspaceId: z.string().min(1, 'Workspace ID required'),
        encryptedContent: z.string().min(1, 'Encrypted content required'), // E2EE ciphertext
        messageId: z.string().optional(),
        replyTo: z.string().optional(),
        // 🔐 E2EE-specific fields (PHASE 1 DAY 6)
        iv: z.string().optional(), // Initialization vector for AES-GCM
        authTag: z.string().optional(), // Authentication tag for AES-GCM
        algorithm: z.string().optional(), // Encryption algorithm identifier
        metadata: z.object({
            timestamp: z.number().int().positive().optional(),
            edited: z.boolean().optional(),
            attachmentCount: z.number().int().nonnegative().optional()
        }).optional()
    }),
    version: z.number().int().positive().default(1)
});

/**
 * Channel join event schema
 */
const ChannelJoinEvent = z.object({
    type: z.literal('channel:join'),
    payload: z.object({
        channelId: z.string().min(1),
        userId: z.string().min(1)
    }),
    version: z.number().int().positive().default(1)
});

/**
 * Typing indicator event schema
 */
const TypingEvent = z.object({
    type: z.literal('typing:start').or(z.literal('typing:stop')),
    payload: z.object({
        channelId: z.string().min(1),
        userId: z.string().min(1)
    }),
    version: z.number().int().positive().default(1)
});

/**
 * Presence update event schema
 * 🔐 PHASE 1 DAY 6: New schema for user presence tracking
 */
const PresenceUpdateEvent = z.object({
    type: z.literal('presence:update'),
    payload: z.object({
        userId: z.string().min(1, 'User ID required'),
        status: z.enum(['online', 'offline', 'away', 'busy'], {
            errorMap: () => ({ message: 'Status must be: online, offline, away, or busy' })
        }),
        timestamp: z.number().int().positive({
            message: 'Timestamp must be a positive integer'
        })
    }),
    version: z.number().int().positive().default(1)
});

module.exports = {
    BaseSocketEvent,
    MessageSocketEvent,
    ChannelJoinEvent,
    TypingEvent,
    PresenceUpdateEvent
};
