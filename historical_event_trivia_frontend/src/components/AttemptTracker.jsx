import React from 'react';

// PUBLIC_INTERFACE
export default function AttemptTracker({ attemptsUsed = 0, maxAttempts = 5 }) {
  /** Visual tracker showing attempts used out of max attempts. */
  const items = Array.from({ length: maxAttempts });
  return (
    <div style={styles.container} aria-label="Attempt tracker">
      {items.map((_, idx) => {
        const used = idx < attemptsUsed;
        return (
          <div
            key={idx}
            title={`Attempt ${idx + 1} ${used ? 'used' : 'available'}`}
            style={{
              ...styles.dot,
              background: used ? '#EF4444' : 'rgba(17,24,39,0.1)',
              borderColor: used ? '#EF4444' : 'rgba(17,24,39,0.15)',
            }}
          />
        );
      })}
      <div style={styles.label}>{attemptsUsed} / {maxAttempts} attempts</div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 999,
    border: '1px solid transparent',
  },
  label: {
    marginLeft: 8,
    color: 'var(--text-primary, #111827)',
    fontSize: 14,
  },
};
