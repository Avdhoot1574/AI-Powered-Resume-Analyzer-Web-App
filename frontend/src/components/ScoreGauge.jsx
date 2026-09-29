import { useEffect, useState } from "react";

function getScoreInfo(score) {
  if (score < 35) {
    return {
      color: "#ef4444",
      label: "Low Match",
      description: "Significant improvements needed",
    };
  }

  if (score < 50) {
    return {
      color: "#f97316",
      label: "Needs Improvement",
      description: "Several requirements are missing",
    };
  }

  if (score < 75) {
    return {
      color: "#eab308",
      label: "Good Match",
      description: "Resume has reasonable alignment",
    };
  }

  return {
    color: "#22c55e",
    label: "Strong Match",
    description: "Resume aligns well with the role",
  };
}

function ScoreGauge({ score = 0 }) {
  const [animatedScore, setAnimatedScore] = useState(0);

  const safeScore = Math.max(
    0,
    Math.min(100, Number(score))
  );

  const info = getScoreInfo(safeScore);

  useEffect(() => {
    let frame;
    const duration = 1200;
    const start = performance.now();

    function animate(time) {
      const progress = Math.min(
        (time - start) / duration,
        1
      );

      const eased =
        1 - Math.pow(1 - progress, 3);

      setAnimatedScore(
        Math.round(safeScore * eased)
      );

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    }

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [safeScore]);

  /*
    SVG semicircle:
    start point = (30, 150)
    end point   = (270, 150)

    Needle angle:
    -90 degrees = 0
     0 degrees = 50
    90 degrees = 100
  */

  const needleAngle =
    -90 + (animatedScore * 180) / 100;

  return (
    <div className="professional-gauge">

      <div className="gauge-wrapper">

        <svg
          className="gauge-svg"
          viewBox="0 0 300 180"
          role="img"
          aria-label={`Resume match score ${safeScore} out of 100`}
        >

          {/* Base arc */}

          <path
            d="M 30 150 A 120 120 0 0 1 270 150"
            fill="none"
            stroke="#edf0f5"
            strokeWidth="22"
            strokeLinecap="round"
          />

          {/* Red */}

          <path
            d="M 30 150 A 120 120 0 0 1 72 51"
            fill="none"
            stroke="#ef4444"
            strokeWidth="22"
          />

          {/* Orange */}

          <path
            d="M 72 51 A 120 120 0 0 1 120 31"
            fill="none"
            stroke="#f97316"
            strokeWidth="22"
          />

          {/* Yellow */}

          <path
            d="M 120 31 A 120 120 0 0 1 210 51"
            fill="none"
            stroke="#eab308"
            strokeWidth="22"
          />

          {/* Green */}

          <path
            d="M 210 51 A 120 120 0 0 1 270 150"
            fill="none"
            stroke="#22c55e"
            strokeWidth="22"
          />

          {/* Inner subtle arc */}

          <path
            d="M 42 150 A 108 108 0 0 1 258 150"
            fill="none"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="2"
          />

          {/* Scale ticks */}

          {[0, 25, 50, 75, 100].map(
            (value) => {
              const angle =
                -90 + value * 1.8;

              const radians =
                (angle * Math.PI) / 180;

              const outerRadius = 139;
              const innerRadius = 128;

              const cx = 150;
              const cy = 150;

              const x1 =
                cx +
                outerRadius *
                  Math.cos(radians);

              const y1 =
                cy +
                outerRadius *
                  Math.sin(radians);

              const x2 =
                cx +
                innerRadius *
                  Math.cos(radians);

              const y2 =
                cy +
                innerRadius *
                  Math.sin(radians);

              return (
                <line
                  key={value}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#667085"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              );
            }
          )}

          {/* Needle */}

          <g
            className="gauge-needle-group"
            style={{
              transform: `rotate(${needleAngle}deg)`,
              transformOrigin: "150px 150px",
            }}
          >
            <line
              x1="150"
              y1="150"
              x2="150"
              y2="55"
              stroke="#172033"
              strokeWidth="4"
              strokeLinecap="round"
            />

            <circle
              cx="150"
              cy="150"
              r="9"
              fill="#172033"
            />

            <circle
              cx="150"
              cy="150"
              r="4"
              fill="white"
            />
          </g>
        </svg>

        {/* Scale numbers */}

        <span className="gauge-number gauge-0">
          0
        </span>

        <span className="gauge-number gauge-25">
          25
        </span>

        <span className="gauge-number gauge-50">
          50
        </span>

        <span className="gauge-number gauge-75">
          75
        </span>

        <span className="gauge-number gauge-100">
          100
        </span>
      </div>

      {/* Score BELOW gauge */}

      <div className="gauge-score">
        <span
          className="score-number"
          style={{ color: info.color }}
        >
          {animatedScore}
        </span>

        <span className="score-denominator">
          / 100
        </span>
      </div>

      <div
        className="gauge-label"
        style={{ color: info.color }}
      >
        {info.label}
      </div>

      <p className="gauge-description">
        {info.description}
      </p>
    </div>
  );
}

export default ScoreGauge;