# 🎙️ VoxPen

VoxPen is a full-stack AI-powered speech-to-text web application that allows users to upload or record audio, generate transcripts using Deepgram AI, detect spoken language automatically, and manage transcript history securely with authentication.

---

# 🚀 Features

- 🎤 Record live audio from browser
- 📂 Upload audio files
- 🧠 AI-powered transcription using Deepgram
- 🌍 Automatic language detection
- 🔐 User authentication with Supabase
- 🗂️ Personal transcript history
- 🎧 Audio playback support
- 📥 Download individual transcripts
- 📦 Download all transcripts
- ☁️ Cloud deployment using Vercel + Render
- 📱 Responsive modern UI

---

# 🛠️ Tech Stack

## Frontend

- React.js
- Vite
- TailwindCSS
- Framer Motion
- Axios

## Backend

- Node.js
- Express.js
- MongoDB
- Multer
- Deepgram SDK

## Authentication

- Supabase Auth

## Deployment

- Vercel (Frontend)
- Render (Backend)

---

# 📁 Project Structure

```bash
VoxPen/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Auth.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── History.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── TranscriptBox.jsx
│   │   │   └── UploadBox.jsx
│   │   │
│   │   ├── lib/
│   │   │   └── supabase.js
│   │   │
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .env
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   └── vite.config.js
│
├── backend/
│   ├── controllers/
│   ├── models/
│   │   └── Transcript.js
│   │
│   ├── routes/
│   │   └── uploadRoutes.js
│   │
│   ├── uploads/
│   │
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
└── README.md
```

---

# ⚙️ Environment Variables

## Frontend (.env)

```env
VITE_API_URL=backend_url

VITE_SUPABASE_URL=supabase_url

VITE_SUPABASE_ANON_KEY=supabase_anon_key
```

---

## Backend (.env)

```env
PORT=5000

MONGO_URI=mongodb_connection_string

DEEPGRAM_API_KEY=deepgram_api_key
```

---

# ▶️ Local Setup

## 1. Clone Repository

```bash
git clone git clone https://github.com/Siddharthpo03/VoxPen.git
```

---

## 2. Install Frontend Dependencies

```bash
cd frontend

npm install
```

---

## 3. Install Backend Dependencies

```bash
cd backend

npm install
```

---

# ▶️ Run Frontend

```bash
cd frontend

npm run dev
```

---

# ▶️ Run Backend

```bash
cd backend

node server.js
```

---

# 🌐 Deployment

## Frontend Deployment

Frontend deployed on Vercel.
Frontend: https://vox-pen.vercel.app

## Backend Deployment

Backend deployed on Render.
Backend: https://voxpen-backend.onrender.com

---

# 🔑 API Usage

## Upload & Transcribe Audio

### Endpoint

```http
POST /api/upload
```

### Form Data

| Key    | Type   |
| ------ | ------ |
| audio  | File   |
| userId | String |

---

## Get Transcript History

### Endpoint

```http
GET /api/upload/history?userId=USER_ID
```

---

# 📸 Screenshots

Add screenshots of:

- Home page
- Upload page
- Transcript history
- Audio recording
- Authentication page

---

# ✨ Future Improvements

- AI-generated summaries
- Translation support
- PDF export
- Speaker diarization
- Cloud audio storage
- Advanced search

---

# 👨‍💻 Author

Siddharth Pulugujja

National Institute of Technology Warangal

---

# 📄 License

This project is for educational and portfolio purposes.
