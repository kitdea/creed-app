import React, { useState, useCallback, useEffect } from 'react';
import CreedText from './components/CreedText';
import ScoreBadge from './components/ScoreBadge';
import { darkTheme, lightTheme } from './theme/themes';
import {
  APOSTLES_SEGMENTS, NICENE_SEGMENTS,
  APOSTLES_BLANKABLE, NICENE_BLANKABLE,
  DIFFICULTY_OPTIONS,
} from './data/creeds';
import { pickRandom, normalize } from './utils/helpers';

export default function App() {
  const [activeTab, setActiveTab]   = useState("apostles");
  const [darkMode, setDarkMode]     = useState(true);
  const [difficulty, setDifficulty] = useState("read");

  // Per-creed independent state
  const [aBlanks,   setABlanks]   = useState(new Set());
  const [nBlanks,   setNBlanks]   = useState(new Set());
  const [aAnswers,  setAAnswers]  = useState({});
  const [nAnswers,  setNAnswers]  = useState({});
  const [aRevealed, setARevealed] = useState(new Set());
  const [nRevealed, setNRevealed] = useState(new Set());
  const [aChecked,  setAChecked]  = useState(false);
  const [nChecked,  setNChecked]  = useState(false);
  const [aScore,    setAScore]    = useState(null);
  const [nScore,    setNScore]    = useState(null);
  const [aShaking,  setAShaking]  = useState(new Set());
  const [nShaking,  setNShaking]  = useState(new Set());

  const isApostles  = activeTab === "apostles";
  const segments    = isApostles ? APOSTLES_SEGMENTS  : NICENE_SEGMENTS;
  const blankable   = isApostles ? APOSTLES_BLANKABLE : NICENE_BLANKABLE;
  const blanks      = isApostles ? aBlanks    : nBlanks;
  const answers     = isApostles ? aAnswers   : nAnswers;
  const revealed    = isApostles ? aRevealed  : nRevealed;
  const checked     = isApostles ? aChecked   : nChecked;
  const score       = isApostles ? aScore     : nScore;
  const shaking     = isApostles ? aShaking   : nShaking;
  const setBlanks   = isApostles ? setABlanks   : setNBlanks;
  const setAnswers  = isApostles ? setAAnswers  : setNAnswers;
  const setRevealed = isApostles ? setARevealed : setNRevealed;
  const setChecked  = isApostles ? setAChecked  : setNChecked;
  const setScore    = isApostles ? setAScore    : setNScore;
  const setShaking  = isApostles ? setAShaking  : setNShaking;

  const activeDiff = DIFFICULTY_OPTIONS.find(d => d.key === difficulty) || DIFFICULTY_OPTIONS[0];

  const randomize = useCallback(() => {
    const count = Math.round(blankable.length * activeDiff.ratio);
    setBlanks(count === 0 ? new Set() : pickRandom(blankable, count));
    setAnswers({});
    setRevealed(new Set());
    setChecked(false);
    setScore(null);
    setShaking(new Set());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blankable, activeDiff]);

  useEffect(() => { randomize(); }, [activeTab, difficulty]); // eslint-disable-line

  const handleInput = (id, val) => {
    setAnswers(prev => ({ ...prev, [id]: val }));
    if (checked) { setChecked(false); setScore(null); }
  };

  const handleReveal = (id) => setRevealed(prev => new Set([...prev, id]));

  const handleCheck = () => {
    let c = 0;
    const bad = new Set();
    blanks.forEach(id => {
      const seg = segments.find(s => s.id === id);
      if (normalize(answers[id] || "") === normalize(seg.text)) c++;
      else bad.add(id);
    });
    setScore(c);
    setChecked(true);
    setShaking(bad);
    setTimeout(() => setShaking(new Set()), 500);
  };

  const t = darkMode ? darkTheme : lightTheme;
  const isReadMode = difficulty === "read";

  return (
    <div style={{ minHeight: "100vh", background: t.bg, transition: "background 0.3s", fontFamily: "'EB Garamond', Georgia, serif" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input::placeholder { color: ${t.blankBorder}; opacity: 1; }
        input:focus { outline: none; }
        @keyframes shake {
          0%,100%{transform:translateX(0)}
          20%{transform:translateX(-5px)}
          40%{transform:translateX(5px)}
          60%{transform:translateX(-4px)}
          80%{transform:translateX(4px)}
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .btn-hover:hover { opacity: 0.82 !important; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: ${t.border}; border-radius: 3px; }
      `}</style>

      <div style={{
        maxWidth: 780,
        margin: "0 auto",
        padding: "clamp(20px,4vw,48px) clamp(16px,4vw,32px) 64px",
        animation: "fadeIn 0.5s ease",
      }}>

        {/* ── HEADER ── */}
        <header style={{ textAlign: "center", marginBottom: 32 }}>
          <p style={{
            fontSize: "clamp(9px,1.5vw,11px)",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: t.accent,
            marginBottom: 10,
            fontFamily: "'Cinzel', serif",
          }}>
            Sacred Texts · Memorization
          </p>
          <h1 style={{
            fontFamily: "'Cinzel', serif",
            fontWeight: 600,
            fontSize: "clamp(22px,4.5vw,38px)",
            color: t.bodyText,
            letterSpacing: "0.03em",
            lineHeight: 1.15,
          }}>
            Creed Memorization
          </h1>
          <div style={{
            width: 48, height: 1.5,
            background: `linear-gradient(90deg,transparent,${t.accent},transparent)`,
            margin: "14px auto 0",
          }} />
          <button
            onClick={() => setDarkMode(d => !d)}
            aria-label="Toggle dark/light mode"
            className="btn-hover"
            style={{
              marginTop: 16,
              background: t.toggleBg,
              border: `1px solid ${t.border}`,
              borderRadius: 20,
              padding: "6px 16px",
              color: t.accent,
              cursor: "pointer",
              fontSize: 13,
              fontFamily: "sans-serif",
              letterSpacing: "0.04em",
              transition: "all 0.2s",
            }}
          >
            {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
          </button>
        </header>

        {/* ── CREED TABS ── */}
        <nav aria-label="Select creed" style={{
          display: "flex",
          background: t.tabBg,
          borderRadius: 12,
          padding: 4,
          marginBottom: 24,
          border: `1px solid ${t.border}`,
        }}>
          {[
            { key: "apostles", label: "The Apostles' Creed" },
            { key: "nicene",   label: "The Nicene Creed" },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="btn-hover"
              aria-pressed={activeTab === tab.key}
              style={{
                flex: 1,
                padding: "clamp(9px,2vw,13px) 12px",
                borderRadius: 9,
                border: activeTab === tab.key
                  ? `1.5px solid ${t.tabActiveBorder}`
                  : "1.5px solid transparent",
                background: activeTab === tab.key ? t.tabActive : "transparent",
                color: activeTab === tab.key ? t.tabActiveText : t.tabText,
                fontFamily: "'Cinzel', serif",
                fontSize: "clamp(11px,2vw,14px)",
                fontWeight: activeTab === tab.key ? 600 : 400,
                cursor: "pointer",
                transition: "all 0.22s",
                letterSpacing: "0.03em",
              }}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* ── CONTROLS ── */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
          marginBottom: 24,
          background: t.surface,
          border: `1px solid ${t.border}`,
          borderRadius: 12,
          padding: "14px 18px",
          boxShadow: t.cardShadow,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
            <span style={{
              fontSize: 11,
              color: t.mutedText,
              fontFamily: "sans-serif",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginRight: 4,
            }}>
              Mode
            </span>
            {DIFFICULTY_OPTIONS.map(opt => {
              const isActive = difficulty === opt.key;
              return (
                <button
                  key={opt.key}
                  onClick={() => setDifficulty(opt.key)}
                  className="btn-hover"
                  title={opt.desc}
                  aria-pressed={isActive}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    padding: "5px 13px",
                    borderRadius: 20,
                    border: `1.5px solid ${isActive ? t.accent : t.border}`,
                    background: t.diffBg(isActive),
                    color: isActive ? t.accent : t.mutedText,
                    cursor: "pointer",
                    fontSize: 13,
                    fontFamily: "sans-serif",
                    fontWeight: isActive ? 700 : 400,
                    transition: "all 0.18s",
                    whiteSpace: "nowrap",
                  }}
                >
                  <span style={{ fontSize: 14 }}>{opt.icon}</span>
                  {opt.label}
                </button>
              );
            })}
          </div>

          {!isReadMode && (
            <button
              onClick={randomize}
              className="btn-hover"
              style={{
                padding: "9px 22px",
                background: `linear-gradient(135deg,${t.accent},${t.accentDark})`,
                border: "none",
                borderRadius: 8,
                color: t.foregroundOnAccent,
                fontSize: 13,
                fontWeight: 700,
                fontFamily: "sans-serif",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "opacity 0.2s",
                whiteSpace: "nowrap",
              }}
            >
              ↺ Randomize
            </button>
          )}
        </div>

        {/* ── READ MODE BANNER ── */}
        {isReadMode && (
          <div style={{
            textAlign: "center",
            marginBottom: 16,
            padding: "10px 18px",
            background: t.diffBg(true),
            border: `1px solid ${t.border}`,
            borderRadius: 10,
            color: t.mutedText,
            fontFamily: "sans-serif",
            fontSize: 13,
            letterSpacing: "0.04em",
          }}>
            📖 Reading mode — full text displayed. Switch to{" "}
            <strong style={{ color: t.accent }}>Easy</strong>,{" "}
            <strong style={{ color: t.accent }}>Normal</strong>, or{" "}
            <strong style={{ color: t.accent }}>Hard</strong> to start fill-in practice.
          </div>
        )}

        {/* ── CREED CARD ── */}
        <main>
          <article style={{
            background: t.surface,
            border: `1px solid ${t.border}`,
            borderRadius: 16,
            padding: "clamp(24px,5vw,40px) clamp(20px,5vw,40px)",
            boxShadow: t.cardShadow,
            marginBottom: 20,
          }}>
            <CreedText
              segments={segments}
              blanks={blanks}
              answers={answers}
              revealed={revealed}
              checked={checked}
              shaking={shaking}
              onInput={handleInput}
              onReveal={handleReveal}
              theme={t}
            />
          </article>
        </main>

        {/* ── CHECK ANSWERS ── */}
        {!isReadMode && (
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            <button
              onClick={handleCheck}
              className="btn-hover"
              style={{
                flex: "1 1 160px",
                padding: "12px 22px",
                background: "transparent",
                border: `1.5px solid ${t.accent}`,
                borderRadius: 10,
                color: t.accent,
                fontSize: 13,
                fontWeight: 700,
                fontFamily: "sans-serif",
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              ✓ Check Answers
            </button>
            {score !== null && (
              <ScoreBadge score={score} total={blanks.size} theme={t} />
            )}
          </div>
        )}

        <p style={{
          textAlign: "center",
          marginTop: 24,
          fontSize: 12,
          color: t.mutedText,
          fontFamily: "sans-serif",
          letterSpacing: "0.04em",
          lineHeight: 1.7,
        }}>
          {isReadMode
            ? "Use this mode to read and familiarize yourself with the full text"
            : "Tap 👁 on a wrong answer to reveal it · Randomize to get new blanks"}
        </p>
      </div>
    </div>
  );
}
