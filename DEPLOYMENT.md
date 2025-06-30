# Kirsi Rohbock Portfolio - Deployment Guide

## Quick Deploy to Cloudflare Pages

### 1. Upload Source Code
Upload all files from this directory to your GitHub repository: `kirsi-rohbock-portfolio`

### 2. Connect to Cloudflare Pages
1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Navigate to "Pages" → "Create a project"
3. Select "Connect to Git" → Choose GitHub
4. Select repository: `kirsi-rohbock-portfolio`

### 3. Build Configuration
- **Framework preset**: None
- **Build command**: `npm run build`
- **Build output directory**: `dist/public`
- **Root directory**: `/` (leave empty)

### 4. Environment Variables
Add these in Cloudflare Pages project settings:
```
DATABASE_URL=postgresql://placeholder
OPENAI_API_KEY=sk-your-actual-openai-key-here
```

### 5. Deploy
Click "Save and Deploy" - your portfolio will be live at: `your-project.pages.dev`

## Features Included
✅ **Complete UX Portfolio** with 6 case studies
✅ **13+ Years Experience Timeline** from official resume
✅ **19 Market-Relevant Skills** ordered by demand
✅ **AI Chatbot** powered by OpenAI GPT-4o
✅ **Contact Form** with validation
✅ **Responsive Design** optimized for all devices
✅ **Professional Branding** in black, grey, white with green accents

## Post-Deployment
- Test all case study pages and navigation
- Verify contact form submission
- Test AI chatbot functionality
- Check mobile responsiveness
- Update domain in Cloudflare if needed

Your portfolio is ready for hiring managers! 🚀