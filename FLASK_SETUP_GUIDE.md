# Flask Backend Setup Guide

## Overview

Your AI Learning Companion has been converted from a frontend-only app to a **Flask API backend + React frontend** architecture.

### Architecture
```
┌─────────────────┐         ┌──────────────────┐
│  React Frontend │ ◄─────► │  Flask Backend   │
│  (Port 5173)    │  HTTP   │  (Port 5000)     │
│                 │         │                  │
│  - TypeScript   │         │  - Python/Flask  │
│  - React        │         │  - SQLAlchemy    │
│  - CSS          │         │  - SQLite DB     │
└─────────────────┘         └──────────────────┘
```

## What Changed?

### Before (Frontend Only)
- All data stored in browser localStorage
- No database
- No user accounts
- Data lost on browser clear

### After (Flask Backend)
- User authentication with JWT tokens
- SQLite database for persistent storage
- RESTful API endpoints
- Data synced across devices
- User accounts with login

---

## Installation Steps

### Prerequisites

1. **Python 3.8+**
   ```bash
   python --version
   # Should show Python 3.8 or higher
   ```

2. **Node.js** (for React frontend)
   ```bash
   node --version
   npm --version
   ```

---

## Step 1: Backend Setup (Flask)

### 1.1 Navigate to Backend Directory
```bash
cd backend
```

### 1.2 Create Virtual Environment
```bash
# On Windows
python -m venv venv
venv\Scripts\activate

# On Mac/Linux
python3 -m venv venv
source venv/bin/activate
```

You should see `(venv)` in your terminal prompt.

### 1.3 Install Dependencies
```bash
pip install -r requirements.txt
```

This installs:
- Flask (web framework)
- Flask-CORS (allow frontend to connect)
- Flask-SQLAlchemy (database ORM)
- PyJWT (authentication tokens)
- python-dotenv (environment variables)

### 1.4 Set Up Environment Variables
```bash
# Copy example env file
cp .env.example .env

# Edit .env file (optional - defaults work for development)
```

### 1.5 Initialize Database
The database will be created automatically when you first run the app, or you can initialize it manually:

```bash
python
>>> from app import app, db
>>> with app.app_context():
...     db.create_all()
>>> exit()
```

### 1.6 Run Flask Server
```bash
python app.py
```

You should see:
```
 * Running on http://0.0.0.0:5000
 * Debug mode: on
```

**Keep this terminal window open!**

---

## Step 2: Frontend Setup (React)

### 2.1 Open New Terminal
Keep Flask running, open a NEW terminal window.

### 2.2 Navigate to Project Root
```bash
cd /path/to/your/project
# (not the backend folder, the main project folder)
```

### 2.3 Create .env File for Frontend
```bash
# Create .env file in project root
echo "VITE_API_URL=http://localhost:5000/api" > .env
```

### 2.4 Install Frontend Dependencies (if not done)
```bash
npm install
```

### 2.5 Run React Dev Server
```bash
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

---

## Step 3: Test the Application

### 3.1 Open Browser
Go to: `http://localhost:5173`

### 3.2 Test Flow
1. ✅ **Login Page** - Enter any email + registration number
2. ✅ **Onboarding** - Complete 5-step setup
3. ✅ **Mood Selector** - Choose your mood
4. ✅ **Dashboard** - See your profile and stats

### 3.3 Verify Backend Connection
Open browser console (F12) and check for:
- No CORS errors
- API calls successful (Network tab)
- Data persisting after page refresh

---

## API Endpoints Reference

### Authentication
```
POST   /api/auth/login          - Login or create account
```

### Profile
```
GET    /api/profile             - Get student profile
POST   /api/profile             - Create/update profile
PUT    /api/profile/gamification - Update XP, coins, streak
```

### Mood
```
POST   /api/mood                - Save today's mood
GET    /api/mood/today          - Check if mood set today
GET    /api/mood/history        - Get mood history
```

### Chat
```
GET    /api/chat/messages       - Get chat history
POST   /api/chat/messages       - Save chat message
DELETE /api/chat/messages       - Clear chat history
POST   /api/chat/respond        - Get AI response
```

### Utility
```
GET    /api/health              - Health check
```

---

## Database Schema

The SQLite database (`learning_companion.db`) has 4 tables:

### 1. User
- id (Primary Key)
- email (Unique)
- registration_no
- created_at

### 2. StudentProfile
- id (Primary Key)
- user_id (Foreign Key → User)
- name, department, semester
- subjects, sgpa values
- learning_style, goals
- level, xp, streak, coins
- achievements, current_mood

### 3. MoodEntry
- id (Primary Key)
- user_id (Foreign Key → User)
- mood, date
- created_at

