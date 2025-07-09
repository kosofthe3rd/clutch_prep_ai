// Browser-specific Vapi test
console.log('🧪 Testing Vapi in Browser Environment...\n');

// Check if we're in browser
if (typeof window === 'undefined') {
    console.log('❌ This script should run in browser environment');
    process.exit(1);
}

console.log('🌐 Browser Environment: ✅ Detected');

// Check environment variables (these should be available in browser)
const envVars = {
    'NEXT_PUBLIC_VAPI_WEB_TOKEN': process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN,
    'NEXT_PUBLIC_VAPI_WORKFLOW_ID': process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID
};

console.log('\n📋 Environment Variables Check:');
Object.entries(envVars).forEach(([key, value]) => {
    const status = value ? '✅ Set' : '❌ Missing';
    const preview = value ? `${value.substring(0, 10)}...` : 'undefined';
    console.log(`  ${key}: ${status} (${preview})`);
});

// Test Vapi import in browser
try {
    // This would need to be imported via ES modules in browser
    console.log('\n📦 Vapi Browser Import: ⚠️ Requires ES module import');
    console.log('  - Use: import Vapi from "@vapi-ai/web"');
} catch (error) {
    console.log('\n📦 Vapi Browser Import: ❌ Failed');
    console.log('  - Error:', error.message);
}

// Check browser capabilities
console.log('\n🔍 Browser Capabilities:');
console.log('  - WebRTC supported:', !!navigator.mediaDevices);
console.log('  - Microphone access:', !!navigator.mediaDevices?.getUserMedia);
console.log('  - Audio context:', !!window.AudioContext || !!window.webkitAudioContext);

console.log('\n✨ Browser test completed!'); 