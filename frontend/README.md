# Resume Analyzer

An AI-powered web application that analyzes a candidate's resume against a specific job role and job description, then generates a structured resume analysis report.

The application helps candidates identify relevant skills, missing requirements, strengths, weaknesses, and areas for resume improvement.

## Features

* Upload resume in **PDF or DOCX** format
* Enter target **job role**
* Enter complete **job description**
* AI-powered resume and job description analysis
* Resume-to-job match score from **0–100**
* Matching, partial, and missing skills
* Evidence-based skill analysis
* Resume strengths and weaknesses
* Section-wise resume evaluation
* Actionable resume improvement suggestions
* Structured AI response using **Pydantic**
* React-based interactive dashboard
* FastAPI REST backend

## Application Flow

```text
User
 │
 ├── Job Role
 ├── Job Description
 └── Resume (PDF/DOCX)
          │
          ▼
    React Frontend
          │
          ▼
     FastAPI Backend
          │
          ├── Resume Text Extraction
          │
          ▼
      AI Analysis Layer
          │
          ▼
   Structured Pydantic Output
          │
          ▼
      JSON Response
          │
          ▼
    React Report Dashboard
```

## Architecture

```text
┌──────────────────────────────┐
│        React Frontend        │
│                              │
│  • Resume Upload             │
│  • Job Role & JD Input       │
│  • Loading State             │
│  • Analysis Dashboard        │
└──────────────┬───────────────┘
               │ REST API
               ▼
┌──────────────────────────────┐
│       FastAPI Backend        │
│                              │
│  • File Validation           │
│  • Resume Text Extraction    │
│  • Request Processing        │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│       AI Analysis Layer      │
│                              │
│  • Resume Analysis           │
│  • JD Matching               │
│  • Structured Output         │
└──────────────┬───────────────┘
               │
               ▼
        Pydantic Schema
               │
               ▼
         JSON Response
```

## Tech Stack

### Frontend

* React
* JavaScript
* Vite
* React Router
* HTML5 / CSS3

### Backend

* Python
* FastAPI
* Uvicorn
* Pydantic
* LangChain
* PyPDFLoader
* Docx2txtLoader

### AI

* OpenRouter API
* LLM-based structured analysis

### Development Tools

* Git
* GitHub
* VS Code

## Project Structure

```text
resume_analyzer/
│
├── backend/
│   ├── app/
│   │   ├── services/
│   │   │   ├── document_parser.py
│   │   │   └── llm_analyzer.py
│   │   │
│   │   ├── main.py
│   │   └── schemas.py
│   │
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md
```

## Backend API

### Analyze Resume

**Endpoint**

```text
POST /api/resume/analyze
```

**Request**

The endpoint accepts:

* `file` — PDF or DOCX resume
* `role` — target job role
* `job_description` — target job description

**Response**

The backend returns a structured JSON report containing:

```json
{
  "match_score": 82,
  "role_match": "...",
  "summary": "...",
  "matching_skills": [],
  "missing_skills": [],
  "partial_skills": [],
  "pros": [],
  "cons": [],
  "improvements": [],
  "section_scores": {}
}
```

## AI Analysis

The backend sends the extracted resume content together with the target role and job description to the AI analysis layer.

The response is validated against a predefined **Pydantic schema**, ensuring that the frontend receives consistent structured data instead of an unstructured text response.

The analysis evaluates:

* Technical skills
* Required and preferred technologies
* Role responsibilities
* Projects
* Education
* Relevant experience
* Resume strengths
* Missing requirements
* Areas for improvement

The application does not generate or assume candidate experience that is not supported by the resume.

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/resume-analyzer.git
cd resume-analyzer
```

### 2. Backend Setup

```bash
cd backend

python -m venv venv
```

Activate the virtual environment on Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file:

```env
OPENROUTER_API_KEY=your_openrouter_api_key
```

Start the backend:

```bash
uvicorn app.main:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

API documentation:

```text
http://127.0.0.1:8000/docs
```

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at the local URL shown by Vite.

## Security

API keys and environment variables are excluded from version control using `.gitignore`.

Example environment files should be used when sharing the project:

```text
.env.example
```

Actual API keys should never be committed to GitHub.

## Developer

**Avdhoot Nakod**

BSc Computer Science Graduate

Interested in Software Engineering, Backend Development, AI Engineering, and Full-Stack Development.

* LinkedIn: https://linkedin.com/in/avdhoot-nakod
  
## Project Credits

Developed by **Avdhoot Nakod** as a portfolio project demonstrating practical skills in:

* Full-stack web development
* REST API development
* AI/LLM integration
* Document processing
* Structured data validation
* React frontend development
* Python backend development
* Git and GitHub
