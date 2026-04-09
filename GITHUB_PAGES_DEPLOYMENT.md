# Water Optimization System - GitHub Pages Deployment Guide

## Prerequisites
- GitHub account
- Git installed locally

## Step-by-Step Deployment Instructions

### 1. Create a GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Fill in the details:
   - **Repository name:** `water` (or any name you prefer)
   - **Description:** "Industrial Water Management & Optimization System"
   - Choose **Public** (required for free GitHub Pages)
   - Do NOT initialize with README (already have one)
3. Click **Create repository**

### 2. Add Remote & Push Code

Run these commands in the workspace directory (`c:\Users\Khalandar\Desktop\water`):

```bash
git remote add origin https://github.com/YOUR_USERNAME/water.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages** (left sidebar)
3. Under **Build and deployment:**
   - **Source:** Select "GitHub Actions"
4. GitHub Pages will automatically deploy when you push code

### 4. Access Your Live Site

Once deployed, your site will be available at:
```
https://YOUR_USERNAME.github.io/water/
```

It typically takes 1-2 minutes for the first deployment to complete.

---

## What's Configured ✅

- **Vite base path:** Set to `/water/` for correct asset loading
- **GitHub Actions workflow:** Automatically builds and deploys on every push to `main` or `master`
- **Node.js 18:** Latest stable version for frontend builds
- **Build output:** Deploys from `/watercon/frontend/dist`

---

## Project Structure

```
/water (root repository)
├── .github/workflows/
│   └── deploy.yml          # Automated deployment workflow
├── watercon/
│   ├── frontend/           # React + Vite app (deployed to GitHub Pages)
│   ├── app.py              # Python Streamlit backend (not deployed to Pages)
│   └── ...                 # Other Python files
└── pdfs/                   # Documentation
```

---

## Notes

- The **frontend** (React/Vite) is deployed to GitHub Pages
- The **backend** (Python/Streamlit) requires separate hosting (e.g., Heroku, Railway, AWS, or local setup)
- All commits to `main` or `master` branch will trigger automatic deployment

---

## Troubleshooting

- **Pages not deploying?** Check Actions tab in GitHub for build errors
- **Assets not loading?** Confirm the base path is `/water/` in vite.config.js
- **First build slow?** GitHub Actions builds can take 2-3 minutes on first run

---

For full project documentation, see [watercon/README.md](./watercon/README.md)
