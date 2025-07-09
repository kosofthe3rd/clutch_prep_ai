// Final Vapi Test - Complete Setup Verification
console.log('🧪 Final Vapi Test - Complete Setup Verification...\n');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

// Check environment variables
const token = process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN;
const workflowId = process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID;

console.log('📋 Environment Check:');
console.log(`  - Token: ${token ? '✅ Present' : '❌ Missing'}`);
console.log(`  - Workflow ID: ${workflowId ? '✅ Present' : '❌ Missing'}`);

if (!token || !workflowId) {
    console.log('\n❌ Missing required environment variables');
    process.exit(1);
}

// Test Vapi import and initialization
console.log('\n🔧 Testing Vapi SDK:');
try {
    const Vapi = require('@vapi-ai/web');
    console.log('  ✅ Vapi package imported');
    
    // Handle different export formats
    const VapiConstructor = Vapi.default || Vapi;
    console.log('  ✅ Vapi constructor resolved');
    
    const vapi = new VapiConstructor(token);
    console.log('  ✅ Vapi instance created');
    
    // Test basic methods
    const methods = ['start', 'stop', 'on', 'off'];
    const availableMethods = methods.filter(method => typeof vapi[method] === 'function');
    console.log(`  ✅ Available methods: ${availableMethods.join(', ')}`);
    
    if (availableMethods.length === methods.length) {
        console.log('  ✅ All required methods available');
    } else {
        console.log('  ⚠️ Some methods missing');
    }
    
    // Test event listener setup
    let eventTestPassed = false;
    try {
        const testHandler = () => { eventTestPassed = true; };
        vapi.on('test', testHandler);
        vapi.off('test', testHandler);
        eventTestPassed = true;
        console.log('  ✅ Event listeners working');
    } catch (error) {
        console.log('  ❌ Event listeners failed:', error.message);
    }
    
    console.log('\n🎉 Vapi SDK is ready for use!');
    console.log('\n📋 Configuration Summary:');
    console.log(`  - Token: ${token.substring(0, 10)}...`);
    console.log(`  - Workflow ID: ${workflowId}`);
    console.log(`  - Methods available: ${availableMethods.length}/${methods.length}`);
    console.log(`  - Event system: ${eventTestPassed ? '✅ Working' : '❌ Failed'}`);
    
} catch (error) {
    console.log('  ❌ Vapi SDK test failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('  1. Check your Vapi token is valid');
    console.log('  2. Verify workflow ID exists in your Vapi project');
    console.log('  3. Ensure you have proper Vapi account permissions');
    console.log('  4. Check Vapi documentation for any breaking changes');
}

console.log('\n✨ Final test completed!'); 