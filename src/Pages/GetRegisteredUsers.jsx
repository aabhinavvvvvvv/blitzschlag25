import React, { useState, useEffect } from 'react';
import axios from 'axios';
import eventData from '../data/eventData'; // Static import of event data
import { jsPDF } from 'jspdf';
import html2pdf from 'html2pdf.js';

const EventRegistrationCheck = () => {
  const [eventPaths, setEventPaths] = useState([]);
  const [selectedEventPath, setSelectedEventPath] = useState('');
  const [maxTeamSize, setMaxTeamSize] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [registeredTeams, setRegisteredTeams] = useState([]);
  const [RegisterUserData, setRegisterUserData] = useState([]);
  const [registeredTeamsData, setRegisteredTeamsData] = useState([]); // To store team data with members
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
  const fetchTeamMembers = async (teamCode) => {
    try {
      // Get the list of user IDs for the team and the team name
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/getUsersInTeam`, { teamCode });

      if (response.data && response.data.users) {
        const userIds = response.data.users;
        const teamName = response.data.teamName; // Get the team name
        // Fetch user profiles for each ID
        const userProfiles = await Promise.all(userIds.map(async (uid) => {
          return await fetchProfileData(uid);
        }));
        return { teamName, members: userProfiles.filter(Boolean) }; // Return both teamName and members
      }
    } catch (error) {
      console.error("Error fetching team members:", error);
      return { teamName: '', members: [] }; // Return empty team name if error occurs
    }
  };

  const fetchRegisteredData = async (eventPath) => {
    setLoading(true); // Start loading
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/getRegisteredUsers`, { eventPath });
      if (response.data) {
        setRegisteredUsers(response.data.registeredUsers || []);
        setRegisteredTeams(response.data.registeredTeams || []);
        if (response.data.registeredUsers?.length > 0) {
          await fetchUserProfileData(response.data.registeredUsers);
        }
        // Fetch team data for teams with more than 1 member
        const teamDataPromises = response.data.registeredTeams.map(async (teamCode) => {
          const { teamName, members } = await fetchTeamMembers(teamCode);
          return { teamCode, teamName, members }; // Include teamName
        });
        const teamData = await Promise.all(teamDataPromises);
        setRegisteredTeamsData(teamData); // Store the fetched team data in state
      }
    } catch (err) {
      setError('Failed to fetch registered data.');
    } finally {
      setLoading(false); // Stop loading after fetching
    }
  };
  // PDF Download Function
  const handleDownloadPDF = () => {
  const doc = new jsPDF('landscape');  // Set PDF to landscape orientation

  // Set a smaller default font size for the entire document
  doc.setFontSize(10);  // Default font size for the document

  // Add the title for the document (Optional, you can adjust this if needed)
  doc.setFontSize(12);  // Title font size can be a bit larger
  doc.text('Event Registration Details', 20, 20);

  let currentY = 30;  // Start position for the first content

  // Function to check if we need to add a new page
  const checkPageBreak = (height) => {
    if (currentY + height > doc.internal.pageSize.height - 20) {
      doc.addPage();
      currentY = 20; // Reset Y position after adding a new page
    }
  };

  // Add Registered Users data if applicable (for single-person events)
  if (maxTeamSize === 1 && RegisterUserData.length > 0) {
    doc.setFontSize(10);  // Use smaller font for content
    doc.text('Registered Users:', 20, currentY);
    currentY += 10;

    // Table headers for users
    doc.setFontSize(9);  // Slightly smaller for headers
    doc.text('No.', 20, currentY);
    doc.text('User ID', 30, currentY);
    doc.text('Name', 70, currentY);  // Adjusted spacing for name
    doc.text('Email', 130, currentY);

    currentY += 10; // Move down for the next row

    // Add user rows to the table
    RegisterUserData.forEach((user, index) => {
      checkPageBreak(10);  // Check if the content will overflow

      doc.setFontSize(10);  // Use smaller font for the content rows
      doc.text(`${index + 1}`, 20, currentY);
      doc.text(user.blitzId, 30, currentY);

      // Split Name text if it's too long
      const nameWidth = 60;  // Width for the Name column
      const nameText = doc.splitTextToSize(user.userName, nameWidth);  // Split the name into multiple lines if it's too long
      doc.text(nameText, 70, currentY);  // Add the name text in the Name column

      // Email goes into the next column
      doc.text(user.email, 130, currentY);  // Adjusted spacing for email

      // Decrease the space between rows
      const lineHeight = 5;  // Adjust line height (previously 10)
      currentY += nameText.length * lineHeight + 5;  // Adjust the Y based on the number of lines in the name (reduce space between rows)
    });
  }

  // Add Registered Teams data if applicable (for team events)
  if (maxTeamSize > 1 && registeredTeamsData.length > 0) {
    doc.addPage(); // Add a new page for teams if necessary
    currentY = 30; // Reset Y position for teams section

    doc.setFontSize(10);  // Use smaller font for content
    doc.text('Registered Teams:', 20, currentY);
    currentY += 10;

    // Table headers for teams
    doc.setFontSize(9);  // Smaller font for headers
    doc.text('Team Code', 20, currentY);
    doc.text('Team Name', 60, currentY);
    doc.text('No. of Users', 120, currentY);
    doc.text('Team Members', 140, currentY);

    currentY += 10;  // Move down for the next row

    // Add team rows to the table
    registeredTeamsData.forEach((team, index) => {
      checkPageBreak(20);  // Check if the content will overflow

      // Team code, name, and user count
      doc.setFontSize(10);  // Smaller font for team details
      doc.text(team.teamCode, 20, currentY);
      doc.text(team.teamName, 60, currentY);
      doc.text(`${team.members.length}`, 120, currentY);

      currentY += 10;  // Move to the next line

      // Formatting team members with word wrapping
      let teamMembersY = currentY;
      team.members.forEach((member) => {
        checkPageBreak(10);  // Check if the content will overflow

        const memberName = member.userName;
        const memberEmail = member.email;

        // Split member name if it's too long
        const memberNameWidth = 60;
        const memberNameText = doc.splitTextToSize(memberName, memberNameWidth);  // Split name into multiple lines if necessary

        // Name is on one line (or more if wrapped)
        memberNameText.forEach((line, lineIndex) => {
          doc.text(line, 140, teamMembersY + (lineIndex * 5));  // Adding line breaks for wrapped text
        });

        // Email goes on the next line (wrapped if necessary)
        teamMembersY += memberNameText.length * 5 + 5;  // Adjust space after name
        doc.text(`(${memberEmail})`, 140, teamMembersY);

        // Increment Y position after the email
        teamMembersY += 10;  // Increase the Y position for the next member
      });

      // Adjust currentY after all team members are added
      currentY = teamMembersY + 10;
    });
  }

  // Save the document
  doc.save(`${selectedEventPath}.pdf`);
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

        {maxTeamSize > 1 && registeredTeamsData.length > 0 && (
          <div style={styles.teamList}>
            <h2>Registered Teams:</h2>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>Team Code</th>
                  <th style={styles.tableHeader}>Team Name</th> {/* New column for team name */}
                  <th style={styles.tableHeader}>No. of Users</th>
                  <th style={styles.tableHeader}>Team Members</th>
                </tr>
              </thead>
              <tbody>
                {registeredTeamsData.map((team, index) => (
                  <tr
                    key={index}
                    style={styles.tableRow}
                    onMouseEnter={(e) => e.target.style.backgroundColor = styles.tableRowHover.backgroundColor}
                    onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                  >
                    <td style={styles.tableCell}>{team.teamCode}</td>
                    <td style={styles.tableCell}>{team.teamName}</td> {/* Display team name */}
                    <td style={styles.tableCell}>{team.members.length}</td>
                    <td style={styles.tableCell}>
                      <div style={styles.teamMemberList}>
                        {team.members.map((user, index) => (
                          <div key={index} style={styles.teamMemberItem}>
                            <div style={styles.teamMemberName}>{user.userName}</div>
                            <div style={styles.teamMemberEmail}>{user.email}</div>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <button
          onClick={handleDownloadPDF}
          style={styles.button}
        >
          Download PDF
        </button>


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
    width: '90%',
    maxWidth: '1000px',
    marginTop: '80px',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    overflowX: 'auto',
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
    color: 'black',
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  button: {
    backgroundColor: '#3b5998',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '20px',
    display: 'inline-block',
  },
  tableHeader: {
    backgroundColor: '#3b5998',
    color: 'white',
    textAlign: 'left',
    padding: '10px 12px',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  tableCell: {
    padding: '10px 12px',
    border: '1px solid #ddd',
    textAlign: 'left',
    fontSize: '14px',
  },
  tableRow: {
    transition: 'background-color 0.3s ease',
  },
  tableRowHover: {
    backgroundColor: '#f5f5f5',
  },
  teamMemberList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)', // 2 members per row
    gap: '10px',
    paddingLeft: '0',
  },
  teamMemberItem: {
    backgroundColor: '#ffffff',
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  teamMemberName: {
    fontWeight: 'bold',
    color: '#333',
  },
  teamMemberEmail: {
    fontSize: '14px',
    color: '#555',
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
  responsiveTable: {
    width: '100%',
    overflowX: 'auto',
  },
  tableCellResponsive: {
    wordBreak: 'break-word',
    textOverflow: 'ellipsis',
    maxWidth: '200px',
  },
  // Media Queries for responsiveness
  '@media (max-width: 768px)': {
    table: {
      fontSize: '12px',
    },
    teamMemberList: {
      gridTemplateColumns: '1fr', // Stack team members in 1 column on small screens
    },
    tableCell: {
      padding: '8px 10px',
    },
  },
  '@media (max-width: 480px)': {
    table: {
      fontSize: '10px',
    },
    teamMemberList: {
      gridTemplateColumns: '1fr', // Stack team members in 1 column on very small screens
    },
    tableCell: {
      padding: '6px 8px',
    },
  },
};





export default EventRegistrationCheck;
