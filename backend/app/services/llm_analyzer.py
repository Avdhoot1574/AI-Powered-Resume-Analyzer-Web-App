import os

from dotenv import load_dotenv
from langchain_openai import ChatOpenAI

from app.schemas import ResumeAnalysis


load_dotenv()


llm = ChatOpenAI(
    model="nvidia/nemotron-3-ultra-550b-a55b:free",
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1",
    temperature=0
)

structured_llm = llm.with_structured_output(
    ResumeAnalysis
)


def analyze_resume(
    resume_text: str,
    role: str,
    job_description: str
) -> ResumeAnalysis:

    prompt = f"""
You are an expert technical recruiter and resume analyst.

Your task is to analyze a candidate's resume against a specific
job role and job description.

TARGET ROLE:
{role}

JOB DESCRIPTION:
{job_description}

RESUME:
{resume_text}


ANALYSIS RULES:

1. Evaluate the resume ONLY against the provided role and job description.

2. Do not invent experience, skills, qualifications, projects,
   achievements, or technologies.

3. A skill should be considered "matching" only when the resume
   provides clear evidence of that skill.

4. A skill should be "partial" when:
   - it is mentioned but not demonstrated clearly, OR
   - the candidate demonstrates a closely related technology/skill.

5. A skill should be "missing" when the JD requires or strongly
   prefers it and there is no evidence of it in the resume.

6. Evidence must come directly from the resume.
   Do not create evidence.

7. Match score must represent actual alignment between the resume
   and the JD, not the general quality of the candidate.

8. Consider:
   - required technical skills
   - preferred technical skills
   - responsibilities
   - experience
   - projects
   - education
   - relevant tools and technologies

9. Do not penalize the candidate for requirements that are clearly
   irrelevant to the target role.

10. Improvements must be actionable and relevant to the JD.

11. If a skill is missing, do not recommend falsely claiming it.
    Recommend adding it only if the candidate genuinely has or
    develops that skill.

12. Keep all responses concise and useful for a resume improvement
    dashboard.

13. Return only the requested structured output.
"""

    return structured_llm.invoke(prompt)