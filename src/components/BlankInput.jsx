import React from 'react';
import { normalize } from '../utils/helpers';

export default function BlankInput({ seg, answers, revealed, checked, shaking, onInput, onReveal, theme: t }) {
  const id = seg.id;
  const val = answers[id] || "";
  const isRev = revealed.has(id);
  const correct = checked && normalize(val) === normalize(seg.text);
  const wrong = checked && normalize(val) !== normalize(seg.text) && !isRev;
  const charLen = seg.text.replace(/^\n\n/, "").trim().length;
  const minW = Math.min(Math.max(charLen * 7.5, 80), 260);

  const borderColor = isRev ? t.revealColor : correct ? t.correctColor : wrong ? t.wrongColor : t.blankBorder;
  const textColor   = isRev ? t.revealColor : correct ? t.correctColor : wrong ? t.wrongColor : t.inputText;

  if (isRev) {
    return (
      <span style={{
        display: "inline",
        color: t.revealColor,
        borderBottom: `2px solid ${t.revealColor}`,
        padding: "0 3px",
        fontStyle: "italic",
        fontFamily: "inherit",
        fontSize: "inherit",
      }}>
        {seg.text.replace(/^\n\n/, "")}
      </span>
    );
  }

  return (
    <span style={{ display: "inline-block", position: "relative", verticalAlign: "baseline" }}>
      <input
        type="text"
        value={val}
        onChange={e => onInput(id, e.target.value)}
        placeholder="···"
        aria-label={`Fill in: ${seg.text.trim()}`}
        style={{
          width: minW,
          maxWidth: "min(260px, 85vw)",
          background: "transparent",
          border: "none",
          borderBottom: `2px solid ${borderColor}`,
          color: textColor,
          fontSize: "inherit",
          fontFamily: "inherit",
          lineHeight: "inherit",
          padding: "0 4px 1px",
          textAlign: "center",
          caretColor: t.accent,
          outline: "none",
          transition: "border-color 0.25s, color 0.25s",
          animation: shaking.has(id) ? "shake 0.4s ease" : "none",
        }}
      />
      {wrong && (
        <button
          onClick={() => onReveal(id)}
          title="Reveal answer"
          aria-label="Reveal answer"
          style={{
            position: "absolute",
            right: -20,
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: t.accent,
            fontSize: 13,
            padding: 2,
            lineHeight: 1,
            opacity: 0.75,
          }}
        >👁</button>
      )}
    </span>
  );
}
