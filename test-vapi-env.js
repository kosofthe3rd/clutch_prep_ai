// Test Environment Variables Setup
console.log('🧪 Testing Environment Variables Setup...\n');

// Load dotenv if available
try {
    require('dotenv').config();
    console.log('📦 dotenv: ✅ Loaded');
} catch (error) {
    console.log('📦 dotenv: ⚠️ Not available (not critical)');
}

// Check for .env files
const fs = require('fs');
const path = require('path');

const envFiles = [
    '.env.local',
    '.env.development.local',
    '.env.development',
    '.env'
];

console.log('\n📁 Environment Files Check:');
envFiles.forEach(file => {
    const filePath = path.join(process.cwd(), file);
    const exists = fs.existsSync(filePath);
    console.log(`  ${file}: ${exists ? '✅ Found' : '❌ Missing'}`);
    
    if (exists) {
        const content = fs.readFileSync(filePath, 'utf8');
        const hasVapiToken = content.includes('NEXT_PUBLIC_VAPI_WEB_TOKEN');
        const hasWorkflowId = content.includes('NEXT_PUBLIC_VAPI_WORKFLOW_ID');
        console.log(`    - VAPI_TOKEN: ${hasVapiToken ? '✅ Present' : '❌ Missing'}`);
        console.log(`    - WORKFLOW_ID: ${hasWorkflowId ? '✅ Present' : '❌ Missing'}`);
    }
});

// Check current environment variables
console.log('\n🔍 Current Environment Variables:');
const vapiVars = [
    'NEXT_PUBLIC_VAPI_WEB_TOKEN',
    'NEXT_PUBLIC_VAPI_WORKFLOW_ID'
];

vapiVars.forEach(varName => {
    const value = process.env[varName];
    const status = value ? '✅ Set' : '❌ Missing';
    const preview = value ? `${value.substring(0, 15)}...` : 'undefined';
    console.log(`  ${varName}: ${status}`);
    console.log(`    Value: ${preview}`);
});

// Provide setup instructions
console.log('\n📋 Setup Instructions:');
console.log('1. Create a .env.local file in your project root');
console.log('2. Add the following variables:');
console.log('   NEXT_PUBLIC_VAPI_WEB_TOKEN=your_vapi_token_here');
console.log('   NEXT_PUBLIC_VAPI_WORKFLOW_ID=your_workflow_id_here');
console.log('3. Restart your development server');
console.log('4. Get your credentials from: https://console.vapi.ai/');

console.log('\n✨ Environment test completed!'); 