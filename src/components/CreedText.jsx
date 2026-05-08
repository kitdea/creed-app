import React from 'react';
import BlankInput from './BlankInput';

export default function CreedText({ segments, blanks, answers, revealed, checked, shaking, onInput, onReveal, theme: t }) {
  return (
    <div style={{
      fontSize: "clamp(15px, 2.2vw, 17px)",
      lineHeight: 2,
      color: t.bodyText,
      fontFamily: "'Fira Code', monospace",
    }}>
      {segments.map(seg => {
        const startsNewPara = seg.text.startsWith("\n\n");
        const displayText = seg.text.replace(/^\n\n/, "");

        if (startsNewPara) {
          return (
            <span key={seg.id}>
              <br /><br />
              {blanks.has(seg.id)
                ? <BlankInput
                    seg={{ ...seg, text: displayText }}
                    answers={answers}
                    revealed={revealed}
                    checked={checked}
                    shaking={shaking}
                    onInput={onInput}
                    onReveal={onReveal}
                    theme={t}
                  />
                : <span>{displayText}</span>
              }
            </span>
          );
        }

        if (blanks.has(seg.id)) {
          return (
            <BlankInput
              key={seg.id}
              seg={seg}
              answers={answers}
              revealed={revealed}
              checked={checked}
              shaking={shaking}
              onInput={onInput}
              onReveal={onReveal}
              theme={t}
            />
          );
        }

        return <span key={seg.id}>{seg.text}</span>;
      })}
    </div>
  );
}
