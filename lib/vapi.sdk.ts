import Vapi from '@vapi-ai/web'

console.log('🔍 DEBUG: Vapi import successful:', Vapi);
console.log('🔍 DEBUG: Vapi constructor:', typeof Vapi);

let vapiInstance: any;

try {
    vapiInstance = new Vapi(process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN!);
    console.log('🔍 DEBUG: Vapi instance created:', vapiInstance);
} catch (error) {
    console.error('❌ ERROR: Failed to create Vapi instance:', error);
    vapiInstance = null;
}

export const vapi = vapiInstance;
