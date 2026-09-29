function SkillSection({
  title,
  skills = [],
  type,
}) {
  return (
    <section className="report-card skill-card">

      <div className="section-title-row">
        <div>
          <h2>{title}</h2>
          <p className="section-subtitle">
            {type === "matching" &&
              "Skills clearly demonstrated in your resume."}

            {type === "partial" &&
              "Skills that need stronger evidence."}

            {type === "missing" &&
              "Requirements not found in your resume."}
          </p>
        </div>

        <span className={`count-badge ${type}`}>
          {skills.length}
        </span>
      </div>

      {skills.length === 0 ? (
        <div className="empty-state">
          No items found.
        </div>
      ) : (
        <div className="skills-list">
          {skills.map((item, index) => (
            <div
              className="skill-item"
              key={`${item.skill}-${index}`}
            >
              <div className="skill-header">
                <strong>{item.skill}</strong>

                <span
                  className={`skill-status ${item.status}`}
                >
                  {item.status}
                </span>
              </div>

              {item.evidence && (
                <p>{item.evidence}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default SkillSection;