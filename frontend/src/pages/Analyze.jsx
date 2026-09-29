import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import LoadingScreen from "../components/LoadingScreen";
import { analyzeResume } from "../services/api";

function Analyze() {
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [jobDescription, setJobDescription] =
    useState("");

  const [resumeFile, setResumeFile] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    if (!role.trim()) {
      setError("Please enter the job role.");
      return;
    }

    if (!jobDescription.trim()) {
      setError(
        "Please enter the job description."
      );
      return;
    }

    if (!resumeFile) {
      setError(
        "Please upload your resume."
      );
      return;
    }

    try {
      setLoading(true);

      const result = await analyzeResume({
        role,
        jobDescription,
        resumeFile,
      });

      navigate("/report", {
        state: {
          result,
          role,
        },
      });

    } catch (err) {
      setError(
        err.message ||
          "Unable to analyze resume."
      );
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="page">
        <Navbar />
        <LoadingScreen />
      </div>
    );
  }

  return (
    <div className="page">
      <Navbar />

      <main className="analyze-container">

        <div className="page-heading">
          <span className="eyebrow">
            Resume Analysis
          </span>

          <h1>
            Analyze your resume
          </h1>

          <p>
            Tell us what role you're targeting and
            provide the job description.
          </p>
        </div>

        <form
          className="analysis-form"
          onSubmit={handleSubmit}
        >

          <div className="form-group">
            <label htmlFor="role">
              Target Job Role
            </label>

            <input
              id="role"
              type="text"
              placeholder="e.g. Python Backend Developer"
              value={role}
              onChange={(event) =>
                setRole(event.target.value)
              }
            />
          </div>

          <div className="form-group">
            <div className="label-row">
              <label htmlFor="job-description">
                Job Description
              </label>

              <span>
                Paste the complete JD
              </span>
            </div>

            <textarea
              id="job-description"
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={(event) =>
                setJobDescription(
                  event.target.value
                )
              }
              rows={12}
            />
          </div>

          <div className="form-group">

            <label>
              Resume
            </label>

            <label className="file-upload">

              <input
                type="file"
                accept=".pdf,.docx"
                onChange={(event) =>
                  setResumeFile(
                    event.target.files[0] ||
                      null
                  )
                }
              />

              <div className="upload-content">

                <div className="upload-icon">
                  ↑
                </div>

                {resumeFile ? (
                  <>
                    <strong>
                      {resumeFile.name}
                    </strong>

                    <span>
                      Click to replace file
                    </span>
                  </>
                ) : (
                  <>
                    <strong>
                      Drop your resume here
                    </strong>

                    <span>
                      or click to browse · PDF or DOCX
                    </span>
                  </>
                )}

              </div>

            </label>
          </div>

          {error && (
            <div className="error-message">
              <span>!</span>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="primary-button analyze-button"
          >
            Analyze Resume
            <span>→</span>
          </button>

        </form>

      </main>
    </div>
  );
}

export default Analyze;