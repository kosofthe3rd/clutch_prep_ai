// Test Vapi Connection and Basic Functionality
console.log('🧪 Testing Vapi Connection...\n');

const Vapi = require('@vapi-ai/web');

// Configuration
const token = process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN;
const workflowId = process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID;

if (!token || !workflowId) {
    console.log('❌ Missing required environment variables:');
    console.log('  - NEXT_PUBLIC_VAPI_WEB_TOKEN:', token ? '✅' : '❌');
    console.log('  - NEXT_PUBLIC_VAPI_WORKFLOW_ID:', workflowId ? '✅' : '❌');
    process.exit(1);
}

console.log('📋 Configuration:');
console.log('  - Token:', token.substring(0, 10) + '...');
console.log('  - Workflow ID:', workflowId);
console.log('');

// Create Vapi instance
let vapi;
try {
    vapi = new Vapi(token);
    console.log('✅ Vapi instance created successfully');
} catch (error) {
    console.log('❌ Failed to create Vapi instance:', error.message);
    process.exit(1);
}

// Test event listeners
console.log('\n🎧 Testing event listeners...');
const testEvents = ['call-start', 'call-end', 'message', 'speech-start', 'speech-end', 'error'];

testEvents.forEach(event => {
    try {
        vapi.on(event, () => {});
        console.log(`  ✅ ${event}: Registered successfully`);
    } catch (error) {
        console.log(`  ❌ ${event}: Failed - ${error.message}`);
    }
});

// Test basic methods
console.log('\n🔧 Testing basic methods...');
const methods = ['start', 'stop', 'on', 'off'];

methods.forEach(method => {
    if (typeof vapi[method] === 'function') {
        console.log(`  ✅ ${method}(): Available`);
    } else {
        console.log(`  ❌ ${method}(): Not available`);
    }
});

console.log('\n✨ Connection test completed!');
console.log('\n💡 Next steps:');
console.log('  1. Run this in browser environment to test actual connection');
console.log('  2. Check browser console for any CORS or network errors');
console.log('  3. Verify your Vapi project settings and workflow configuration'); 