import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import eventData from "../data/eventData";
import SingleComponent from "../Components/single";
import TeamComponent from "../Components/team";
import eventbg from "../Assets/eventBG.webp";
import Transition from "../transition";
import { auth } from "../../fi";
import "../css files/events.css";
import Drawer from "react-modern-drawer";
import { CardBody, CardContainer, CardItem } from "../Components/3dcard";
import styled from "styled-components";
import tamasha from "../Assets/category1.jpg";
import battle from "../Assets/category2.jpg";
import panache from "../Assets/category3.jpg";
import rambha from "../Assets/category4.jpg";
import poster from "../Assets/poster.png"


import photography from '../Assets/photography.webp';
import quiz from '../Assets/quiz.webp';
import music from '../Assets/music.webp';
import think from '../Assets/think.webp';
//import electoral from '../Assets/electoral.webp';
import nss from '../Assets/nss.webp';
import drama from '../Assets/drama.webp';
// import travel from '../Assets/travel.webp';
// import poetry from '../Assets/poetry.webp';
// import elac from '../Assets/elac.webp';
// import mavericks from '../Assets/mavericks.webp';
// import film from '../Assets/film.webp';
// import dance from '../Assets/dance.webp';
// import hlac from '../Assets/hlac.webp';
// import cmd from '../Assets/cmd.webp';
// import debate from '../Assets/debate.webp';
// import press from '../Assets/press.webp';
// import creative from '../Assets/creative.webp';
const Button = ({ event }) => {
  const [clicked, setClicked] = useState(false);

  const handleButtonClick = () => {
    setClicked(!clicked);
  };



  return (
    <StyledWrapper>
      <button className="download-button" onClick={handleButtonClick}>
        <div className="docs">
          <svg
            viewBox="0 0 24 24"
            width={20}
            height={20}
            stroke="currentColor"
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="css-i6dzq1"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1={16} y1={13} x2={8} y2={13} />
            <line x1={16} y1={17} x2={8} y2={17} />
            <polyline points="10 9 9 9 8 9" />
          </svg>
          Rules
        </div>
        <div className={`download ${clicked ? "clicked" : ""}`}>
          <a
            href={`${event.rulebook}`}
            target="_blank"
            download={event.name}
            className="download-link"
          >
            <svg
              viewBox="0 0 24 24"
              width={24}
              height={24}
              stroke="currentColor"
              strokeWidth={2}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="css-i6dzq1"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1={12} y1={15} x2={12} y2={3} />
            </svg>
          </a>
        </div>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .download-button {
    position: relative;
    border-width: 0;
    color: white;
    font-size: 20px;
    font-weight: 600;
    cursor: pointer;
    padding: 0px;
    height: 45px;
    border-radius: 4px;
    z-index: 1;
  }

  .download-button .docs {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    min-height: 40px;
    padding: 10px;
    border-radius: 4px;
    background-color: #242a35;
    border: solid 1px #e8e8e82d;
    transition: all 0.5s cubic-bezier(0.77, 0, 0.175, 1);
  }

  .download-button:hover {
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  }

  .download {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 90%;
    margin: 0 auto;
    z-index: -1;
    border-radius: 4px;
    transform: translateY(0%);
    background-color: #01e056;
    border: solid 1px #01e0572d;
    transition: all 0.5s cubic-bezier(0.77, 0, 0.175, 1);
  }

  .download.clicked {
    transform: translateY(100%);
  }

  .download svg polyline,
  .download svg line {
    animation: docs 1s infinite;
  }

  @keyframes docs {
    0% {
      transform: translateY(0%);
    }

    50% {
      transform: translateY(-15%);
    }

    100% {
      transform: translateY(0%);
    }
  }
`;

const Events = () => {
  const [uid, setUid] = useState(null);
  const [activeTab, setActiveTab] = useState("flagship");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [teamCode, setTeamCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [showEvents, setShowEvents] = useState(false);
  const [activeClub, setActiveClub] = useState("none");
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid);
      } else {
        setUid(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const filteredEvents = Object.values(eventData).filter(
    (event) => event.type === activeTab
  );

  const fliteredClubEvents = Object.values(eventData).filter(
    (event) => event.club == activeClub
  );

  const navigate = useNavigate();
  const handleTabChange = (tab) => {
    if (
      tab == "flagship" ||
      tab == "fun" ||
      tab == "club" ||
      tab == "attraction"
    ) {
      setActiveTab(tab);
      setShowEvents(true);
    }
  };
  const handleButtonClick = () => {
    setDrawerOpen(!drawerOpen);
  };
  const handleBackToCategories = () => {
    setShowEvents(false);
    setActiveClub("none");
  };
  const handleJoinTeam = async () => {
    if (!uid) {
      toast.error("You must be logged in to join a team.");
      return;
    }

    if (!teamCode) {
      toast.error("Please enter a team code.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/jointeam`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uid,
            teamCode,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to join the team.");
      }

      const data = await response.json();
      toast.success(data.message);
      setTeamCode("");
    } catch (error) {
      console.error(error);
      toast.error(
        error.message || "Failed to join the team. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };
  const openDrawer = (event) => {
    setSelectedEvent(event);
    setDrawerOpen(true);
  };
  const closeDrawer = () => {
    setDrawerOpen(false);
    setSelectedEvent(null);
  };

  const categories = {
    category1: "flagship",
    category2: "fun",
    category3: "club",
    category4: "attraction",
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleJoinTeam();
    }
  };
  const getBackgroundImage = (key) => {
    const images = {
      category1: tamasha,
      category2: battle,
      category3: panache,
      category4: rambha,
    };
    return images[key] || "";
  };
  const uniqueClubs = [
    {
      "name": "Photography",
      "image": photography
    },
    {
      "name": "Quiz",
      "image": quiz
    },
    {
      "name": "Music",
      "image": music
    },
    {
      "name": "Think India",
      "image": think
    },
    {
      "name": "NSS",
      "image": nss
    },
    {
      "name": "Drama",
      "image": drama
    },
    // {
    //   "name": "Electoral Literacy",
    //   "image": electoral
    // },
    // {
    //   "name": "Travel and Heritage",
    //   "image": travel
    // },
    // {
    //   "name": "Poetry",
    //   "image": poetry
    // },
    // {
    //   "name": "ELAC",
    //   "image": elac
    // },
    // {
    //   "name": "Mavericks",
    //   "image": mavericks
    // },
    // {
    //   "name": "Film Making",
    //   "image": film
    // },
    // {
    //   "name": "Dance",
    //   "image": dance
    // },
    // {
    //   "name": "HLAC",
    //   "image": hlac
    // },
    // {
    //   "name": "CMD",
    //   "image": cmd
    // },
    // {
    //   "name": "Debate",
    //   "image": debate
    // },
    // {
    //   "name": "Press",
    //   "image": press
    // },
    // {
    //   "name": "Creative Arts",
    //   "image": creative
    // }
    {
      "name": "Electoral Literacy",
      "image": poster
    },
    {
      "name": "Travel and Heritage",
      "image": poster
    },
    {
      "name": "Poetry",
      "image": poster
    },
    {
      "name": "ELAC",
      "image": poster
    },
    {
      "name": "Mavericks",
      "image": poster
    },
    {
      "name": "Film Making",
      "image": poster
    },
    {
      "name": "Dance",
      "image": poster
    },
    {
      "name": "HLAC",
      "image": poster
    },
    {
      "name": "CMD",
      "image": poster
    },
    {
      "name": "Debate",
      "image": poster
    },
    {
      "name": "Press",
      "image": poster
    },
    {
      "name": "Creative Arts",
      "image": poster
    }

  ]


  console.log(uniqueClubs);
  return (
    <div
      className="p-8 min-h-screen text-white"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${eventbg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        fontFamily: 'cursive'
      }}
    >
      <p
        style={{ fontFamily: '"Metal Mania", serif' }}
        className="text-center mx-auto w-fit text-7xl tracking-wider mt-20 mb-8 font-normal text-white"
      >
        EVENTS
      </p>

      {/* Event Handling Section */}
      <div className="flex flex-col sm:flex-row justify-center items-center my-8 gap-4">
        <input
          type="text"
          value={teamCode}
          onChange={(e) => setTeamCode(e.target.value)}
          onKeyDown={handleKeyPress}
          name="text"
          className="input"
          placeholder="Team Code"
        ></input>
        <button
          onClick={handleJoinTeam}
          disabled={loading}
          className={` active:scale-90 btn sm:w-auto bg-opacity-80 bg-black text-gray-300 px-4 py-2 rounded-lg hover:ring-2 hover:ring-indigo-500 hover:border-indigo-500 transition-all duration-300 border-white border-2 relative overflow-hidden ${loading
            ? "bg-black border-white text-white cursor-not-allowed"
            : "bg-black border-indigo-500 text-white"
            }`}
        >
          {/* Circles */}
          <span className="circle1"></span>
          <span className="circle2"></span>
          <span className="circle3"></span>
          <span className="circle4"></span>
          <span className="circle5"></span>

          {/* Text */}
          <span className="text">{loading ? "Joining..." : "Join Team"}</span>
        </button>
      </div>

      {/* Back to Categories Button */}
      {showEvents && (
        <div className="flex justify-center my-4 relative">
          <button
            onClick={handleBackToCategories}
            className={` active:scale-90 btn sm:w-auto bg-opacity-80 bg-black text-gray-300 px-4 py-2 rounded-lg hover:ring-2 hover:ring-indigo-500 hover:border-indigo-500 transition-all duration-300 border-white border-2 overflow-hidden ${loading
              ? "bg-black border-white text-white cursor-not-allowed"
              : "bg-black border-indigo-500 text-white"
              }`}
          >
            <span className="circle1"></span>
            <span className="circle2"></span>
            <span className="circle3"></span>
            <span className="circle4"></span>
            <span className="circle5"></span>

            {/* Text */}
            <span className="text">Back To Categories</span>
          </button>
        </div>
      )}

      {activeClub !== "none" && (
        <div className="flex justify-center my-4 relative">
          <button
            onClick={() => setActiveClub("none")}
            className={` active:scale-90 btn sm:w-auto bg-opacity-80 bg-black text-gray-300 px-4 py-2 rounded-lg hover:ring-2 hover:ring-indigo-500 hover:border-indigo-500 transition-all duration-300 border-white border-2 overflow-hidden ${loading
              ? "bg-black border-white text-white cursor-not-allowed"
              : "bg-black border-indigo-500 text-white"
              }`}
          >
            <span className="circle1"></span>
            <span className="circle2"></span>
            <span className="circle3"></span>
            <span className="circle4"></span>
            <span className="circle5"></span>

            {/* Text */}
            <span className="text">Back To Club</span>
          </button>
        </div>
      )}

      {/* Category Buttons */}
      {!showEvents && (
        <div className="category-buttons mt-24 relative flex flex-col items-center scale-75 md:scale-100">
          {/* Rotating Cards */}
          <div className="box flex flex-wrap justify-center z-10 ">
            {Object.entries(categories).map(([key, value]) => (
              <div
                className="category-btn "
                key={key}
                style={{ margin: "10px", transition: "transform 0.3s ease" }}
              >
                <button
                  onClick={() => handleTabChange(value)}
                  style={{
                    backgroundImage: `url(${getBackgroundImage(key)})`, // Dynamically set the image
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: "18px",
                    padding: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition:
                      "transform 0.3s ease, background-color 0.3s ease",
                    position: "relative", // For holographic effect
                    boxShadow: "0 15px 25px rgba(0, 0, 0, 0.2)", // Shadow for hovering
                  }}
                  className="hover:scale-110 hover:bg-white hover:text-gray-900 w-48 h-48"
                ></button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Event Cards */}
      {showEvents && activeTab != "club" && (
        <div
          className="event-container"
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredEvents.length === 0 ? (
                <p className="text-center text-white">
                  No events available for this category.
                </p>
              ) : (
                filteredEvents.map((event, index) => (
                  <CardContainer className="inter-var" key={index}>
                    <CardBody className="bg-black bg-opacity-70 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:bg-opacity-60 dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto scale-90 rounded-xl p-6 border">
                      <CardItem
                        translateZ="50"
                        className="text-xl font-bold text-neutral-100 dark:text-white"
                      >
                        {event.name}
                      </CardItem>
                      <CardItem
                        as="p"
                        translateZ="60"
                        className="text-neutral-300 text-sm max-w-sm mt-2 dark:text-neutral-300"
                      >
                        {event.description.slice(0, 50)}...
                      </CardItem>
                      <CardItem
                        translateZ="100"
                        rotateX={20}
                        rotateZ={-10}
                        className="w-full mt-4"
                      >
                        <img
                          src={event.imgUrl}
                          className="rounded-xl w-auto h-80 mx-auto group-hover/card:shadow-xl"
                          alt="thumbnail"
                        />
                      </CardItem>
                      <div className="flex justify-end items-center mt-4">
                        <CardItem
                          translateZ={20}
                          translateX={40}
                          as="button"
                          onClick={() => openDrawer(event)}
                          className="px-4 py-2 mx-auto rounded-xl bg-gray-400 dark:bg-white dark:text-black text-gray-900 text-xs font-bold"
                        >
                          View Details
                        </CardItem>
                      </div>
                    </CardBody>
                  </CardContainer>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {showEvents && activeTab === "club" && activeClub === "none" && (
        <div className="event-container">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-8">
              {uniqueClubs.map((club, index) => (
                club === "none" ? (
                  null// Don't render anything if event is "none"
                ) : (
                  <div
                    key={index}
                    className="bg-black bg-opacity-70 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:bg-opacity-60 dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto scale-90 rounded-xl p-6 border"
                  >
                    <div className="text-xl font-bold text-neutral-100 dark:text-white">{club.name}</div>

                    {/* Add your image URL here if available */}
                    <div className="w-full mt-4">
                      <img
                        src={club.image}
                        className="rounded-xl w-80 h-80 mx-auto group-hover/card:shadow-xl"
                        alt="event-thumbnail"
                      />
                    </div>

                    <div className="flex justify-end items-center mt-4">
                      <button
                        onClick={() => setActiveClub(club.name)}
                        className="px-4 py-2 mx-auto rounded-xl bg-gray-400 dark:bg-white dark:text-black text-gray-900 text-xs font-bold"
                      >
                        View Events
                      </button>
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>
      )}

      {showEvents && activeTab == "club" && activeClub !== "none" && (
        <div
          className="event-container"
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-8">
              {fliteredClubEvents.length === 0 ? (
                <p className="text-center text-white">
                  No events available for this category.
                </p>
              ) : (
                fliteredClubEvents.map((event, index) => (
                  <CardContainer className="inter-var" key={index}>
                    <CardBody className="bg-black bg-opacity-70 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:bg-opacity-60 dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto scale-90 rounded-xl p-6 border">
                      <CardItem
                        translateZ="50"
                        className="text-xl font-bold text-neutral-100 dark:text-white"
                      >
                        {event.name}
                      </CardItem>
                      <CardItem
                        as="p"
                        translateZ="60"
                        className="text-neutral-300 text-sm max-w-sm mt-2 dark:text-neutral-300"
                      >
                        {event.description.slice(0, 50)}...
                      </CardItem>
                      <CardItem
                        translateZ="100"
                        rotateX={20}
                        rotateZ={-10}
                        className="w-full mt-4"
                      >
                        <img
                          src={event.imgUrl}
                          className="rounded-xl w-auto h-80 mx-auto group-hover/card:shadow-xl"
                          alt="thumbnail"
                        />
                      </CardItem>
                      <div className="flex justify-end items-center mt-4">
                        <CardItem
                          translateZ={20}
                          translateX={40}
                          as="button"
                          onClick={() => openDrawer(event)}
                          className="px-4 py-2 mx-auto rounded-xl bg-gray-400 dark:bg-white dark:text-black text-gray-900 text-xs font-bold"
                        >
                          View Details
                        </CardItem>
                      </div>
                    </CardBody>
                  </CardContainer>
                ))
              )}
            </div>
          </div>
        </div>
      )}


      {/* Drawer for Event Details */}
      {selectedEvent && (
        <Drawer
          overlayOpacity={0.5}
          open={drawerOpen}
          onClose={closeDrawer}
          direction="bottom"
          size={675}
          style={{
            left: 0,
            right: 0,
            bottom: 0,
            transform: "translate3d(0, 100%, 0)",
            width: "100%",
            background: "rgba(0, 0, 0, 0.99)",
            position: "fixed",
            maxHeight: drawerOpen ? "100vh" : "0vh",
            overflowY: "auto",
            transition: "max-height 0.3s ease-in-out, opacity 0.3s ease-in-out",
            opacity: drawerOpen ? 1 : 0,
            borderRadius: "16px 16px 0 0", // Rounded top corners
            backdropFilter: "blur(16rem)", // Backdrop blur effect
            WebkitBackdropFilter: "blur(10px)", // For Safari support
            overflowX: "hidden",
          }}
        >
          <div className="relative  w-full bg-opacity-60 h-8 mx-auto m-2">
            <div className="relative bg-white w-32 bg-opacity-60 h-1 mx-auto m-2"></div>
            <button
              data-tooltip-id={`upload`}
              data-tooltip-content={"Upload Image"}
              className="absolute -top-[5%] rotate-45 right-[0%] w-16 h-16 text-5xl flex items-center justify-center font-bold text-gray-400 transition-all duration-300 hover:text-white hover:bg-opacity-70 hover:rotate-180"
              onClick={() => closeDrawer()}
              style={{
                transformOrigin: "center",
              }}
            >
              +
            </button>
          </div>
          <div className="h-full w-full p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* First Div */}
            <div className="md:col-span-1 p-4 w-full">
              <img
                src={selectedEvent.imgUrl}
                alt="event-thumbnail"
                className="w-full h-auto max-w-md md:max-w-full object-cover rounded-lg"
              />
            </div>

            {/* Second Div */}
            <div className="md:col-span-1">
              <h2 className="text-xl sm:text-3xl text-white font-semibold mb-4 text-center md:text-left"
                style={{
                  fontFamily: "'Metal Mania', cursive",
                }}
              >
                {selectedEvent.name}
              </h2>
              <p className="mb-4 text-sm sm:text-base text-left md:text-left">
                {selectedEvent.description}
              </p>
              <p className="text-sm sm:text-base text-center md:text-left">
                <strong>Venue:</strong> {selectedEvent.venue}
              </p>
              <p className="text-sm sm:text-base text-center md:text-left">
                <strong>Max Team Size:</strong> {selectedEvent.maxTeamSize}
              </p>
              <p className="text-sm sm:text-base text-center md:text-left">
                <strong>Category:</strong> {selectedEvent.type}
              </p>
              
              <div className="mt-6">
                {selectedEvent.maxTeamSize === 1 ? (
                  <SingleComponent event={selectedEvent} uid={uid} />
                ) : (
                  <TeamComponent event={selectedEvent} uid={uid} />
                )}
              </div>
              <div className="flex justify-center mt-16 ">
                <Button className="mx-auto text-center" event={selectedEvent} />
              </div>
            </div>
          </div>
        </Drawer>
      )}
    </div>
  );
};

export default Transition(Events);

