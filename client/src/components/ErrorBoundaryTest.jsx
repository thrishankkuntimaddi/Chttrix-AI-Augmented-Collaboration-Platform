// PHASE 0 DAY 3: ErrorBoundary Test Component
// 
// Temporary test to verify ErrorBoundary catches React errors
// DELETE AFTER VERIFICATION
//
// Usage: Import and render this component anywhere in the app

import { useEffect } from 'react';

export default function ErrorBoundaryTest() {
    useEffect(() => {
        // Force React error to test ErrorBoundary
        throw new Error('PHASE_0_DAY_3_UI_TEST - Intentional error to verify ErrorBoundary');
    }, []);

    return null;
}

// To test:
// 1. Import this component in any route
// 2. Render <ErrorBoundaryTest />
// 3. Navigate to that route
// 4. Expected: ErrorBoundary fallback UI shows (not white screen)
// 5. Check console for error log
// 6. DELETE this file after verification
