/**
 * Socket Layer - Main Entry Point
 * 
 * Registers all socket event handlers in a modular, domain-driven structure
 * 
 * @module socket
 */

const logger = require('../../utils/logger');
const registerMessageHandlers = require('./handlers/messages.socket');
const registerMeetingHandlers = require('./handlers/meetings.socket');
const registerHuddleHandlers = require('./handlers/huddles.socket');
const registerPresenceHandlers = require('./handlers/presence.socket');
const registerAdminHandlers = require('./handlers/admin.socket');
const registerPollHandlers = require('./handlers/polls.socket');

/**
 * Register all socket handlers
 * @param {Server} io - Socket.io server instance
 * @param {Socket} socket - Individual socket connection
 */
function registerSocketHandlers(io, socket) {
    logger.socket(`✅ Socket connected: ${socket.user.id}`);
    logger.socket(`🔍 [Socket] Socket ID: ${socket.id}`);
    logger.socket(`🔍 [Socket] Registering handlers for user: ${socket.user.id}`);

    // User joins their personal room for notifications
    socket.join(`user:${socket.user.id}`);

    // Register domain-specific handlers
    logger.socket(`📝 [Socket] Registering message handlers...`);
    registerMessageHandlers(io, socket);
    logger.socket(`✅ [Socket] Message handlers registered`);

    registerMeetingHandlers(io, socket);
    registerHuddleHandlers(io, socket);
    registerPresenceHandlers(io, socket);
    registerAdminHandlers(io, socket);
    registerPollHandlers(io, socket);

    logger.socket(`🎯 [Socket] All handlers registered for ${socket.user.id}`);

    // Handle disconnection
    socket.on('disconnect', () => {
        logger.socket(`❌ Socket disconnected: ${socket.user.id}`);

        // Broadcast offline status
        io.emit('user:offline', {
            userId: socket.user.id,
            lastSeen: new Date()
        });
    });

    // ============================================================
    // PHASE 0 DAY 2: Socket Event Schema Validation
    // ============================================================
    // Validate ALL incoming socket events against base schema
    const { BaseSocketEvent } = require('./schema/baseEvent.schema');

    socket.onAny((eventName, ...args) => {
        // Skip internal Socket.IO events
        if (eventName.startsWith('socket:') || eventName === 'disconnect' || eventName === 'error') {
            return;
        }

        // Validate event structure
        const eventData = args[0]; // First argument is usually the event data

        if (typeof eventData === 'object' && eventData !== null) {
            const result = BaseSocketEvent.safeParse(eventData);

            if (!result.success) {
                console.error(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
                console.error(`🚫 [SOCKET VALIDATION] Event validation FAILED`);
                console.error(`   ├─ Event: ${eventName}`);
                console.error(`   ├─ User: ${socket.user?.id || 'unknown'}`);
                console.error(`   ├─ Socket ID: ${socket.id}`);
                console.error(`   ├─ Validation errors:`);
                result.error.issues.forEach((issue, idx) => {
                    console.error(`   │  ${idx + 1}. ${issue.path.join('.')} - ${issue.message}`);
                });
                console.error(`   └─ Event REJECTED (not processed)`);
                console.error(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);

                // Optionally emit error back to client
                socket.emit('validation:error', {
                    event: eventName,
                    errors: result.error.issues.map(i => ({
                        path: i.path.join('.'),
                        message: i.message
                    }))
                });

                return; // Stop processing invalid event
            }

            logger.socket(`✅ [Socket Validation] Event "${eventName}" passed validation`);
        }
    });
    // ============================================================

    // Handle errors
    socket.on('error', (error) => {
        console.error(`Socket error for user ${socket.user.id}:`, error);
    });
}

module.exports = registerSocketHandlers;
