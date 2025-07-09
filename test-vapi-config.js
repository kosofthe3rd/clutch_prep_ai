// Test Vapi Configuration
console.log('🧪 Testing Vapi Configuration...\n');

// Check environment variables
const envVars = {
    'NEXT_PUBLIC_VAPI_WEB_TOKEN': process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN,
    'NEXT_PUBLIC_VAPI_WORKFLOW_ID': process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID
};

console.log('📋 Environment Variables Check:');
Object.entries(envVars).forEach(([key, value]) => {
    const status = value ? '✅ Set' : '❌ Missing';
    const preview = value ? `${value.substring(0, 10)}...` : 'undefined';
    console.log(`  ${key}: ${status} (${preview})`);
});

// Check if we're in browser or Node environment
const isBrowser = typeof window !== 'undefined';
console.log(`\n🌐 Environment: ${isBrowser ? 'Browser' : 'Node.js'}`);

// Test Vapi import
try {
    const Vapi = require('@vapi-ai/web');
    console.log('\n📦 Vapi Package Import: ✅ Success');
    console.log('  - Package type:', typeof Vapi);
    console.log('  - Has default export:', !!Vapi.default);
    console.log('  - Is constructor:', typeof Vapi.default === 'function');
} catch (error) {
    console.log('\n📦 Vapi Package Import: ❌ Failed');
    console.log('  - Error:', error.message);
}

// Test Vapi initialization
try {
    const Vapi = require('@vapi-ai/web');
    const token = process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN;
    
    if (token) {
        const vapi = new Vapi(token);
        console.log('\n🔧 Vapi Instance Creation: ✅ Success');
        console.log('  - Instance type:', typeof vapi);
        console.log('  - Has start method:', typeof vapi.start === 'function');
        console.log('  - Has stop method:', typeof vapi.stop === 'function');
        console.log('  - Has on method:', typeof vapi.on === 'function');
    } else {
        console.log('\n🔧 Vapi Instance Creation: ⚠️ Skipped (no token)');
    }
} catch (error) {
    console.log('\n🔧 Vapi Instance Creation: ❌ Failed');
    console.log('  - Error:', error.message);
}

console.log('\n✨ Configuration test completed!'); 