### 4. ChatMessage
- id (Primary Key)
- user_id (Foreign Key → User)
- role (user/assistant)
- content, emotion
- chat_type (main/home)
- created_at

---

## File Structure

```
your-project/
├── backend/
│   ├── app.py                 # Flask application
│   ├── requirements.txt       # Python dependencies
│   ├── .env.example          # Environment template
│   ├── .env                  # Your environment (create this)
│   └── learning_companion.db # SQLite database (auto-created)
│
├── src/
│   ├── services/
│   │   └── api.ts            # API client for React
│   ├── components/           # React components (unchanged)
│   └── ...
│
├── .env                      # Frontend env (VITE_API_URL)
├── package.json              # Node dependencies
└── ...
```

---

## Common Issues & Solutions

### Issue 1: CORS Error
```
Access to fetch at 'http://localhost:5000/api/...' has been blocked by CORS
```

**Solution:**
- Ensure Flask app has `CORS(app)` enabled (already in app.py)
- Check `.env` has correct CORS_ORIGINS
- Restart Flask server

### Issue 2: Database Locked
```
sqlite3.OperationalError: database is locked
```

**Solution:**
- Only run ONE instance of Flask server
- Close database browser tools
- Restart Flask server

### Issue 3: Module Not Found (Python)
```
ModuleNotFoundError: No module named 'flask'
```

**Solution:**
- Ensure virtual environment is activated (see `(venv)` in prompt)
- Run `pip install -r requirements.txt` again

### Issue 4: Port Already in Use
```
OSError: [Errno 48] Address already in use
```

**Solution:**
```bash
# Kill process on port 5000
# On Mac/Linux
lsof -ti:5000 | xargs kill -9

# On Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Issue 5: Frontend Can't Connect
```
Failed to fetch
```

**Solution:**
1. Ensure Flask is running on port 5000
2. Check `.env` has `VITE_API_URL=http://localhost:5000/api`
3. Restart Vite dev server

---

## Development Workflow

### Daily Development
1. **Start Backend:**
   ```bash
   cd backend
   source venv/bin/activate  # or venv\Scripts\activate on Windows
   python app.py
   ```

2. **Start Frontend (new terminal):**
   ```bash
   npm run dev
   ```

3. **Make Changes:**
   - Frontend: Changes auto-reload
   - Backend: Restart Flask server (Ctrl+C, then `python app.py`)

### Testing API Directly

Use `curl` or Postman:

```bash
# Health check
curl http://localhost:5000/api/health

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","registrationNo":"REG123"}'

# Get profile (with token)
curl http://localhost:5000/api/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Production Deployment

### Database
For production, use PostgreSQL instead of SQLite:

```python
# In app.py
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
```

### Environment Variables
Set secure values:
```bash
SECRET_KEY=<generate-random-secure-key>
DATABASE_URL=postgresql://user:pass@host/db
```

### WSGI Server
Use Gunicorn instead of Flask development server:

```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Hosting Options
- **Backend:** Heroku, Railway, Render, DigitalOcean
- **Frontend:** Vercel, Netlify, Cloudflare Pages
- **Database:** PostgreSQL on Heroku, Supabase, AWS RDS

---

## Migration from localStorage

### For Existing Users

If you had data in the old localStorage version:

1. The old app saved data like:
   - `userLogin`
   - `studentProfile`
   - `chatHistory`
   - `lastMoodDate`

2. With the new Flask backend:
   - Users create accounts (email + registration number)
   - Data saved to database
   - Can access from any device

3. **Old data won't auto-migrate** - users need to re-enter profile information

---

## Monitoring & Logs

### Flask Logs
```bash
# Flask outputs logs to console
# Look for:
[timestamp] "POST /api/auth/login HTTP/1.1" 200 -
```

### Database Browser
View SQLite database:
```bash
# Install sqlite3
sqlite3 backend/learning_companion.db

# View tables
.tables

# Query users
SELECT * FROM user;

# Exit
.quit
```

### Or use GUI tool:
- [DB Browser for SQLite](https://sqlitebrowser.org/)
- [TablePlus](https://tableplus.com/)

---

## Next Steps

1. ✅ Backend running on port 5000
2. ✅ Frontend running on port 5173
3. ✅ Can login and create profile
4. ✅ Data persists in database

**Optional Enhancements:**
- Add email verification
- Implement password reset
- Add profile pictures
- Create admin dashboard
- Add analytics
- Implement AI model integration
- Add collaborative features

---

## Support

### Documentation
- Flask: https://flask.palletsprojects.com/
- SQLAlchemy: https://www.sqlalchemy.org/
- PyJWT: https://pyjwt.readthedocs.io/

### Need Help?
- Check browser console for errors
- Check Flask terminal for backend errors
- Review API endpoints in app.py
- Test endpoints with curl/Postman

**Your Flask backend is ready! 🚀**
