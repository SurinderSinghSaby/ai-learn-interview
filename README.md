AI Interview Practice Platform
## Introduction
This is a Next.js application designed to help users prepare for job interviews through interactive, AI-powered mock sessions. It provides a realistic voice-based interview experience, generates custom questions based on job roles, and offers detailed feedback to help users improve.

## Features

-   **Interactive AI Interviews**: Engage in real-time voice conversations with an AI interviewer powered by Vapi AI.
-   **Dynamic Interview Generation**: Create custom mock interviews by specifying the job role, experience level, required tech stack, and desired question types (technical, behavioral, or mixed).
-   **Automated, In-depth Feedback**: Receive a comprehensive performance analysis after each interview, including a total score, category-based ratings (e.g., communication, technical knowledge), a list of strengths, and areas for improvement.
-   **Personalized Dashboard**: View and track your history of completed interviews and browse a list of available interviews to take.
-   **User Authentication**: Secure sign-up and sign-in functionality managed with Firebase Authentication.
-   **Transcript Display**: See a live transcript of the conversation during the interview.

## Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/) (App Router)
-   **AI & Voice**: [Vapi AI](https://vapi.ai/), [Google Gemini](https://ai.google/gemini/) (via AI SDK)
-   **Authentication & Database**: [Firebase](https://firebase.google.com/) (Auth, Firestore)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Form Management**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
-   **Notifications**: [Sonner](https://sonner.emilkowal.ski/)
-   **Containerization**: [Docker](https://www.docker.com/)

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

-   Node.js (v18 or later)
-   npm, yarn, or pnpm
-   A Firebase project
-   A Vapi AI account

### 1. Clone the Repository

```bash
git clone https://github.com/surindersinghsaby/ai-learn-interview.git
cd ai-learn-interview
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root of the project and add the following environment variables.

You will need to get these credentials from your Firebase project settings and Vapi AI dashboard.

```env
# Firebase Admin SDK Configuration
# Go to Project Settings > Service accounts in Firebase to generate a private key
FIREBASE_PROJECT_ID="your-firebase-project-id"
FIREBASE_CLIENT_EMAIL="your-firebase-client-email"
FIREBASE_PRIVATE_KEY="your-firebase-private-key"

# Vapi AI API Keys
NEXT_PUBLIC_VAPI_WEB_TOKEN="your-vapi-public-key"
NEXT_PUBLIC_VAPI_WORKFLOW_ID="your-vapi-workflow-id-for-generation"

# Replace the hardcoded Firebase client config in firebase/client.tsx
# with your own web app's Firebase configuration.
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Running with Docker

This project includes Docker configurations for both development and production environments.

### Development

The development setup uses `docker-compose` to run the Next.js app with hot-reloading.

1.  Ensure you have a `.env` file as described in the setup instructions.
2.  Run the following command:

    ```bash
    docker-compose up dev
    ```

The application will be accessible at `http://localhost:3000`.

### Production

The production setup builds an optimized Next.js application and serves it.

1.  Ensure you have a `.env` file.
2.  Run the following command:

    ```bash
    docker-compose up prod
    ```

The application will be accessible at `http://localhost:3001`.

## Project Structure

```
.
├── app/
│   ├── (auth)/             # Authentication pages (sign-in, sign-up)
│   ├── (root)/             # Main application layout and pages
│   │   ├── interview/      # Pages for creating and taking interviews
│   │   └── page.tsx        # Main dashboard
│   └── api/                # API routes for server-side logic
├── components/             # Reusable React components
├── constants/              # Application-wide constants
├── firebase/               # Firebase admin and client configuration
├── lib/                    # Core logic, server actions, and utilities
│   ├── actions/            # Next.js server actions for auth and data fetching
│   └── vapi.sdk.ts         # Vapi AI SDK initialization
├── public/                 # Static assets
└── types/                  # TypeScript type definitions