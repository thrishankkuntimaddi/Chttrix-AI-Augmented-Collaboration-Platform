/**
 * Deprecation Middleware - PHASE 0
 * 
 * Adds deprecation headers to all legacy API routes
 * to signal transition to /api/v2 architecture
 * 
 * Effective: 2026-01-31
 */

module.exports = (req, res, next) => {
    res.setHeader(
        'X-Deprecation-Warning',
        'This endpoint is deprecated. Use /api/v2/* routes.'
    );
    res.setHeader('X-Migration-Deadline', '2026-03-01');
    res.setHeader('X-New-Architecture', '/server/src');

    next();
};
