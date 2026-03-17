# Podcast Appearance Finder
### Viveka von Rosen — Visibility Audit Tool

Finds all your podcast appearances via Listen Notes and exports them to CSV.  
Your API key lives only on the server — it is never exposed in the browser.

---

## Project Structure

```
/
├── index.html        ← The app (frontend)
├── api/
│   └── search.js     ← Serverless function (proxies Listen Notes API)
├── vercel.json       ← Vercel config
└── README.md
```

---

## Deploy in 4 Steps

### 1. Push to GitHub
- Create a new repo on GitHub (can be private)
- Push these files to the `main` branch

```bash
git init
git add .
git commit -m "Initial deploy"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 2. Connect to Vercel
- Go to [vercel.com](https://vercel.com) → **Add New Project**
- Import your GitHub repo
- Framework Preset: **Other**
- Root Directory: leave as `/`
- Click **Deploy** (the first deploy will show "API key not configured" — that's expected)

### 3. Add Your API Key
- In Vercel: go to your project → **Settings → Environment Variables**
- Add a new variable:
  - **Name:** `LISTEN_NOTES_API_KEY`
  - **Value:** your Listen Notes API key
  - **Environment:** Production (and Preview if you want)
- Click **Save**

### 4. Redeploy
- Go to **Deployments** → click the three dots on the latest deploy → **Redeploy**
- Your app is now live and the API key is secure

---

## Getting a Listen Notes API Key
1. Go to [listennotes.com/api/pricing](https://www.listennotes.com/api/pricing/)
2. Click **Subscribe** on the Free plan
3. Your API key will be emailed to you after approval (usually fast)

---

## How It Works
- The frontend calls `/api/search?q=NAME&offset=0`
- Vercel runs `api/search.js` on the server, which reads `LISTEN_NOTES_API_KEY` from environment variables
- The API key is never sent to the browser
- Results are displayed in the table and can be exported to CSV

---

## Updating the App
Any push to the `main` branch on GitHub will auto-deploy to Vercel.
