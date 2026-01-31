#!/usr/bin/env node
/**
 * PHASE 0 DAY 3: Legacy Deprecation Header Verification
 * 
 * Tests all legacy API routes to ensure deprecation headers are present
 * 
 * Usage: node scripts/verify-legacy-deprecation.js
 */

const http = require('http');

const LEGACY_ROUTES = [
    '/api/auth',
    '/api/messages',
    '/api/channels',
    '/api/users',
    '/api/workspaces',
    '/api/polls',
    '/api/tasks',
    '/api/notes',
    '/api/analytics',
    '/api/search',
    '/api/dashboard',
    '/api/favorites',
    '/api/audit'
];

const REQUIRED_HEADERS = [
    'x-deprecation-warning',
    'x-migration-deadline',
    'x-new-architecture'
];

async function testRoute(path) {
    return new Promise((resolve) => {
        const options = {
            hostname: 'localhost',
            port: 5000,
            path,
            method: 'GET'
        };

        const req = http.request(options, (res) => {
            const headers = {};
            REQUIRED_HEADERS.forEach(h => {
                headers[h] = res.headers[h] || null;
            });

            resolve({
                path,
                status: res.statusCode,
                headers,
                passed: REQUIRED_HEADERS.every(h => res.headers[h] !== undefined)
            });
        });

        req.on('error', (err) => {
            resolve({
                path,
                error: err.message,
                passed: false
            });
        });

        req.end();
    });
}

async function main() {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🧪 PHASE 0 DAY 3: Legacy Deprecation Header Verification');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    const results = [];

    for (const route of LEGACY_ROUTES) {
        const result = await testRoute(route);
        results.push(result);

        if (result.error) {
            console.log(`❌ ${route}`);
            console.log(`   Error: ${result.error}\n`);
        } else if (result.passed) {
            console.log(`✅ ${route}`);
            console.log(`   Status: ${result.status}`);
            console.log(`   X-Deprecation-Warning: ${result.headers['x-deprecation-warning']}`);
            console.log(`   X-Migration-Deadline: ${result.headers['x-migration-deadline']}`);
            console.log(`   X-New-Architecture: ${result.headers['x-new-architecture']}\n`);
        } else {
            console.log(`⚠️  ${route}`);
            console.log(`   Status: ${result.status}`);
            console.log(`   Missing headers:`);
            REQUIRED_HEADERS.forEach(h => {
                if (!result.headers[h]) {
                    console.log(`      - ${h}`);
                }
            });
            console.log();
        }
    }

    // Summary
    const passed = results.filter(r => r.passed).length;
    const total = results.length;

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 SUMMARY');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`Total routes tested: ${total}`);
    console.log(`Passed: ${passed}`);
    console.log(`Failed: ${total - passed}`);
    console.log(`Success rate: ${Math.round((passed / total) * 100)}%`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    if (passed === total) {
        console.log('✅ ALL LEGACY ROUTES HAVE DEPRECATION HEADERS\n');
        process.exit(0);
    } else {
        console.log('❌ SOME ROUTES MISSING DEPRECATION HEADERS\n');
        process.exit(1);
    }
}

main().catch(err => {
    console.error('Script error:', err);
    process.exit(1);
});
