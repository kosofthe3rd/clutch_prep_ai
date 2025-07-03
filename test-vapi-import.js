// Test Vapi import
console.log('🧪 Testing Vapi import...');

try {
    const Vapi = require('@vapi-ai/web');
    console.log('✅ Vapi import successful:', Vapi);
    console.log('Vapi type:', typeof Vapi);
    console.log('Vapi default:', Vapi.default);
    console.log('Is constructor:', typeof Vapi.default === 'function');
    
    if (typeof Vapi.default === 'function') {
        console.log('✅ Vapi is a constructor - import is working correctly');
    } else {
        console.log('❌ Vapi is not a constructor');
    }
} catch (error) {
    console.error('❌ Vapi import failed:', error);
} 