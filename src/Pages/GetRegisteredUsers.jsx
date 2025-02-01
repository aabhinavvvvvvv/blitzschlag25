import React, { useState, useEffect } from 'react';
import axios from 'axios';
import eventData from '../data/eventData'; // Static import of event data

const EventRegistrationCheck = () => {
  const [eventPaths, setEventPaths] = useState([]);
  const [selectedEventPath, setSelectedEventPath] = useState('');
  const [maxTeamSize, setMaxTeamSize] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [registeredTeams, setRegisteredTeams] = useState([]);
  const [RegisterUserData, setRegisterUserData] = useState([]);
  const [error, setError] = useState('');

  // Fetch event paths once during initial render
  useEffect(() => {
    const eventPaths = Object.values(eventData).map(event => event.eventPath);
    setEventPaths(eventPaths); // Set event paths from imported data
  }, []);

  useEffect(() => {
    if (selectedEventPath) {
      fetchRegisteredData(selectedEventPath);
    }
  }, [selectedEventPath]); // Fetch data when event path changes

  // Consolidated function for fetching data
  const fetchRegisteredData = async (eventPath) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/getRegisteredUsers`, { eventPath });
      if (response.data) {
        setRegisteredUsers(response.data.registeredUsers || []);
        setRegisteredTeams(response.data.registeredTeams || []);
        if (response.data.registeredUsers?.length > 0) {
          await fetchUserProfileData(response.data.registeredUsers);
        }
      }
    } catch (err) {
      setError('Failed to fetch registered data.');
    }
  };

  // Fetch profile data for each registered user
  const fetchUserProfileData = async (users) => {
    try {
      const userDataArray = await Promise.all(users.map(async (uid) => {
        const res = await fetchProfileData(uid);
        return res ? res : null;
      }));
      setRegisterUserData(userDataArray.filter(Boolean)); // Filter out null values
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  // Fetch individual user profile data
  const fetchProfileData = async (uid) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/profile?uid=${encodeURIComponent(uid)}`,
        { method: 'GET', headers: { 'Content-Type': 'application/json' } }
      );
      const result = await response.json();
      return response.ok ? result.data.userData : null;
    } catch (error) {
      console.error('Error fetching profile data:', error);
      return null;
    }
  };

  const handleEventPathChange = (event) => {
    const selectedEventPath = event.target.value;
    setSelectedEventPath(selectedEventPath);
    if (selectedEventPath) {
      const selectedEvent = eventData[selectedEventPath];
      setMaxTeamSize(selectedEvent.maxTeamSize);
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
            onClick={() => fetchRegisteredData(selectedEventPath)} // Directly call the function
            disabled={!selectedEventPath}
            style={styles.button}
          >
            Fetch Registered Users/Teams
          </button>
        </div>

        {error && <p style={styles.error}>{error}</p>}

        {/* Conditionally render based on maxTeamSize */}
        {maxTeamSize === 1 && (
          <div style={styles.userList}>
            <h2>Registered Users:{RegisterUserData.length}</h2>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>User ID</th>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {RegisterUserData.map((user, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.blitzId}</td>
                    <td>{user.userName}</td>
                    <td>{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
  table: {
    color: "black",
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
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
