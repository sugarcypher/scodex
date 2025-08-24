# 🚀 Sugar Codex Deployment

## Master Workflow

This repository uses **ONE master workflow** for deployment:

- **File**: `.github/workflows/master-deploy.yml`
- **Purpose**: Build and deploy Sugar Codex to GitHub Pages
- **Trigger**: Push to main branch or manual dispatch

## 🎯 Important Setup

**GitHub Pages must be configured to use GitHub Actions:**

1. Go to: `Settings` → `Pages`
2. **Source**: Select "GitHub Actions"
3. **Do NOT** use "Deploy from a branch"
4. **Let this workflow handle everything**

## 🚫 What NOT to do

- ❌ Don't enable "Deploy from a branch"
- ❌ Don't create multiple workflows
- ❌ Don't mix deployment methods

## ✅ What this workflow does

1. **Installs dependencies** with Bun
2. **Builds web version** with Expo
3. **Verifies build output**
4. **Deploys to GitHub Pages**
5. **Provides clear feedback**

## 🔧 Troubleshooting

If you see a white screen:
1. Check Actions tab for workflow status
2. Ensure only ONE workflow is running
3. Wait for deployment to complete
4. Clear browser cache and refresh
