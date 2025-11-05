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

  // Effect to apply theme to document element
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
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
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

        <div style={styles.container}>
          <h1 style={styles.title}>Historical Event Trivia</h1>
          {dateLabel ? <div style={styles.date}>{dateLabel}</div> : null}

          {loading ? (
            <div style={styles.loading}>Loading game…</div>
          ) : (
            <>
              {error ? <div style={styles.error} role="alert">{error}</div> : null}

              {/* Clues */}
              <div style={styles.section}>
                <div style={styles.sectionTitle}>Clues</div>
                <div style={styles.clues}>
                  {(state?.clues || [])
                    .slice(0, state?.clues_revealed || 0)
                    .map((text, idx) => (
                      <ClueCard key={idx} index={idx} text={text} />
                    ))}
                </div>
              </div>

              {/* Guess input and actions */}
              <div style={styles.section}>
                <GuessInput
                  onSubmit={onSubmit}
                  onReveal={onReveal}
                  disabled={busy}
                  gameOver={!!state?.game_over}
                />
              </div>

              {/* Attempts */}
              <div style={styles.section}>
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

const styles = {
  container: {
    width: 'min(860px, 92vw)',
    margin: '0 auto',
    textAlign: 'left',
  },
  title: {
    margin: 0,
    fontSize: 28,
    color: 'var(--text-primary, #111827)',
  },
  date: {
    marginTop: 6,
    color: 'rgba(17,24,39,0.7)',
    fontSize: 14,
  },
  section: {
    marginTop: 18,
  },
  sectionTitle: {
    fontWeight: 700,
    marginBottom: 8,
    color: 'var(--text-primary, #111827)',
  },
  clues: {
    display: 'grid',
    gap: 10,
  },
  loading: {
    padding: '12px 0',
    opacity: 0.8,
  },
  error: {
    background: 'rgba(239,68,68,0.1)',
    color: '#991B1B',
    border: '1px solid rgba(239,68,68,0.35)',
    borderRadius: 8,
    padding: '10px 12px',
    marginBottom: 8,
  },
};

export default App;
