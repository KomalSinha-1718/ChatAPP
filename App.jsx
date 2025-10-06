import React, { useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import ChatRoom from './pages/ChatRoom';

export default function App(){
  const [user, setUser] = useState(null);
  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h1>Chat App Demo</h1>
      {!user ? (
        <div style={{ display: 'flex', gap: 20 }}>
          <Register />
          <Login onLogin={setUser} />
        </div>
      ) : (
        <ChatRoom user={user} />
      )}
    </div>
  );
}
