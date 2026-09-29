function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loading-orb">
        <div className="loading-ring" />
        <span>AI</span>
      </div>

      <h2>Analyzing your resume</h2>

      <p>
        We're comparing your resume with the job
        requirements and generating your report.
      </p>

      <div className="loading-progress">
        <span />
      </div>

      <div className="loading-status">
        <span>Resume analysis in progress</span>
        <span className="loading-dots">
          • • •
        </span>
      </div>
    </div>
  );
}

export default LoadingScreen;