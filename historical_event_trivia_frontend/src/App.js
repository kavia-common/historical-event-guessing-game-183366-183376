import React, { useState, useEffect } from 'react';
import './App.css';
import { getToday, revealNext, submitGuess } from './api';
import ClueCard from './components/ClueCard';
import GuessInput from './components/GuessInput';
import AttemptTracker from './components/AttemptTracker';
import ResultBanner from './components/ResultBanner';

// PUBLIC_INTERFACE
function App() {
  /**
   * Historical Event Trivia Game UI
   * - Loads today's game state
   * - Allows revealing clues and submitting guesses
   * - Shows attempts and result
   */
  const [theme, setTheme] = useState('light');
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [state, setState] = useState(null); // GameState from API

  // Apply theme to <html> for CSS variables
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Load today's state on mount
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError('');
        const s = await getToday();
        setState(s);
      } catch (e) {
        setError(e?.message || 'Failed to load game.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const onReveal = async () => {
    if (busy || state?.game_over) return;
    try {
      setBusy(true);
      setError('');
      const updated = await revealNext(state?.session_id);
      setState(updated);
    } catch (e) {
      setError(e?.message || 'Failed to reveal clue.');
    } finally {
      setBusy(false);
    }
  };

  const onSubmit = async (guess) => {
    if (busy || state?.game_over) return;
    try {
      setBusy(true);
      setError('');
      const updated = await submitGuess(guess, state?.session_id);
      setState(updated);
    } catch (e) {
      setError(e?.message || 'Failed to submit guess.');
    } finally {
      setBusy(false);
    }
  };

  const dateLabel = state?.date ? new Date(state.date).toDateString() : '';

  return (
    <div className="App">
      <header className="App-header">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>

        <div className="panel" role="main" aria-label="Historical Event Trivia game">
          <h1 className="title">Historical Event Trivia</h1>
          {dateLabel ? <div className="date" aria-live="polite">{dateLabel}</div> : null}

          {loading ? (
            <div className="loading" role="status" aria-live="polite">Loading game…</div>
          ) : (
            <>
              {error ? <div className="error" role="alert">{error}</div> : null}

              {/* Clues */}
              <div className="section" aria-labelledby="clues-title">
                <div id="clues-title" className="section-title">Clues</div>
                <div className="clues">
                  {(state?.clues || [])
                    .slice(0, state?.clues_revealed || 0)
                    .map((text, idx) => (
                      <ClueCard key={idx} index={idx} text={text} />
                    ))}
                </div>
              </div>

              {/* Guess input and actions */}
              <div className="section">
                <GuessInput
                  onSubmit={onSubmit}
                  onReveal={onReveal}
                  disabled={busy}
                  gameOver={!!state?.game_over}
                />
              </div>

              {/* Attempts */}
              <div className="section">
                <AttemptTracker
                  attemptsUsed={state?.attempts_used ?? 0}
                  maxAttempts={state?.max_attempts ?? 5}
                />
              </div>

              {/* Result banner */}
              <ResultBanner
                gameOver={!!state?.game_over}
                success={!!state?.success}
                answer={state?.answer}
              />
            </>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
