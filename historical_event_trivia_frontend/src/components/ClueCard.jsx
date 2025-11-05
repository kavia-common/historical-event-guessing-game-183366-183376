import React from 'react';

// PUBLIC_INTERFACE
export default function ClueCard({ index, text }) {
  /** Displays a single clue card with index and text */
  return (
    <div style={styles.card} aria-label={`Clue ${index + 1}`}>
      <div style={styles.badge}>Clue {index + 1}</div>
      <div style={styles.text}>{text}</div>
    </div>
  );
}

const styles = {
  card: {
    background: 'var(--bg-secondary, #f8f9fa)',
    border: '1px solid var(--border-color, #e5e7eb)',
    borderRadius: 12,
    padding: '12px 16px',
    textAlign: 'left',
    width: '100%',
    boxSizing: 'border-box',
    boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
  },
  badge: {
    display: 'inline-block',
    background: 'rgba(37,99,235,0.08)',
    color: '#2563EB',
    fontWeight: 600,
    fontSize: 12,
    padding: '4px 8px',
    borderRadius: 999,
    marginBottom: 8,
  },
  text: {
    color: 'var(--text-primary, #111827)',
    fontSize: 16,
    lineHeight: 1.5,
  },
};
