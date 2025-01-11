import React, { useState } from 'react';
import axios from 'axios';

function UpdateLeaderboard() {
  const [eventPath, setEventPath] = useState('');
  const [firstPlace, setFirstPlace] = useState({ college: '', points: '' });
  const [secondPlace, setSecondPlace] = useState({ college: '', points: '' });
  const [thirdPlace, setThirdPlace] = useState({ college: '', points: '' });
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate points fields
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Prepare data for submission
    const data = {
      eventPath,
      results: {
        first: { ...firstPlace, points: Number(firstPlace.points) },
        second: { ...secondPlace, points: Number(secondPlace.points) },
        third: { ...thirdPlace, points: Number(thirdPlace.points) },
      },
    };

    try {
      const response = await axios.post(`${apiBaseUrl}/admin/postLeaderBoard`, data);
      setMessage(`Leaderboard updated successfully: ${response.data.message}`);
      setErrors({});
    } catch (error) {
      console.error('Error updating leaderboard:', error);
      setMessage('Failed to update leaderboard. Please try again.');
    }
  };

  const validateInputs = () => {
    const errors = {};
    if (Number(firstPlace.points) <= 1) errors.firstPlacePoints = 'Points must be greater than 1 for First Place.';
    if (Number(secondPlace.points) <= 1) errors.secondPlacePoints = 'Points must be greater than 1 for Second Place.';
    if (Number(thirdPlace.points) <= 1) errors.thirdPlacePoints = 'Points must be greater than 1 for Third Place.';
    return errors;
  };

  const handleChange = (e, position) => {
    const { name, value } = e.target;
    const stateSetter = {
      first: setFirstPlace,
      second: setSecondPlace,
      third: setThirdPlace,
    }[position];

    stateSetter((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Update Leaderboard</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Event Path:</label>
          <input
            type="text"
            value={eventPath}
            onChange={(e) => setEventPath(e.target.value)}
            style={styles.input}
            placeholder="Enter event path"
            required
          />
        </div>

        {['first', 'second', 'third'].map((position, index) => {
          const place = { first: firstPlace, second: secondPlace, third: thirdPlace }[position];
          return (
            <div key={position} style={styles.section}>
              <h3 style={styles.sectionHeading}>
                {['First', 'Second', 'Third'][index]} Place
              </h3>
              <div style={styles.inputGroup}>
                <label style={styles.label}>College:</label>
                <input
                  type="text"
                  name="college"
                  value={place.college}
                  onChange={(e) => handleChange(e, position)}
                  style={styles.input}
                  placeholder="Enter college name"
                  required
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Points:</label>
                <input
                  type="number"
                  name="points"
                  value={place.points}
                  onChange={(e) => handleChange(e, position)}
                  style={styles.input}
                  placeholder="Enter points"
                  min="2"
                  required
                />
                {errors[`${position}PlacePoints`] && (
                  <p style={styles.error}>{errors[`${position}PlacePoints`]}</p>
                )}
              </div>
            </div>
          );
        })}

        <button type="submit" style={styles.button}>
          Update Leaderboard
        </button>
      </form>

      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '5px',
    color: '#555',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    color: '#333',
    outline: 'none',
  },
  error: {
    color: '#d9534f',
    fontSize: '14px',
    marginTop: '5px',
  },
  section: {
    padding: '10px 15px',
    backgroundColor: '#fff',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  sectionHeading: {
    color: '#444',
    marginBottom: '10px',
  },
  button: {
    backgroundColor: '#007BFF',
    color: '#fff',
    padding: '10px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  message: {
    textAlign: 'center',
    marginTop: '15px',
    color: '#28a745',
    fontWeight: 'bold',
  },
};

export default UpdateLeaderboard;
