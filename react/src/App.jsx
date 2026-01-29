import { useState } from 'react';

// 1. PUT YOUR RENDER URL HERE
const API_URL = "https://mynotes-app-mgm7.onrender.com/api/v1"; 

function App() {
  const [token, setToken] = useState(null);
  const [notes, setNotes] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // --- 2. THE LOGIN LOGIC ---
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      
      if (data.success) {
        setToken(data.token); // Save the JWT in memory
        alert("Logged In! Token Received.");
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // --- 3. THE FETCH DATA LOGIC ---
  const fetchNotes = async () => {
    try {
      const res = await fetch(`${API_URL}/notes`, {
        method: 'GET',
        headers: {
          // THIS IS THE KEY: Sending the token in the header
          'Authorization': `Bearer ${token}` 
        },
      });
      const data = await res.json();
      setNotes(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '50px', fontFamily: 'sans-serif' }}>
      <h1>MyNotes Frontend 🚀</h1>
      
      {!token ? (
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
          <h2>Login First</h2>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          <button type="submit">Login</button>
        </form>
      ) : (
        <div>
          <h2>✅ Authenticated</h2>
          <button onClick={fetchNotes}>Load My Notes</button>
          <ul>
            {notes.map(note => (
              <li key={note._id}>
                <strong>{note.title}</strong>: {note.text}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;