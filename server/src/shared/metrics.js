/**
 * PHASE 2 DAY 2: Metrics Collection Infrastructure
 * 
 * Simple in-memory counters for observability
 * Production: Replace with Prometheus/StatsD/CloudWatch
 */

const metrics = {
    counters: {},
    gauges: {}
};

/**
 * Increment a counter
 */
function incrementCounter(name, labels = {}) {
    const key = generateKey(name, labels);
    if (!metrics.counters[key]) {
        metrics.counters[key] = { count: 0, labels };
    }
    metrics.counters[key].count++;

    // Log metric for immediate visibility
    console.log(JSON.stringify({
        timestamp: new Date().toISOString(),
        level: 'METRIC',
        type: 'counter',
        name: name,
        labels: labels,
        value: metrics.counters[key].count
    }));
}

/**
 * Set a gauge value
 */
function setGauge(name, value, labels = {}) {
    const key = generateKey(name, labels);
    metrics.gauges[key] = { value, labels };

    console.log(JSON.stringify({
        timestamp: new Date().toISOString(),
        level: 'METRIC',
        type: 'gauge',
        name: name,
        labels: labels,
        value: value
    }));
}

/**
 * Get all metrics (for /metrics endpoint)
 */
function getAllMetrics() {
    return {
        counters: metrics.counters,
        gauges: metrics.gauges,
        timestamp: new Date().toISOString()
    };
}

/**
 * Reset all metrics (for testing)
 */
function resetMetrics() {
    metrics.counters = {};
    metrics.gauges = {};
}

function generateKey(name, labels) {
    const labelStr = Object.keys(labels)
        .sort()
        .map(k => `${k}=${labels[k]}`)
        .join(',');
    return labelStr ? `${name}{${labelStr}}` : name;
}

module.exports = {
    incrementCounter,
    setGauge,
    getAllMetrics,
    resetMetrics
};
