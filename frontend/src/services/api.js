const API_URL = "http://127.0.0.1:8000";

export async function analyzeResume({
  role,
  jobDescription,
  resumeFile,
}) {
  const formData = new FormData();

  formData.append("role", role);
  formData.append("job_description", jobDescription);
  formData.append("file", resumeFile);

  const response = await fetch(
    `${API_URL}/api/resume/analyze`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    let message = "Failed to analyze resume.";

    try {
      const error = await response.json();
      message = error.detail || message;
    } catch {
      // Ignore JSON parsing error
    }

    throw new Error(message);
  }

  return response.json();
}