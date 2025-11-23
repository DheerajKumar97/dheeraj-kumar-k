# Deployment Guide for Netlify

Your project is ready for deployment! The build passed successfully and the configuration is correct.

## 1. Connect to Netlify
1.  Push your latest code to GitHub.
2.  Log in to [Netlify](https://app.netlify.com/).
3.  Click **"Add new site"** -> **"Import from an existing project"**.
4.  Select **GitHub** and choose your repository (`dheeraj-kumar-k-main` or similar).

## 2. Configure Build Settings
Netlify should automatically detect these, but verify:
-   **Build Command:** `npm run build`
-   **Publish Directory:** `dist`

## 3. Set Environment Variables (Crucial!)
Before clicking "Deploy", click on **"Advanced"** or go to **Site Settings > Environment variables** after creation. Add these variables from your local `.env` file:

| Key | Value |
| :--- | :--- |
| `VITE_SUPABASE_URL` | `https://jokzpcijyyaymsbvxcrk.supabase.co` |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | *(Copy this from your local .env file)* |
| `VITE_SUPABASE_PROJECT_ID` | `jokzpcijyyaymsbvxcrk` |

> **Note:** You can find the Publishable Key in your local `.env` file or in your Supabase Dashboard under **Project Settings > API**.

## 4. Deploy
Click **"Deploy site"**. Netlify will build your project and publish it.

## 5. Verify
Once deployed, open the URL provided by Netlify.
-   Check if the Chatbot loads.
-   Test the "Lead Generation" flow to ensure it connects to your Supabase backend.
