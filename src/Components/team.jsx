import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { auth } from '../../firebase'; // Import Firebase auth
import { useNavigate } from 'react-router-dom';

const TeamComponent = ({ event }) => {
  const [teamName, setTeamName] = useState('');
  const [loading, setLoading] = useState(false);
  const [uid, setUid] = useState(null); // Store the UID here
  const navigate = useNavigate();

  // Fetch the current user's UID when the component mounts
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUid(user.uid); // Set UID when the user is logged in
    } else {
      toast.error("User not logged in.");
    }
  }, []);

  const handleCreateTeam = async () => {
    if (!teamName || loading) return;

    if (!uid) {
      toast.error("User not logged in.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/createteam`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid,
          eventPath: event.eventPath,
          teamName,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        if (data.message && data.message.toLowerCase().includes("email is not verified")) {
          toast.error("Your email is not verified. Please verify your email to create a team.");
        } else {
          toast.error(data.message || "Failed to create team.");
        }
      } else {
        // Show team code in a styled alert with copy-to-clipboard functionality
        Swal.fire({
          title: 'Team Created Successfully!',
          html: `
            <p>Your team code is: <strong>${data.code}</strong></p>
            <button id="copy-button" class="swal2-confirm swal2-styled" style="background-color: #4CAF50; color: white;">
              Copy to Clipboard
            </button>
          `,
          icon: 'success',
          showConfirmButton: false,
          didRender: () => {
            const copyButton = document.getElementById('copy-button');
            copyButton.addEventListener('click', () => {
              navigator.clipboard.writeText(data.code).then(() => {
                toast.success('Team code copied to clipboard!');
              });
            });
          },
        });

        // Redirect to the payment page with the required props
        navigate('/pay', {
          state: {
            amount: 2000, // Replace with the actual amount
            userId: uid,
            teamCode: data.code,
          },
        });

        setTeamName('');
      }
    } catch (error) {
      console.error("Error creating team:", error);
      toast.error("An error occurred while creating the team.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Create Team</h3>

      {/* Create Team Form */}
      <div>
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Enter your team name"
          className="placeholder-white bg-transparent w-full p-3 mt-2 border-b-2 border-gray-300 outline-none text-white"
        />
        <button
          onClick={handleCreateTeam}
          disabled={loading}
          className={`w-full bg-transparent border-2 border-white text-white p-3 rounded-lg mt-4 ${loading && 'opacity-50'}`}
        >
          {loading ? "Creating Team..." : "Create Team"}
        </button>
      </div>
    </div>
  );
};

export default TeamComponent;
