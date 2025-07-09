// Test Vapi SDK Functionality
console.log('🧪 Testing Vapi SDK Functionality...\n');

// Test 1: Import Vapi
console.log('📦 Test 1: Importing Vapi SDK');
try {
    const Vapi = require('@vapi-ai/web');
    console.log('  ✅ Import successful');
    console.log('  - Type:', typeof Vapi);
    console.log('  - Has default:', !!Vapi.default);
} catch (error) {
    console.log('  ❌ Import failed:', error.message);
    process.exit(1);
}

// Test 2: Check environment variables
console.log('\n🔧 Test 2: Environment Variables');
const token = process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN;
const workflowId = process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID;

console.log('  - Token:', token ? '✅ Present' : '❌ Missing');
console.log('  - Workflow ID:', workflowId ? '✅ Present' : '❌ Missing');

if (!token || !workflowId) {
    console.log('  ⚠️ Cannot proceed with SDK tests without credentials');
    console.log('  💡 Set up your .env.local file first');
    process.exit(0);
}

// Test 3: Create Vapi instance
console.log('\n🔧 Test 3: Creating Vapi Instance');
let vapi;
try {
    const Vapi = require('@vapi-ai/web');
    vapi = new Vapi(token);
    console.log('  ✅ Instance created successfully');
    console.log('  - Instance type:', typeof vapi);
} catch (error) {
    console.log('  ❌ Instance creation failed:', error.message);
    process.exit(1);
}

// Test 4: Check Vapi methods
console.log('\n🔧 Test 4: Checking Vapi Methods');
const requiredMethods = ['start', 'stop', 'on', 'off'];
const missingMethods = [];

requiredMethods.forEach(method => {
    if (typeof vapi[method] === 'function') {
        console.log(`  ✅ ${method}(): Available`);
    } else {
        console.log(`  ❌ ${method}(): Missing`);
        missingMethods.push(method);
    }
});

if (missingMethods.length > 0) {
    console.log(`  ⚠️ Missing methods: ${missingMethods.join(', ')}`);
}

// Test 5: Test event listener setup (without actually starting)
console.log('\n🔧 Test 5: Testing Event Listeners');
try {
    let eventCount = 0;
    
    const testHandler = () => {
        eventCount++;
        console.log(`  ✅ Event handler called (${eventCount})`);
    };
    
    vapi.on('test-event', testHandler);
    console.log('  ✅ Event listener added');
    
    // Clean up
    vapi.off('test-event', testHandler);
    console.log('  ✅ Event listener removed');
    
} catch (error) {
    console.log('  ❌ Event listener test failed:', error.message);
}

// Test 6: Validate token format (basic check)
console.log('\n🔧 Test 6: Token Validation');
if (token) {
    const tokenLength = token.length;
    console.log(`  - Token length: ${tokenLength} characters`);
    
    if (tokenLength < 10) {
        console.log('  ⚠️ Token seems too short');
    } else if (tokenLength > 100) {
        console.log('  ⚠️ Token seems too long');
    } else {
        console.log('  ✅ Token length looks reasonable');
    }
    
    // Check if it looks like a JWT or API key
    if (token.includes('.')) {
        console.log('  ✅ Token format looks like JWT');
    } else if (token.length > 20) {
        console.log('  ✅ Token format looks like API key');
    } else {
        console.log('  ⚠️ Token format unclear');
    }
}

console.log('\n✨ SDK test completed!');
console.log('\n📋 Next Steps:');
console.log('1. If all tests passed, your Vapi SDK is ready');
console.log('2. Test in browser environment with actual call');
console.log('3. Check browser console for any runtime errors'); 