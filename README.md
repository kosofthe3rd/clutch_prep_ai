# ClutchPrep-AI

An AI-powered interview practice platform built with Next.js, Firebase, and Vapi.

## Features

- 🤖 AI-powered interview practice with voice interaction
- 🔐 User authentication with Firebase
- 📝 Interview question generation using Google AI
- 🎯 Behavioral and technical interview questions
- 📊 Interview history and progress tracking
- 🎨 Modern, responsive UI with glassmorphism effects

## Getting Started

### Prerequisites

- Node.js 18+ 
- Firebase project
- Vapi account
- Google AI API key

### Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```bash
# Vapi Configuration (Required for AI interviews)
NEXT_PUBLIC_VAPI_WEB_TOKEN=your_vapi_web_token_here
NEXT_PUBLIC_VAPI_WORKFLOW_ID=your_vapi_workflow_id_here

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin (server-side)
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_service_account_email
FIREBASE_PRIVATE_KEY=your_private_key

# Google AI (for interview question generation)
GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_api_key
```

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Vapi Setup

To use the AI interview feature, you need to:

1. Sign up at [Vapi Console](https://console.vapi.ai/)
2. Create a new project
3. Get your web token from the project settings
4. Create a workflow for interview questions
5. Add the token and workflow ID to your `.env.local` file

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Vapi Documentation](https://docs.vapi.ai/)
- [Google AI Documentation](https://ai.google.dev/)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
