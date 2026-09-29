import re

from langchain_community.document_loaders import (
    PyPDFLoader,
    Docx2txtLoader
)


def clean_text(text: str) -> str:
    text = re.sub(r"\s+", " ", text)
    text = re.sub(r"\s+([,.;:!?])", r"\1", text)

    return text.strip()


def extract_resume_text(file_path: str) -> str:

    if file_path.endswith(".pdf"):
        loader = PyPDFLoader(file_path)

    elif file_path.endswith(".docx"):
        loader = Docx2txtLoader(file_path)

    else:
        raise ValueError("Unsupported file type")

    documents = loader.load()

    raw_text = "\n".join(
        document.page_content
        for document in documents
    )

    return clean_text(raw_text)