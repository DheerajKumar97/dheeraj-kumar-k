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
| `VITE_SUPABASE_URL` | `https://zndtxnvbtzvjpguxhcfl.supabase.co` |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | *(Copy this from your local .env file)* |
| `VITE_SUPABASE_PROJECT_ID` | `zndtxnvbtzvjpguxhcfl` |

> **Note:** You can find the Publishable Key in your local `.env` file or in your Supabase Dashboard under **Project Settings > API**.

## 4. Deploy
Click **"Deploy site"**. Netlify will build your project and publish it.

## 5. Verify
Once deployed, open the URL provided by Netlify.
-   Check if the Chatbot loads.
-   Test the "Lead Generation" flow to ensure it connects to your Supabase backend.

## 6. Deploy Edge Functions (IMPORTANT)
If you have modified the backend logic (chatbot prompt, email handling), you must deploy the Edge Functions to Supabase:

1.  **Login to Supabase CLI:**
    ```bash
    npx supabase login
    ```
2.  **Deploy Functions:**
    ```bash
    npx supabase functions deploy chat-bot --project-ref zndtxnvbtzvjpguxhcfl
    npx supabase functions deploy send-to-whatsapp --project-ref zndtxnvbtzvjpguxhcfl
    npx supabase functions deploy send-contact-email --project-ref zndtxnvbtzvjpguxhcfl
    ```
3.  **Set Secrets (if not already set):**
    You must set the SMTP credentials for Nodemailer to work:
    ```bash
    npx supabase secrets set SMTP_HOST=smtp.gmail.com --project-ref zndtxnvbtzvjpguxhcfl
    npx supabase secrets set SMTP_PORT=587 --project-ref zndtxnvbtzvjpguxhcfl
    npx supabase secrets set SMTP_USER=your_email@gmail.com --project-ref zndtxnvbtzvjpguxhcfl
    npx supabase secrets set SMTP_PASS=your_app_password --project-ref zndtxnvbtzvjpguxhcfl
    ```
