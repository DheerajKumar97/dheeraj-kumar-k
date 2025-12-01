# Netlify Deployment Guide

## Prerequisites

- Netlify account
- GitHub repository connected to Netlify
- Gmail App Password for SMTP

## Step 1: Deploy to Netlify

### Option A: Deploy via Netlify Dashboard

1. Go to [Netlify](https://app.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub repository
4. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Functions directory:** `netlify/functions`
5. Click "Deploy site"

### Option B: Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize site
netlify init

# Deploy
netlify deploy --prod
```

## Step 2: Configure Environment Variables

After deployment, add these environment variables in Netlify Dashboard:

1. Go to **Site settings** → **Environment variables**
2. Add the following variables:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=engineerdheeraj97@gmail.com
SMTP_PASS=<your-gmail-app-password>
```

**Important:** Use your Gmail App Password, not your regular password.

### How to Get Gmail App Password:

1. Go to https://myaccount.google.com/apppasswords
2. Sign in to your Google Account
3. Select "Mail" and your device
4. Click "Generate"
5. Copy the 16-character password
6. Use this as `SMTP_PASS`

## Step 3: Test the Deployment

1. Visit your deployed site URL
2. Open the chatbot
3. Reply "Yes" to "Are you interested to connect with Dheeraj?"
4. Fill in the contact form
5. Verify emails are sent:
   - Check `engineerdheeraj97@gmail.com` for lead notification
   - Check the user's email for confirmation

## Local Testing with Netlify CLI

Test functions locally before deploying:

```bash
# Install dependencies
npm install

# Run with Netlify Dev
netlify dev
```

This will:
- Start frontend on `http://localhost:8888`
- Make functions available at `http://localhost:8888/.netlify/functions/send-contact-email`

## Troubleshooting

### Function Not Working

**Check function logs:**
1. Go to Netlify Dashboard → Functions
2. Click on `send-contact-email`
3. View logs for errors

**Common issues:**
- Missing environment variables
- Incorrect SMTP credentials
- Function timeout (increase if needed)

### CORS Errors

The function includes CORS headers. If you still see errors:
1. Check browser console for specific error
2. Verify the fetch URL is correct: `/.netlify/functions/send-contact-email`

### Email Not Sending

1. Verify SMTP environment variables are set
2. Check Gmail App Password is correct
3. Ensure "Less secure app access" is NOT required (use App Password instead)
4. Check function logs for nodemailer errors

## Production Checklist

- [ ] Environment variables configured in Netlify
- [ ] Gmail App Password generated and added
- [ ] Site deployed successfully
- [ ] Chatbot opens and responds to queries
- [ ] Lead collection flow works
- [ ] Emails are sent and received
- [ ] No console errors in browser

## Continuous Deployment

Once connected to GitHub, Netlify will automatically:
- Deploy on every push to `main` branch
- Run build command
- Update functions
- Keep environment variables

## Support

If you encounter issues:
1. Check Netlify function logs
2. Review browser console
3. Test locally with `netlify dev`
4. Verify environment variables are set correctly
