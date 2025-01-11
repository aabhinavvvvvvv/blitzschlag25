import React, { useState } from 'react';
import axios from 'axios';

function ResetLeaderboard() {
  const [message, setMessage] = useState('');
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const handleReset = async () => {
    try {
      const response = await axios.post(`${apiBaseUrl}/leaderboard/reset`);
      setMessage(`Leaderboard reset successfully: ${response.data.message}`);
    } catch (error) {
      console.error('Error resetting leaderboard:', error);
      setMessage('Failed to reset leaderboard. Please try again.');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        textAlign: 'center',
      }}
    >
      <h1>Reset Leaderboard</h1>
      <button
        onClick={handleReset}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          color: '#fff',
          backgroundColor: '#d9534f',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Reset Leaderboard
      </button>
      {message && <p style={{ marginTop: '20px', color: '#555' }}>{message}</p>}
    </div>
  );
}

export default ResetLeaderboard;
