import React from 'react';

// PUBLIC_INTERFACE
export default function ResultBanner({ gameOver, success, answer }) {
  /**
   * Displays game result banner.
   * answer: optional { title, year, description }
   */
  if (!gameOver) return null;

  const color = success ? '#10B981' : '#EF4444';
  const bg = success ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)';
  const title = success ? 'You got it! 🎉' : 'Good try!';

  return (
    <div style={{ ...styles.root, background: bg, borderColor: color }}>
      <div style={{ ...styles.title, color }}>{title}</div>
      {answer && (
        <div style={styles.answer}>
          <div style={styles.answerTitle}>
            {answer.title}{typeof answer.year === 'number' ? ` (${answer.year})` : ''}
          </div>
          {answer.description ? (
            <div style={styles.answerDesc}>{answer.description}</div>
          ) : null}
        </div>
      )}
    </div>
  );
}

const styles = {
  root: {
    border: '1px solid',
    borderRadius: 12,
    padding: '12px 14px',
    marginTop: 12,
  },
  title: {
    fontWeight: 700,
    marginBottom: 6,
  },
  answer: {
    color: 'var(--text-primary, #111827)',
  },
  answerTitle: {
    fontWeight: 600,
  },
  answerDesc: {
    marginTop: 4,
    opacity: 0.9,
    lineHeight: 1.5,
  },
};
