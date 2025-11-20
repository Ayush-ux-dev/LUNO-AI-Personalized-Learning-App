# Architecture Diagram - Flask Backend System

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        USER'S BROWSER                       │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    REACT FRONTEND                            │
│                  (Port 5173 - Vite)                         │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Components:                  Services:                      │
│  • LoginPage.tsx             • api.ts (NEW!)                │
│  • HomePage.tsx              • Token Management             │
│  • MoodSelector.tsx          • API Calls                    │
│  • ChatbotTeacher.tsx                                       │
│  • etc...                                                    │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ REST API
                              │ JSON over HTTP
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    FLASK BACKEND                             │
│                   (Port 5000 - Flask)                       │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  API Endpoints:                                              │
│  • POST /api/auth/login      → User login/signup            │
│  • GET  /api/profile         → Get student data             │
│  • POST /api/profile         → Save student data            │
│  • POST /api/mood            → Save daily mood              │
│  • GET  /api/chat/messages   → Get chat history             │
│  • POST /api/chat/messages   → Save message                 │
│  • POST /api/chat/respond    → AI response                  │
│                                                               │
│  Middleware:                                                 │
│  • CORS (allow React frontend)                              │
│  • JWT Token validation                                     │
│  • Error handling                                            │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ SQLAlchemy ORM
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    SQLITE DATABASE                           │
│              (learning_companion.db)                        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Tables:                                                     │
│                                                               │
│  ┌─────────────┐     ┌──────────────────┐                  │
│  │    User     │────▶│ StudentProfile   │                  │
│  ├─────────────┤     ├──────────────────┤                  │
│  │ id          │     │ id               │                  │
│  │ email       │     │ user_id (FK)     │                  │
│  │ reg_no      │     │ name             │                  │
│  │ created_at  │     │ department       │                  │
│  └─────────────┘     │ semester         │                  │
│         │            │ subjects         │                  │
│         │            │ sgpas            │                  │
│         │            │ level, xp        │                  │
│         │            │ coins, streak    │                  │
│         │            └──────────────────┘                  │
│         │                                                    │
│         ├──────┐     ┌──────────────────┐                  │
│         │      └────▶│   MoodEntry      │                  │
│         │            ├──────────────────┤                  │
│         │            │ id               │                  │
│         │            │ user_id (FK)     │                  │
│         │            │ mood             │                  │
│         │            │ date             │                  │
│         │            └──────────────────┘                  │
│         │                                                    │
│         └──────┐     ┌──────────────────┐                  │
│                └────▶│  ChatMessage     │                  │
│                      ├──────────────────┤                  │
│                      │ id               │                  │
│                      │ user_id (FK)     │                  │
│                      │ role             │                  │
│                      │ content          │                  │
│                      │ emotion          │                  │
│                      │ created_at       │                  │
│                      └──────────────────┘                  │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## Request Flow Example

### Example: User Login

```
1. USER enters email + registration number
         │
         ▼
2. React LoginPage component
         │
         ▼
3. Call: login(email, regNo) from api.ts
         │
         ▼
4. HTTP POST to: /api/auth/login
         │
         │ {
         │   "email": "student@example.com",
         │   "registrationNo": "REG12345"
         │ }
         ▼
5. Flask receives request
         │
         ▼
6. app.py login() function
    • Find or create user in database
    • Generate JWT token
         │
         ▼
7. Database query/insert
         │
         ▼
8. Flask response
         │
         │ {
         │   "token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
         │   "user": { "id": 1, "email": "...", "hasProfile": true }
         │ }
         ▼
9. api.ts receives response
    • Save token to localStorage
         │
         ▼
10. React updates UI
    • Redirect to dashboard or onboarding
```

---

## Authentication Flow

```
┌────────────┐
│   Login    │
│   Page     │
└─────┬──────┘
      │
      │ 1. Submit email + regNo
      ▼
┌─────────────────┐
│  Flask Backend  │
├─────────────────┤
│ • Find/Create   │
│   User          │
│ • Generate JWT  │
│   Token         │
└─────┬───────────┘
      │
      │ 2. Return { token, user }
      ▼
┌─────────────────┐
│  React Frontend │
├─────────────────┤
│ • Save token    │
│   to localStorage
└─────┬───────────┘
      │
      │ 3. All subsequent requests
      ▼
┌─────────────────────────┐
│   API Requests          │
├─────────────────────────┤
│ Headers:                │
│   Authorization:        │
│   Bearer <token>        │
└─────┬───────────────────┘
      │
      │ 4. Validate token
      ▼
┌─────────────────┐
│  Flask Backend  │
├─────────────────┤
│ • Decode JWT    │
│ • Get user_id   │
│ • Fetch data    │
└─────┬───────────┘
      │
      │ 5. Return data
      ▼
┌─────────────────┐
│  React Updates  │
│     UI          │
└─────────────────┘
```

---

## Data Flow Example

### Example: Saving Student Profile

