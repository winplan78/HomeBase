# 🏠 Home Base — Claude Code Walkthrough
### Your first app: from zero to live in one session

---

## What you're building

**Home Base** is a family command center — a premium mobile web app with:
- AI-powered morning briefing
- Family calendar with conflict detection
- Real flight tracker (reads your Google Calendar)
- Voice interaction screen
- Nanny view mode

Stack: **React + Vite → GitHub → Vercel** (all free tier)

---

## Prerequisites

Before starting, make sure you have these four things:

### 1. Node.js 18+
```bash
node --version   # should show v18 or higher
```
If not: https://nodejs.org → download LTS

### 2. Claude Code
```bash
npm install -g @anthropic/claude-code
claude --version
```
Docs: https://docs.claude.ai/claude-code

### 3. Accounts (all free)
| Service | URL | What for |
|---------|-----|----------|
| GitHub | github.com | Code storage + version control |
| Vercel | vercel.com | Hosting + auto-deploy |
| Anthropic Console | console.anthropic.com | API key for AI features |

### 4. API Key
1. Go to console.anthropic.com → API Keys → Create key
2. Copy it — you'll use it in Step 6

---

## Part 1 — Create Your GitHub Repository

### Step 1.1 — Create the repo

1. Go to **github.com/new**
2. Repository name: `home-base`
3. Description: `Family command center — built with Claude Code`
4. Set to **Public** (required for free Vercel hosting)
5. ✅ Add a README file
6. Click **Create repository**

### Step 1.2 — Clone it locally

```bash
# Replace YOUR_USERNAME with your GitHub username
git clone https://github.com/YOUR_USERNAME/home-base.git
cd home-base
```

### Step 1.3 — Open in your terminal

```bash
# You should now be inside the home-base folder
ls    # should show README.md
```

---

## Part 2 — Launch Claude Code

### Step 2.1 — Start Claude Code

```bash
# From inside the home-base directory:
claude
```

You'll see Claude Code's prompt. This is your AI coding partner — you can talk to it in plain English.

### Step 2.2 — Your first prompt

Type this to Claude Code:

```
I'm building a React + Vite app called Home Base. 
Please scaffold the project using Vite with the React template, 
install dependencies, and set up the basic folder structure 
we'll need for a multi-screen mobile app.
```

Claude Code will run the Vite scaffold for you. When it's done, your folder will look like:

```
home-base/
├── node_modules/
├── public/
├── src/
│   ├── main.jsx
│   └── App.jsx
├── index.html
├── package.json
└── vite.config.js
```

### Step 2.3 — Verify it works

```bash
npm run dev
```

Open http://localhost:5173 — you should see the Vite + React starter. 

---

## Part 3 — Add the Home Base App Files

All the files you need are pre-built in this repo. Claude Code will help you place them correctly.

### Step 3.1 — Tell Claude Code what to do

```
I have a set of pre-built React component files for my Home Base app.
I need you to:
1. Replace src/App.jsx with the Home Base app shell
2. Replace src/index.css with the design system styles  
3. Add all component files to src/components/
4. Update index.html to load the Google Fonts we need
```

### Step 3.2 — Copy the source files

The source files in this repo are organized like this:

```
src/
├── App.jsx              ← Main app shell + navigation
├── index.css            ← Design system (colors, typography, animations)
├── main.jsx             ← Entry point (unchanged from Vite default)
└── components/
    ├── shared/
    │   ├── StatusBar.jsx    ← iOS-style status bar
    │   ├── BottomNav.jsx    ← Frosted glass navigation
    │   ├── PersonCard.jsx   ← Avatar day-at-a-glance card
    │   ├── FlightCard.jsx   ← Individual flight card with live status
    │   └── NannyView.jsx    ← Simplified nanny mode
    └── screens/
        ├── HomeScreen.jsx       ← Morning briefing + today view
        ├── FlightTracker.jsx    ← AI calendar scan + flight board
        ├── CalendarScreen.jsx   ← Week view with conflict detection
        ├── ActionsScreen.jsx    ← Quick action grid
        ├── VoiceScreen.jsx      ← Voice interaction overlay
        └── SettingsScreen.jsx   ← Profile + preferences
```

Copy all files from the `src/` folder in this repo into your project's `src/` folder.

### Step 3.3 — Set up environment variables

Create a `.env` file in your project root:

```bash
# In the home-base directory:
cp .env.example .env
```

Then open `.env` and add your Anthropic API key:

```
VITE_ANTHROPIC_API_KEY=sk-ant-your-key-here
```

⚠️ **Important**: The `.gitignore` already excludes `.env` — your key will never be committed to GitHub.

### Step 3.4 — Verify the app runs

```bash
npm run dev
```

Open http://localhost:5173 — you should see the full Home Base app.

**Test the flight tracker:**
1. Tap the ✈️ Flights tab in the bottom nav
2. Tap "Scan Calendar"
3. Watch it step through the scan animation
4. The AI will analyze your calendar and stream back insights

