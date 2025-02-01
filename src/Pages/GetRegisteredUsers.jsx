import React, { useState, useEffect } from 'react';
import axios from 'axios';
import eventData from '../data/eventData'; // Import the eventData

const EventRegistrationCheck = () => {
  const [eventPaths, setEventPaths] = useState([]);
  const [selectedEventPath, setSelectedEventPath] = useState('');
  const [maxTeamSize, setMaxTeamSize] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [registeredTeams, setRegisteredTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Dynamically extract event paths from the eventData
    const eventPaths = Object.values(eventData).map(event => event.eventPath);
    setEventPaths(eventPaths); // Set the event paths in state
  }, []);

  const handleEventPathChange = (event) => {
    setSelectedEventPath(event.target.value);
    // Get the maxTeamSize from the selected event
    if (event.target.value) {
      const selectedEvent = eventData[event.target.value];
      setMaxTeamSize(selectedEvent.maxTeamSize);
    }
  };

  const handleFetchRegisteredData = async () => {
    if (!selectedEventPath) {
      setError('Please select an event.');
      return;
    }

    setLoading(true);
    setError('');
    setRegisteredUsers([]);
    setRegisteredTeams([]);

    try {
      // Call your endpoint to get the registered users/teams
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/getRegisteredUsers`, { eventPath: selectedEventPath });

      // Set the response data
      setRegisteredUsers(response.data.registeredUsers);
      setRegisteredTeams(response.data.registeredTeams);
    } catch (err) {
      setError('Failed to fetch registered data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <nav style={styles.navbar}>
        <h2>Event Registration Check</h2>
      </nav>

      <div style={styles.mainContent}>
        <div style={styles.formContainer}>
          <label style={styles.label}>Select Event:</label>
          <select
            style={styles.select}
            value={selectedEventPath}
            onChange={handleEventPathChange}
          >
            <option value="">Select an event</option>
            {eventPaths.map((eventPath) => (
              <option key={eventPath} value={eventPath}>
                {eventPath}
              </option>
            ))}
          </select>

          <button
            onClick={handleFetchRegisteredData}
            disabled={loading}
            style={styles.button}
          >
            {loading ? 'Loading...' : 'Fetch Registered Users/Teams'}
          </button>
        </div>

        {error && <p style={styles.error}>{error}</p>}

        {/* Conditionally render based on maxTeamSize */}
        {maxTeamSize === 1 && registeredUsers.length > 0 && (
          <div style={styles.userList}>
            <h2>Registered Users:</h2>
            <div style={styles.gridContainer}>
              {registeredUsers.map((user, index) => (
                <div key={index} style={styles.gridItem}>
                  <p>{index + 1}. {user}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {maxTeamSize > 1 && registeredTeams.length > 0 && (
          <div style={styles.teamList}>
            <h2>Registered Teams:</h2>
            <div style={styles.gridContainer}>
              {registeredTeams.map((team, index) => (
                <div key={index} style={styles.gridItem}>
                  <p>{index + 1}. {team}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '50px',
  },
  navbar: {
    backgroundColor: '#3b5998',
    color: 'white',
    width: '100%',
    padding: '10px 0',
    textAlign: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 10,
  },
  mainContent: {
    width: '80%',
    maxWidth: '800px',
    marginTop: '80px',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  formContainer: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '10px',
    fontSize: '16px',
  },
  select: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    backgroundColor: '#f5f5f5',
    color: '#333',
    appearance: 'none',
    outline: 'none',
    cursor: 'pointer',
    position: 'relative',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#3b5998',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    cursor: 'not-allowed',
  },
  error: {
    color: 'red',
    marginTop: '20px',
  },
  userList: {
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#f0f0f0',
    borderRadius: '4px',
  },
  teamList: {
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#f0f0f0',
    borderRadius: '4px',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)', // Create 3 columns
    gap: '15px', // Space between columns and rows
  },
  gridItem: {
    backgroundColor: '#ffffff', // White background for contrast
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    color: '#333', // Dark text color for better contrast
  },
};

export default EventRegistrationCheck;