```
USER fills onboarding form
         │
         ▼
┌─────────────────────────────┐
│  StudentOnboarding.tsx      │
│  formData = {               │
│    name: "John",            │
│    department: "CSE",       │
│    semester: 5,             │
│    subjects: [...],         │
│    level: 1,                │
│    xp: 0                    │
│  }                          │
└────────┬────────────────────┘
         │
         │ createProfile(formData)
         ▼
┌─────────────────────────────┐
│  api.ts                     │
│  POST /api/profile          │
│  Headers: {                 │
│    Authorization: Bearer... │
│  }                          │
│  Body: formData             │
└────────┬────────────────────┘
         │
         │ HTTP Request
         ▼
┌─────────────────────────────┐
│  Flask app.py               │
│  @token_required            │
│  def create_profile()       │
│    • Validate token         │
│    • Get current_user       │
│    • Create StudentProfile  │
└────────┬────────────────────┘
         │
         │ SQLAlchemy ORM
         ▼
┌─────────────────────────────┐
│  SQLite Database            │
│  INSERT INTO                │
│    student_profile          │
│  VALUES (...)               │
└────────┬────────────────────┘
         │
         │ Commit successful
         ▼
┌─────────────────────────────┐
│  Flask Response             │
│  {                          │
│    "message": "Success",    │
│    "profileId": 123         │
│  }                          │
└────────┬────────────────────┘
         │
         │ JSON Response
         ▼
┌─────────────────────────────┐
│  React Component            │
│  • Update state             │
│  • Navigate to next screen  │
└─────────────────────────────┘
```

---

## File Structure

```
Project Root/
│
├── backend/                       # Flask Backend
│   ├── app.py                    # Main application
│   │   ├── Models (User, Profile, Mood, Chat)
│   │   ├── Routes (API endpoints)
│   │   ├── Authentication (JWT)
│   │   └── Database (SQLAlchemy)
│   │
│   ├── requirements.txt          # Dependencies
│   ├── .env                      # Configuration
│   └── learning_companion.db     # SQLite database
│
├── src/                          # React Frontend
│   ├── services/
│   │   └── api.ts               # API client
│   │       ├── login()
│   │       ├── getProfile()
│   │       ├── saveMood()
│   │       └── ...
│   │
│   └── components/              # React components
│       ├── LoginPage.tsx
│       ├── HomePage.tsx
│       ├── MoodSelector.tsx
│       └── ...
│
└── Documentation/
    ├── START_HERE.md
    ├── FLASK_QUICK_START.md
    └── ...
```

---

## Technology Stack

```
┌─────────────────────────────────────────┐
│           FRONTEND                      │
├─────────────────────────────────────────┤
│  React 18                               │
│  TypeScript                             │
│  Vite (Build tool)                      │
│  Motion/Framer (Animations)             │
│  Regular CSS (converted from Tailwind)  │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│           BACKEND                       │
├─────────────────────────────────────────┤
│  Python 3.8+                            │
│  Flask 3.0                              │
│  SQLAlchemy 2.0 (ORM)                   │
│  Flask-CORS (CORS support)              │
│  PyJWT (Authentication)                 │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│           DATABASE                      │
├─────────────────────────────────────────┤
│  SQLite 3 (Development)                 │
│  PostgreSQL (Production ready)          │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│           COMMUNICATION                 │
├─────────────────────────────────────────┤
│  REST API (JSON)                        │
│  JWT Tokens                             │
│  HTTP/HTTPS                             │
└─────────────────────────────────────────┘
```

---

## Deployment Architecture

### Development
```
┌──────────────┐         ┌──────────────┐
│   React      │ ◄─────► │   Flask      │
│ localhost:   │   HTTP  │ localhost:   │
│   5173       │         │   5000       │
└──────────────┘         └──────┬───────┘
                                │
                                ▼
                         ┌──────────────┐
                         │   SQLite     │
                         │   File DB    │
                         └──────────────┘
```

### Production
```
┌──────────────┐         ┌──────────────┐
│   React      │ ◄─────► │   Flask      │
│   (Vercel/   │  HTTPS  │  (Heroku/    │
│   Netlify)   │         │   Railway)   │
└──────────────┘         └──────┬───────┘
                                │
                                ▼
                         ┌──────────────┐
                         │ PostgreSQL   │
                         │   (Cloud)    │
                         └──────────────┘
```

---

## Data Model Relationships

```
User (1) ──────── (1) StudentProfile
  │
  ├── (1) ──────── (Many) MoodEntry
  │
  └── (1) ──────── (Many) ChatMessage

Legend:
(1) = One
(Many) = Many
────── = One-to-One relationship
────── = One-to-Many relationship
```

---

## Security Flow

```
1. User Login
    ↓
2. Flask generates JWT token
    ↓
3. Token contains: { user_id, exp }
    ↓
4. Token sent to frontend
    ↓
5. Frontend stores in localStorage
    ↓
6. Every API request includes token
    ↓
7. Flask validates token
    • Check signature
    • Check expiration
    • Extract user_id
    ↓
8. If valid: Process request
   If invalid: Return 401 Unauthorized
```

---

This architecture provides:
- ✅ Separation of concerns
- ✅ Scalable backend
- ✅ Secure authentication
- ✅ Persistent data storage
- ✅ RESTful API design
- ✅ Production-ready structure
