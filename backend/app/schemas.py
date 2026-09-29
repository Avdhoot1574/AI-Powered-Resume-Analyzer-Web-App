from pydantic import BaseModel, Field
from typing import Literal


class Skill(BaseModel):
    skill: str
    status: Literal["matching", "partial", "missing"]
    evidence: str = Field(
        description="Evidence from the resume supporting this assessment."
    )


class Improvement(BaseModel):
    area: str
    suggestion: str


class SectionScore(BaseModel):
    score: int = Field(ge=0, le=100)
    comment: str


class ResumeAnalysis(BaseModel):
    match_score: int = Field(
        ge=0,
        le=100,
        description="Overall resume match with the job role and job description."
    )

    role_match: str = Field(
        description="Brief explanation of how well the resume aligns with the target role."
    )

    summary: str = Field(
        description="Concise overall assessment of the resume against the JD."
    )

    matching_skills: list[Skill]

    missing_skills: list[Skill]

    partial_skills: list[Skill]

    pros: list[str]

    cons: list[str]

    improvements: list[Improvement]

    section_scores: dict[str, SectionScore]