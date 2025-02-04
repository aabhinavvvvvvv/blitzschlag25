import React, { useState, useEffect } from "react";
import { getAuth, signOut, sendEmailVerification, onAuthStateChanged } from "firebase/auth";
import { app } from "../../fi"; // Your Firebase initialization file
import { useNavigate } from "react-router-dom";
import profileImg from "/profile.webp";
import profilebg from '../Assets/loginbg.jpg';
import eventData from "../data/eventData";
import { Tooltip } from "react-tooltip";
import ReactQRCode from "react-qr-code";
const Profile = () => {
  const [copiedCode, setCopiedCode] = useState(null);
  const [user, setUser] = useState(null);
  const [emailVerified, setEmailVerified] = useState(false);
  const [name, setName] = useState("");
  const [eventsLoading, setEventsLoading] = useState(true);
  const [timelineEvents, setTimelineEvents] = useState({
    day1: [],
    day2: [],
    day3: [],
  });
  const [paymentRequests, setPaymentRequests] = useState([]);
  const [activeTab, setActiveTab] = useState("day1"); // Track active tab
  const [profileImage, setProfileImage] = useState(profileImg); // Profile image state
  const navigate = useNavigate();
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setEmailVerified(currentUser.emailVerified);
        setName(currentUser.displayName || "");

        fetchProfileData(currentUser.uid);
        fetchPaymentRequests(currentUser.uid);
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  const fetchPaymentRequests = async (userId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/payment/user-requests`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }), // Sending userId to the backend
        }
      );

      const result = await response.json();

      if (response.ok) {
        setPaymentRequests(result.data); // Set payment requests data
      } else {
        console.error(
          "Error fetching payment requests:",
          result.message || "Unknown error"
        );
      }

      console.log(result.data);
    } catch (error) {
      console.error("Error fetching payment requests:", error);
    }
  };

  const fetchProfileData = async (uid) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/profile?uid=${encodeURIComponent(uid)}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const result = await response.json();
      if (response.ok) {
        setApiData(result.data);
        console.log(userData);
      } else {
        console.error("Error fetching profile data:", result.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  const setApiData = (data) => {
    const { userData, teamsDetails } = data;
    const { joinedEvents } = userData;
    
    const groupedEvents = {
      day1: [],
      day2: [],
      day3: [],
    };

    joinedEvents.forEach((eventPath) => {
      const event = eventData[eventPath];
      if (event) {
        const eventDetails = {
          eventName: event.name,
          day: event.day,
          venue: event.venue,
          time: event.time,
          type: event.maxTeamSize > 1 ? "team" : "single",
        };

        if (event.maxTeamSize > 1) {
          const team = teamsDetails.find((team) => team.eventPath === eventPath);
          if (team) {
            eventDetails.teamName = team.teamName;
            eventDetails.teamMembers = team.memberNames;
            eventDetails.teamCode = team.teamCode;
          }
        }

        if (event.day === 1) groupedEvents.day1.push(eventDetails);
        if (event.day === 2) groupedEvents.day2.push(eventDetails);
        if (event.day === 3) groupedEvents.day3.push(eventDetails);
      }
    });

    setTimelineEvents(groupedEvents);
    setEventsLoading(false);
  };

  const handleVerifyEmail = async () => {
    if (user) {
      try {
        await sendEmailVerification(user);
        alert("Verification email sent! Check your inbox.");
      } catch (error) {
        console.error("Error sending verification email:", error.message);
        alert("Failed to send verification email.");
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error.message);
      alert("Failed to log out.");
    }
  };

  const handleCopyCode = (teamCode) => {
    navigator.clipboard.writeText(teamCode)
      .then(() => {
        setCopiedCode(teamCode);
        setTimeout(() => setCopiedCode(null), 2000);
      })
      .catch((error) => {
        console.error("Failed to copy text: ", error);
      });
  };

  // Handle image upload
  const handleProfileImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        // Save the image data URL to localStorage
        localStorage.setItem("profileImage", reader.result);
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("No file selected or file type is unsupported.");
    }
  };

  // Load profile image from localStorage on component mount
  useEffect(() => {
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  if (!user) {
    return <p>Redirecting to login...</p>;
  }

  return (
    <div
      style={{
        backgroundImage: `url(${profilebg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '100%',
        height: '100vh',
      }}
      className="grid grid-cols-1 sm:grid-cols-3 gap-4 h-screen p-5 pt-24 overflow-y-auto"
    >
      {/* Left Column: Profile and Info */}
      <div className="flex flex-col justify-centre space-y-8  backdrop-blur-sm bg-black bg-opacity-10 rounded-2xl p-8 pt-16 pb-16 z-10">
        <div className="relative flex flex-col items-center">
          {/* Profile Image */}
          <img
            src={profileImage}
            alt="Profile"
            draggable="false"
            onClick={() => document.getElementById("profileImageUpload").click()} // Trigger the file input on image click
            style={{
              borderColor: "rgba(0, 0, 0, 0.75)",
              boxShadow: "0 0 15px 2px black",
              cursor: "pointer", // Makes the image look clickable
            }}
            className="w-48 h-48 rounded-full object-cover bg-opacity-75 mb-4"
          />
          <button
            data-tooltip-id={`upload`}
            data-tooltip-content={"Upload Image"}
            className="absolute bottom-[10%] left-[70%] w-12 h-12 rounded-full bg-black backdrop-blur-sm bg-opacity-50 text-3xl flex items-center justify-center p-3 font-bold text-gray-400 transition-all duration-300 hover:text-white hover:bg-opacity-70 hover:rotate-90"
            onClick={() => document.getElementById("profileImageUpload").click()}
            style={{
              transformOrigin: "center",
            }}
          >
            +
          </button>


          <Tooltip
            id={`upload`}
            place="top"
            type="dark"
            effect="solid"
          />
          {/* Hidden File Input */}
          <input
            id="profileImageUpload"
            type="file"
            accept="image/*"
            onChange={handleProfileImageUpload}
            className="hidden" // Hide the file input
          />
        </div>

        <p className="text-center text-3xl" style={{ fontFamily: '"Amarante", serif' }}>{name}</p>

        <div className="space-y-4">
          
          <input
            type="email"
            value={user.email || ""}
            disabled
            readOnly
            className="placeholder-white bg-transparent w-full p-3 mt-2 border-b-2 border-gray-300 outline-none text-white"
          />
          <p className="text-sm">Email Verified: {emailVerified ? "Yes" : "No"}</p>
          {!emailVerified && (
            <button
              onClick={handleVerifyEmail}
              className="w-full bg-transparent border-2 border-white text-white p-3 rounded-lg mt-4"
            >
              Verify Email
            </button>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-black hover:bg-white hover:text-black text-lg transition-colors  bg-opacity-50 text-white p-3 rounded-lg mt-4"
        >
          Logout
        </button>
      </div>

      {/* Right Column: Events */}
      <div className="sm:col-span-2 backdrop-blur-sm bg-black bg-opacity-10 rounded-2xl z-10 flex flex-col justify-center items-center p-4">
        <p className="text-center text-7xl mb-8 font-normal text-white" style={{ fontFamily: '"Amarante", serif' }}>
          Events
        </p>

        {eventsLoading ? (
          <p>Loading events...</p>
        ) : (
          <div className="w-full">
            {/* Tabs */}
            <div className="flex justify-center mb-6 flex-wrap">
              {["day1", "day2", "day3", "payments"].map((day) => (
                <button
                  key={day}
                  onClick={() => setActiveTab(day)}
                  className={`m-2 w-32 hover:bg-white hover:text-black text-md bg-black backdrop-blur-md bg-opacity-10 p-3 rounded-lg mt-4 ${activeTab === day
                    ? "bg-white bg-opacity-100 text-black"
                    : ""}`}
                >
                  {day.toUpperCase()}
                </button>
              ))}
            </div>


            {/* Tab Content */}
            <div
              style={{
                overflowY: "auto",
                maxHeight: "calc(100vh - 320px)",
              }}
              className="w-full space-y-6"
            >
              {activeTab === "payments" ? (
  <div className="w-full">
    {paymentRequests.length === 0 ? (
      <p>No payment requests available.</p>
    ) : (
      paymentRequests.map((payment, idx) => (
        <div key={idx} className="bg-black bg-opacity-50 mb-2 rounded-xl text-white p-6">
          <h4 className="text-lg font-semibold mb-2">
            Transaction ID: {payment.transactionId}
          </h4>
          <p>{`Amount: ${payment.amount} INR`}</p>
          <p>{`Type: ${payment.type}`}</p>
          <p>{`Verified: ${payment.verified ? "Yes" : "No"}`}</p>

          {/* Show QR code only if payment is verified */}
          {payment.verified && (
            <div className="mt-4">
              <ReactQRCode value={payment.transactionId} size={128} />
            </div>
          )}

          {payment.type === "pass" && (
            <div className="payment-details">
              <h3 className="text-lg font-semibold mb-4">Pass Details</h3>
              <div className="space-y-4">
                {payment.passDetails.map((passDetail, index) => (
                  <div
                    key={index}
                    className="w-full bg-transparent border-2 border-white text-white p-4 rounded-lg mt-2"
                  >
                    <p className="font-bold mb-2">Pass Name: {passDetail.passName}</p>
                    <p className="mb-1">Quantity: {passDetail.quantity}</p>
                    <p>Total Amount: ₹{passDetail.totalAmount}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))
    )}
  </div>
) : (
                // Other day tabs
                <div>
                  {timelineEvents[activeTab].map((event, idx) => (
                    <div
                      key={idx}
                      className="bg-black bg-opacity-50 mb-2 rounded-xl text-white p-6"
                    >
                      <h4 className="text-lg font-semibold mb-2">{event.eventName}</h4>
                      <p>{`Venue: ${event.venue}`}</p>
                      <p>{`Time: ${event.time}`}</p>
                      {event.type === "team" && (
                        <>
                          <p>{`Team Name: ${event.teamName}`}</p>
                          <button
                            data-tooltip-id={`team-code-tooltip-${event.teamCode}`}
                            data-tooltip-content={
                              copiedCode === event.teamCode ? "Copied!" : "Copy"
                            }
                            onClick={() => handleCopyCode(event.teamCode)}
                            className="w-full bg-transparent border-2 border-white text-white p-3 rounded-lg mt-2"
                          >
                            Team Code: {event.teamCode}
                          </button>
                          <Tooltip
                            id={`team-code-tooltip-${event.teamCode}`}
                            place="top"
                            type="dark"
                            effect="solid"
                          />
                          <p>{`Members: ${event.teamMembers.join(", ")}`}</p>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

