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
 */
const MessageSocketEvent = z.object({
    type: z.literal('messages:new'),
    payload: z.object({
        channelId: z.string().min(1),
        workspaceId: z.string().min(1),
        encryptedContent: z.string().min(1), // E2EE encrypted message
        messageId: z.string().optional(),
        replyTo: z.string().optional(),
        metadata: z.any().optional()
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

module.exports = {
    BaseSocketEvent,
    MessageSocketEvent,
    ChannelJoinEvent,
    TypingEvent
};