---

## Part 4 — Connect GitHub

### Step 4.1 — Stage all files

```bash
git add .
git status    # review what's being committed
```

### Step 4.2 — Commit

```bash
git commit -m "feat: initial Home Base app — family command center"
```

### Step 4.3 — Push

```bash
git push origin main
```

Go to your GitHub repo — you should see all the files there. 🎉

---

## Part 5 — Deploy to Vercel

### Step 5.1 — Connect your repo

1. Go to **vercel.com** → Log in with GitHub
2. Click **Add New → Project**
3. Find `home-base` in your repo list → **Import**
4. Vercel auto-detects Vite — the settings will be correct:
   - Framework: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`

### Step 5.2 — Add your environment variable

Before clicking Deploy:
1. Click **Environment Variables**
2. Add:
   - Name: `VITE_ANTHROPIC_API_KEY`
   - Value: `sk-ant-your-key-here`
3. Click **Add**

### Step 5.3 — Deploy

Click **Deploy** — Vercel builds and deploys in about 30 seconds.

You'll get a URL like: `home-base-yourusername.vercel.app`

That's your live app. Share it with anyone. 🚀

### Step 5.4 — Auto-deploy is now active

Every time you push to GitHub, Vercel auto-rebuilds and deploys. Your workflow from here:

```bash
# Make changes → push → live in ~30 seconds
git add .
git commit -m "your message"
git push
```

---

## Part 6 — Iterate with Claude Code

Now that everything is wired up, Claude Code is your superpower for extending the app.

### Example prompts to try

**Add real flight status:**
```
Add a real flight status lookup using the AviationStack free API. 
When a flight number is detected in the calendar, fetch live status 
and update the card with actual gate/delay data.
```

**Add push notifications:**
```
Integrate web push notifications so the app can alert us when 
a flight status changes or a coverage gap is detected.
```

**Add a shared grocery list:**
```
Build out the Shopping List screen — it should sync between 
two users in real time using a simple Supabase backend.
```

**Make it a PWA:**
```
Convert this to a Progressive Web App so Maya and Will can 
add it to their iPhone home screens and it behaves like a 
native app.
```

**Add authentication:**
```
Add Clerk authentication so each family member has their own 
login and we can show personalized data per user.
```

### How to work with Claude Code

Claude Code works best with specific, scoped prompts:

| Instead of... | Try... |
|--------------|--------|
| "Make it better" | "Improve the FlightCard component to show baggage claim info when a flight has landed" |
| "Fix the bug" | "The scan animation hangs on step 3 when there are no calendar events — fix the edge case" |
| "Add dark mode" | "The app is already dark — add a light mode toggle in Settings" |

**Key commands inside Claude Code:**
- `/help` — see all commands
- `/memory` — what Claude Code remembers about your project
- `/review` — ask Claude to review recent changes
- `Ctrl+C` — interrupt a running command

---

## Architecture Reference

```
┌─────────────────────────────────────┐
│         Home Base App               │
│                                     │
│  App.jsx (shell + screen routing)   │
│         ↕                           │
│  ┌──────────┬──────────────────┐   │
│  │ screens/ │   shared/        │   │
│  │          │                  │   │
│  │ Home     │  StatusBar       │   │
│  │ Flights  │  BottomNav       │   │
│  │ Calendar │  FlightCard      │   │
│  │ Actions  │  PersonCard      │   │
│  │ Voice    │  NannyView       │   │
│  │ Settings │                  │   │
│  └──────────┴──────────────────┘   │
│         ↕                           │
│  Anthropic API (AI features)        │
│  Google Calendar MCP (flight scan)  │
└─────────────────────────────────────┘
         ↕
┌────────────────────┐
│  GitHub (main)     │  ← your source of truth
└────────────────────┘
         ↕ auto-deploy
┌────────────────────┐
│  Vercel            │  ← live URL
└────────────────────┘
```

---

## Troubleshooting

**`claude: command not found`**
```bash
npm install -g @anthropic/claude-code
# If still not found:
export PATH="$PATH:$(npm root -g)/../bin"
```

**App shows blank screen**
```bash
# Check browser console for errors
# Most common: missing env variable
cat .env    # verify key is there
```

**Build fails on Vercel**
- Check that `VITE_ANTHROPIC_API_KEY` is set in Vercel project settings
- Make sure all imports use the correct relative paths

**Flight scan returns no results**
- The scanner uses Google Calendar MCP — ensure your calendar is connected in Claude.ai settings
- The app also shows demo flights from your Atlanta trip context

---

## What's next

Once the app is live, the natural next steps are:

1. **PWA install** — add a `manifest.json` so Maya and Will can install it on their phones
2. **Real auth** — Clerk.dev makes this a 20-minute add
3. **Shared state** — Supabase (free tier) for real-time sync between family members
4. **Flight API** — AviationStack free tier gives 500 real-time lookups/month
5. **Push alerts** — Web Push API for boarding notifications

Good luck — this is going to be a great app. 🏠
