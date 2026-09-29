from fastapi import FastAPI, UploadFile, File, Form, HTTPException
import tempfile
import os
from fastapi.middleware.cors import CORSMiddleware
from app.services.document_parser import extract_resume_text
from app.services.llm_analyzer import analyze_resume


app = FastAPI(
    title="Resume Analyzer API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "message": "Resume Analyzer API is running"
    }


@app.post("/api/resume/analyze")
async def analyze_resume_endpoint(
    file: UploadFile = File(...),
    role: str = Form(...),
    job_description: str = Form(...)
):

    allowed_types = {
        "application/pdf": ".pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx"
    }

    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail="Only PDF and DOCX files are supported"
        )

    if not role.strip():
        raise HTTPException(
            status_code=400,
            detail="Job role is required"
        )

    if not job_description.strip():
        raise HTTPException(
            status_code=400,
            detail="Job description is required"
        )

    suffix = allowed_types[file.content_type]

    with tempfile.NamedTemporaryFile(
        delete=False,
        suffix=suffix
    ) as temp_file:

        temp_file.write(await file.read())
        temp_path = temp_file.name

    try:
        resume_text = extract_resume_text(temp_path)

        if not resume_text:
            raise HTTPException(
                status_code=400,
                detail="Could not extract text from resume"
            )

        analysis = analyze_resume(
            resume_text=resume_text,
            role=role,
            job_description=job_description
        )

        return analysis.model_dump()

    finally:
        os.remove(temp_path)