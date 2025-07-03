// Test script to check environment variables
console.log('🧪 Testing environment variables...');

// Check if we're in a browser environment
if (typeof window !== 'undefined') {
    console.log('🌐 Browser environment detected');
    console.log('NEXT_PUBLIC_VAPI_WEB_TOKEN:', process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN ? '✅ Set' : '❌ Missing');
    console.log('NEXT_PUBLIC_VAPI_WORKFLOW_ID:', process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID ? '✅ Set' : '❌ Missing');
} else {
    console.log('🖥️ Node.js environment detected');
    console.log('NEXT_PUBLIC_VAPI_WEB_TOKEN:', process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN ? '✅ Set' : '❌ Missing');
    console.log('NEXT_PUBLIC_VAPI_WORKFLOW_ID:', process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID ? '✅ Set' : '❌ Missing');
}

console.log('🔍 All environment variables:');
Object.keys(process.env).forEach(key => {
    if (key.includes('VAPI') || key.includes('NEXT_PUBLIC')) {
        console.log(`  ${key}: ${process.env[key] ? '✅ Set' : '❌ Missing'}`);
    }
}); 