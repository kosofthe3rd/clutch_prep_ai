import Vapi from '@vapi-ai/web';

// Fix for Vapi constructor issue
const VapiConstructor = (Vapi as any).default || Vapi;
export const vapi = new VapiConstructor(process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN!);

