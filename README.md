# AI Resume Analyzer

An AI-powered Resume Analyzer built using the MERN stack that helps users analyze resumes, calculate ATS scores, receive AI-generated feedback, and improve resume quality for better job opportunities.

---

# 🚀 Features

- Upload and analyze resumes
- ATS score generation
- AI-based resume feedback
- Resume history tracking
- Authentication system
- Responsive modern UI
- Real-time analysis results
- PDF resume support

---

# 🛠️ Tech Stack

## Frontend
- React
- Vite
- Axios
- React Router DOM
- Tailwind CSS

## Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Gemini/OpenAI API

---

# 📁 Project Structure

```bash
AI-Resume-Analyzer/
│
├── client/        # Frontend (React + Vite)
├── server/        # Backend (Node.js + Express)
└── README.md


⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone <your-repository-url>
cd AI-Resume-Analyzer

▶️ Run Frontend
cd public
npm run dev

▶️ Run Backend
cd server
npm run dev

# 🐳 Docker Support

## Frontend Image

```bash
docker pull suparsh001/airesumeanalyzer-frontend
```

## Backend Image

```bash
docker pull suparsh001/airesumeanalyzer-backend
```

---

# ▶️ Run Frontend Container

```bash
docker run -p 80:80 suparsh001/airesumeanalyzer-frontend
```

---

# ▶️ Run Backend Container

```bash
docker run -p 5000:5000 suparsh001/airesumeanalyzer-backend
```
