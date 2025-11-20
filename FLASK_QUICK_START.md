# Flask Backend - Quick Start (2 Minutes)

## What You Have Now

✅ **Flask API Backend** - Python backend with REST API  
✅ **React Frontend** - Your existing React app (unchanged)  
✅ **SQLite Database** - Persistent data storage  
✅ **JWT Authentication** - Secure user accounts  

---

## Quick Start

### Windows Users

```bash
# 1. Open Command Prompt or PowerShell in the backend folder
cd backend

# 2. Run the startup script
run.bat

# 3. Open NEW terminal for frontend
cd ..
npm run dev
```

### Mac/Linux Users

```bash
# 1. Open Terminal in the backend folder
cd backend

# 2. Make script executable (first time only)
chmod +x run.sh

# 3. Run the startup script
./run.sh

# 4. Open NEW terminal for frontend
cd ..
npm run dev
```

### Manual Setup (if scripts don't work)

```bash
# Backend (Terminal 1)
cd backend
python -m venv venv
source venv/bin/activate       # Mac/Linux
# OR
venv\Scripts\activate          # Windows

pip install -r requirements.txt
python app.py

# Frontend (Terminal 2 - keep backend running)
cd ..
echo "VITE_API_URL=http://localhost:5000/api" > .env
npm install
npm run dev
```

---

## Verify It's Working

### 1. Check Backend
Open browser to: `http://localhost:5000/api/health`

Should see:
```json
{
  "status": "healthy",
  "message": "AI Learning Companion API is running"
}
```

### 2. Check Frontend
Open browser to: `http://localhost:5173`

Should see the login page.

### 3. Test Login
1. Enter any email (e.g., `student@example.com`)
2. Enter any registration number (e.g., `REG12345`)
3. Click Sign In

✅ If you see the onboarding page → **SUCCESS!**

---

## What Changed in Your App?

### Frontend (React)
- **New file:** `/src/services/api.ts` - Handles all API calls
- **Components:** Still the same, but now they call APIs instead of localStorage
- **All UI:** Unchanged - looks exactly the same!

### Backend (Flask)
- **New folder:** `/backend/` - Complete Flask application
- **Database:** `/backend/learning_companion.db` - SQLite database (auto-created)
- **API:** REST endpoints for all features

### Data Flow

**Before:**
```
User → React → localStorage → Browser Storage
```

**After:**
```
User → React → API Call → Flask → Database → Response → React
```

---

## Common Commands

### Start Both Servers

**Terminal 1 (Backend):**
```bash
cd backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
python app.py
```

**Terminal 2 (Frontend):**
```bash
npm run dev
```

### Stop Servers
- Press `Ctrl+C` in each terminal

### Reset Database
```bash
cd backend
rm learning_companion.db
python app.py  # Will recreate empty database
```

### View Database
```bash
cd backend
sqlite3 learning_companion.db
.tables              # Show all tables
SELECT * FROM user;  # See users
.quit               # Exit
```

---

## File Structure

```
your-project/
│
├── backend/                    # ← NEW! Flask Backend
│   ├── app.py                 # Main Flask application
│   ├── requirements.txt       # Python dependencies
│   ├── .env.example          # Environment template
│   ├── run.sh / run.bat      # Startup scripts
│   └── learning_companion.db # Database (auto-created)
│
├── src/
│   ├── services/
│   │   └── api.ts            # ← NEW! API service
│   └── components/           # Your React components
│
├── .env                       # Frontend config (create this)
└── package.json              # Node dependencies
```

---

## Troubleshooting

### Problem: "Module not found: flask"
```bash
# Make sure venv is activated (you should see (venv) in prompt)
source venv/bin/activate
pip install -r requirements.txt
```

### Problem: "Port 5000 already in use"
```bash
# Kill the process
# Mac/Linux:
lsof -ti:5000 | xargs kill -9

# Windows:
netstat -ano | findstr :5000
taskkill /PID <NUMBER> /F
```

### Problem: "CORS error" in browser
```bash
# Restart Flask server
# Make sure Flask has CORS enabled (it does in app.py)
```

### Problem: Frontend can't connect to backend
1. Check Flask is running: `http://localhost:5000/api/health`
2. Check `.env` file exists in project root:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```
3. Restart frontend: `npm run dev`

---

## Next Steps

1. ✅ **Test the app** - Login, create profile, set mood
2. ✅ **Check database** - See your data persisted
3. ✅ **Verify APIs** - Open browser DevTools → Network tab
4. 📚 **Read full guide** - See `FLASK_SETUP_GUIDE.md`

---

## Features That Now Use Backend

- ✅ User authentication (login)
- ✅ Student profile storage
- ✅ Mood tracking (daily)
- ✅ Chat history
- ✅ Gamification (XP, coins, streak)
- ✅ Progress tracking
- ✅ Multi-device sync

---

## Quick Reference

| What | URL |
|------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:5000/api |
| Health Check | http://localhost:5000/api/health |
| Database File | backend/learning_companion.db |

| Command | Action |
|---------|--------|
| `python app.py` | Start Flask |
| `npm run dev` | Start React |
| `Ctrl+C` | Stop server |
| `rm learning_companion.db` | Delete database |

---

## That's It! 🎉

You now have:
- ✅ Working Flask backend
- ✅ React frontend connected to API
- ✅ Database storing all data
- ✅ User authentication

**Your app is ready to use!**

For detailed documentation, see `FLASK_SETUP_GUIDE.md`
