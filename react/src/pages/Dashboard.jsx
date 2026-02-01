import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = "https://YOUR-APP-NAME.onrender.com/api/v1"; 

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const navigate = useNavigate();

  // Load token from storage
  const token = localStorage.getItem('token');

  // If no token, kick user back to login
  useEffect(() => {
    if (!token) {
      navigate('/');
    } else {
      fetchNotes();
    }
  }, [token, navigate]);

  const fetchNotes = async () => {
    const res = await fetch(`${API_URL}/notes`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    const data = await res.json();
    setNotes(data.data || []);
  };

  const createNote = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/notes`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ title, text }),
    });
    const data = await res.json();
    if (data.success) {
      setTitle(''); setText('');
      fetchNotes();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Delete token
    navigate('/'); // Go to login
  };

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>My Dashboard</h1>
        <button onClick={handleLogout} style={{ background: 'red', color: 'white', padding: '5px 10px' }}>Logout</button>
      </div>

      <div style={{ background: '#f0f0f0', padding: '20px', marginBottom: '20px' }}>
        <h3>Add Note</h3>
        <form onSubmit={createNote}>
          <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }} />
          <textarea placeholder="Details..." value={text} onChange={e => setText(e.target.value)} required style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }} />
          <button type="submit" style={{ background: 'blue', color: 'white', padding: '10px' }}>Save</button>
        </form>
      </div>

      {notes.map(note => (
        <div key={note._id} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
          <h4>{note.title}</h4>
          <p>{note.text}</p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;