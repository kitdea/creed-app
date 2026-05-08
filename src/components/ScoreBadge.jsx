import React from 'react';

export default function ScoreBadge({ score, total, theme: t }) {
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  const perfect = score === total;

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "10px 18px",
      borderRadius: 10,
      background: perfect ? t.correctBg : t.wrongBg,
      border: `1px solid ${perfect ? t.correctColor : t.wrongColor}`,
    }}>
      <span style={{
        fontSize: 22,
        fontWeight: 700,
        color: perfect ? t.correctColor : t.wrongColor,
        fontFamily: "'Fira Code', monospace",
      }}>
        {score}/{total}
      </span>
      <span style={{
        fontSize: 12,
        color: perfect ? t.correctColor : t.wrongColor,
        fontFamily: "'Fira Code', monospace",
        letterSpacing: "0.04em",
      }}>
        {perfect ? "PERFECT 🙌" : `${pct}% — keep going!`}
      </span>
    </div>
  );
}
