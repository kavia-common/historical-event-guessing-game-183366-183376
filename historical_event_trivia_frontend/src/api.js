const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:3001';

// Small helper to handle fetch with JSON
async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    credentials: 'include', // allow backend to manage HttpOnly cookies for session
    method: options.method || 'GET',
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const contentType = res.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');
  const payload = isJson ? await res.json() : await res.text();

  if (!res.ok) {
    const message = isJson ? (payload.message || 'Request failed') : payload || 'Request failed';
    const error = new Error(message);
    error.status = res.status;
    error.payload = payload;
    throw error;
  }

  return payload;
}

// PUBLIC_INTERFACE
export async function getToday() {
  /** Fetch today's game state. Creates a session if none exists. */
  return request('/api/today', { method: 'GET' });
}

// PUBLIC_INTERFACE
export async function revealNext(session_id) {
  /** Reveal the next clue for the current session (or create if missing). */
  const body = session_id ? { session_id } : undefined;
  return request('/api/reveal', { method: 'POST', body });
}

// PUBLIC_INTERFACE
export async function submitGuess(guess, session_id) {
  /** Submit a guess for today's event. Returns updated game state. */
  if (!guess || !guess.trim()) {
    throw new Error('Please enter a guess');
  }
  const body = { guess: guess.trim(), ...(session_id ? { session_id } : {}) };
  return request('/api/guess', { method: 'POST', body });
}

export default {
  getToday,
  revealNext,
  submitGuess
};
