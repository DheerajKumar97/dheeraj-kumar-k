# Dheeraj Kumar K - Business Intelligence Developer Portfolio

![Portfolio Preview](public/portfolio-preview.png)

A professional portfolio website showcasing expertise in Business Intelligence, Data Analytics, and Data Engineering. This project features a modern, responsive design and an intelligent AI chatbot capable of answering professional queries and generating leads.

## 🚀 Features

-   **Modern UI/UX**: Built with React, Tailwind CSS, and Shadcn UI for a sleek, responsive experience.
-   **AI-Powered Chatbot**: Integrated with Google Gemini via Supabase Edge Functions to answer questions about Dheeraj's experience and skills.
-   **Smart Lead Generation**: The chatbot intelligently collects visitor contact details and business needs, sending them directly to email via Supabase.
-   **Interactive Components**:
    -   **Badge Showcase**: Animated display of professional certifications (Power BI, Tableau, etc.).
    -   **Project Gallery**: Detailed view of data analytics projects.
    -   **Skills Section**: Visual representation of technical expertise.
-   **Performance Optimized**: Fast loading times with Vite and optimized assets.

## 🛠️ Tech Stack

-   **Frontend**: React, TypeScript, Vite
-   **Styling**: Tailwind CSS, Shadcn UI, Lucide React (Icons)
-   **Backend / Serverless**: Supabase (Edge Functions, Database)
-   **AI Model**: Google Gemini 1.5 Flash
-   **Deployment**: Netlify (Frontend), Supabase (Backend)

## 📂 Project Structure

```
├── src
│   ├── components   # Reusable UI components (ChatBot, Hero, Projects, etc.)
│   ├── pages        # Main page views
│   ├── assets       # Images and static files
│   └── lib          # Utilities and helpers
├── supabase
│   └── functions    # Edge Functions (chat-bot, send-to-whatsapp)
├── public           # Static assets (favicon, robots.txt)
└── ...config files
```

## ⚡ Getting Started

### Prerequisites

-   Node.js (v18+)
-   Supabase CLI

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/DheerajKumar97/dheeraj-kumar-k.git
    cd dheeraj-kumar-k
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the root directory with your Supabase credentials:
    ```env
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
    VITE_SUPABASE_PROJECT_ID=your_project_id
    ```

4.  **Run Locally**
    ```bash
    npm run dev
    ```

## 🚀 Deployment

### Frontend (Netlify)
1.  Connect your GitHub repository to Netlify.
2.  Set the build command to `npm run build` and publish directory to `dist`.
3.  Add the environment variables (`VITE_SUPABASE_URL`, etc.) in Netlify Site Settings.

### Backend (Supabase)
1.  Link your local project to your Supabase instance:
    ```bash
    npx supabase link --project-ref your_project_id
    ```
2.  Deploy Edge Functions:
    ```bash
    npx supabase functions deploy
    ```
3.  Set Secrets for Edge Functions:
    ```bash
    npx supabase secrets set LOVABLE_API_KEY=your_gemini_key RESEND_API_KEY=your_resend_key
    ```

## 📬 Contact

**Dheeraj Kumar K**
-   **LinkedIn**: [dheerajkumar1997](https://www.linkedin.com/in/dheerajkumar1997/)
-   **Email**: engineerdheeraj97@gmail.com

---
*Built with ❤️ by Dheeraj's AI Assistant*
