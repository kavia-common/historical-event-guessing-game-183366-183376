import React, { useState } from 'react';

// PUBLIC_INTERFACE
export default function GuessInput({ onSubmit, onReveal, disabled, gameOver }) {
  /**
   * A controlled input for entering guesses and buttons to submit guess or reveal next clue.
   * onSubmit(guessString)
   * onReveal()
   */
  const [guess, setGuess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!guess.trim() || disabled) return;
    onSubmit?.(guess.trim());
    setGuess('');
  };

  return (
    <form onSubmit={handleSubmit} style={styles.container} aria-label="Guess input">
      <input
        type="text"
        placeholder={gameOver ? 'Game over' : 'Your guess…'}
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        disabled={disabled || gameOver}
        style={styles.input}
        aria-disabled={disabled || gameOver}
      />
      <div style={styles.actions}>
        <button
          type="submit"
          style={{ ...styles.button, ...styles.primary }}
          disabled={disabled || gameOver}
          aria-disabled={disabled || gameOver}
        >
          Submit Guess
        </button>
        <button
          type="button"
          style={{ ...styles.button, ...styles.secondary }}
          onClick={onReveal}
          disabled={disabled || gameOver}
          aria-disabled={disabled || gameOver}
        >
          Reveal Next Clue
        </button>
      </div>
    </form>
  );
}

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 12,
    width: '100%',
  },
  input: {
    padding: '12px 14px',
    borderRadius: 10,
    border: '1px solid var(--border-color, #e5e7eb)',
    outline: 'none',
    fontSize: 16,
    background: 'var(--bg-primary, #ffffff)',
    color: 'var(--text-primary, #111827)',
  },
  actions: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
  },
  button: {
    padding: '10px 14px',
    borderRadius: 10,
    border: '1px solid transparent',
    cursor: 'pointer',
    fontWeight: 600,
    transition: 'transform .1s ease, box-shadow .2s ease, opacity .2s ease',
  },
  primary: {
    background: '#2563EB',
    color: '#ffffff',
    boxShadow: '0 2px 6px rgba(37,99,235,0.25)',
  },
  secondary: {
    background: '#F59E0B',
    color: '#111827',
    boxShadow: '0 2px 6px rgba(245,158,11,0.25)',
  },
};
