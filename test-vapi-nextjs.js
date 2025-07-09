// Test Vapi with Next.js environment loading
console.log('🧪 Testing Vapi with Next.js Environment...\n');

// Method 1: Try loading with dotenv directly
console.log('📦 Method 1: Direct dotenv loading');
try {
    require('dotenv').config({ path: '.env.local' });
    console.log('  ✅ dotenv loaded .env.local');
} catch (error) {
    console.log('  ❌ dotenv failed:', error.message);
}

// Method 2: Try loading with dotenv-expand for Next.js compatibility
console.log('\n📦 Method 2: dotenv-expand loading');
try {
    const dotenv = require('dotenv');
    const dotenvExpand = require('dotenv-expand');
    
    const env = dotenv.config({ path: '.env.local' });
    dotenvExpand.expand(env);
    console.log('  ✅ dotenv-expand loaded .env.local');
} catch (error) {
    console.log('  ⚠️ dotenv-expand not available or failed:', error.message);
}

// Method 3: Manual file reading
console.log('\n📦 Method 3: Manual file reading');
try {
    const fs = require('fs');
    const path = require('path');
    
    const envPath = path.join(process.cwd(), '.env.local');
    if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, 'utf8');
        const lines = content.split('\n');
        
        lines.forEach(line => {
            const trimmed = line.trim();
            if (trimmed && !trimmed.startsWith('#')) {
                const [key, ...valueParts] = trimmed.split('=');
                if (key && valueParts.length > 0) {
                    const value = valueParts.join('=').replace(/^["']|["']$/g, '');
                    process.env[key] = value;
                    console.log(`  ✅ Loaded: ${key}=${value.substring(0, 10)}...`);
                }
            }
        });
    } else {
        console.log('  ❌ .env.local file not found');
    }
} catch (error) {
    console.log('  ❌ Manual loading failed:', error.message);
}

// Check environment variables after loading
console.log('\n🔍 Environment Variables After Loading:');
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

// Test Vapi SDK if variables are loaded
const token = process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN;
const workflowId = process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID;

if (token && workflowId) {
    console.log('\n🔧 Testing Vapi SDK with loaded variables:');
    try {
        const Vapi = require('@vapi-ai/web');
        const vapi = new Vapi(token);
        console.log('  ✅ Vapi instance created successfully');
        console.log('  - Token length:', token.length);
        console.log('  - Workflow ID:', workflowId);
        console.log('  - SDK ready for use');
    } catch (error) {
        console.log('  ❌ Vapi SDK test failed:', error.message);
    }
} else {
    console.log('\n⚠️ Cannot test Vapi SDK - variables still missing');
}

console.log('\n✨ Next.js environment test completed!'); 