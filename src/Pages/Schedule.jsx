"use client";
import React, { useState } from "react";
import { Timeline } from "../Components/ui/timeline";
import { events } from "../data/scheduledata";
import schedulebg from "../Assets/pexels-lucas-pilon-ferro-51318148-8137085.jpg";
import styled from "styled-components";

const Radio = ({ selectedDay, setSelectedDay, days }) => {
  return (
    <StyledWrapper>
      <div className="radio-input">
        {days.map((day) => (
          <label className="label" key={day}>
            <input
              type="radio"
              name="value-radio"
              id={`value-${day}`}
              checked={selectedDay === day}
              onChange={() => setSelectedDay(day)}
            />
            <span className="text">{day}</span>
          </label>
        ))}
      </div>
    </StyledWrapper>
  );
};


const Card = ({event}) => {
  return (
    <StyledWrapper>
      <div className="card">
              <div className="content">
        <p>
 {event.Event_Proposed}
           </p>
           <p>
         {event.Time} - {event.EndTime}
           </p>
           <p>
            {event.Venue}
           </p>
           <p>
       {event.Category}
           </p>
           <p>
     {event.Event_Coordinator}
           </p>
         </div></div>  </StyledWrapper>
  );
}
const StyledWrapper = styled.div`
  .card {
    position: relative;
    width: 190px;
    height: 254px;
    background-color: #000;
    display: flex;
    flex-direction: column;
    justify-content: end;
    padding: 12px;
    gap: 12px;
    border-radius: 8px;
    cursor: pointer;
  }

  .card::before {
    content: '';
    position: absolute;
    inset: 0;
    left: -5px;
    margin: auto;
    width: 200px;
    height: 264px;
    border-radius: 10px;
    background: linear-gradient(-45deg, #e81cff 0%, #40c9ff 100% );
    z-index: -10;
    pointer-events: none;
    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .card::after {
    content: "";
    z-index: -1;
    position: absolute;
    inset: 0;
    // background: linear-gradient(-45deg, #fc00ff 0%, #00dbde 100% );
    // transform: translate3d(0, 0, 0) scale(0.95);
    filter: blur(20px);
  }

  .heading {
    font-size: 20px;
    text-transform: capitalize;
    font-weight: 700;
  }

  .card p:not(.heading) {
    font-size: 14px;
  }

  .card p:last-child {
    // color: #e81cff;
    font-weight: 600;
  }

  .card:hover::after {
    filter: blur(30px);
  }

  .card:hover::before {
    transform: rotate(-90deg) scaleX(1.34) scaleY(0.77);
  }
.card1:hover{
  animation: cardafter 1s infinite forwards;
  transform: scale(1.2); /* Scale up smoothly */
  transition: transform 1s ease-in-out; /* Smooth transition for scaling */
}


  @keyframes cardafter {
    0% {
      opacity: 1;
    }

    // 50% {
    //   opacity: 0;
    // }

    100% {
      opacity: 1;
    }
  }
  .radio-input {
    display: flex;
    align-items: center;
    gap: 4px;
    background-color: #1a1a1a;
    padding: 6px;
    border-radius: 12px;
    z-index: 10; /* Ensure the day filter is on top */
    position: absolute; /* Ensures it's positioned on top */
    top: 20px; /* Adjust top position */
    left: 20px; /* Adjust left position */
    transition: all 0.3s ease;
  }

  .radio-input input {
    display: none;
  }

  .radio-input .label {
    width: 100px;
    height: 60px;
    background: linear-gradient(145deg, #4a4a4a, #2a2a2a);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 8px;
    transition: all 0.2s ease-in-out;
    border: 1px solid #333;
    border-radius: 8px;
    position: relative;
    cursor: pointer;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.4);
  }

  .label:has(input[type="radio"]:checked) {
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.6),
      inset 0px 0px 12px rgba(255, 255, 255, 0.1);
    background: linear-gradient(145deg, #2563eb, #1e3a8a);
    border: 1px solid #2563eb;
  }

  .label .text {
    color: #e4e4e4;
    font-size: 15px;
    font-weight: 700;
    text-transform: uppercase;
    text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.2),
      0px 3px 5px rgba(0, 0, 0, 0.4);
    transition: all 0.2s ease-in-out;
  }

  .label input[type="radio"]:checked + .text {
    color: #ffffff;
    text-shadow: 0px 0px 12px #93c5fd, 0px 2px 6px rgba(255, 255, 255, 0.8);
  }

  @media (max-width: 768px) {
    .radio-input {
      position: static; /* Change position to static for mobile */
      margin: 16px auto;
      flex-direction: column; /* Stack the radio buttons vertically */
      gap: 8px;
      width: 100%; /* Make the filter take full width */
      align-items: center;
    }

    .label {
      width: 80%; /* Adjust width for mobile */
    }
  }

  @media (max-width: 480px) {
    .radio-input {
      margin: 10px 0;
    }

    .label {
      width: 100%; /* Make labels full width on very small screens */
    }


`;

// Helper function to group events by their time range
const groupEventsByTime = (events) => {
  return events.reduce((acc, event) => {
    const timeKey = ` ${event.Time}-${event.EndTime}`;
    if (!acc[timeKey]) {
      acc[timeKey] = [];
    }
    acc[timeKey].push(event);
    return acc;
  }, {});
};


export default function Schedule() {
  const uniqueDays = [...new Set(events.map((event) => event.Day))];
  const [selectedDay, setSelectedDay] = useState(uniqueDays[0]);

  const selectedDayEvents = events.filter((event) => event.Day === selectedDay);
  const groupedEvents = groupEventsByTime(selectedDayEvents); // Group events by time

const timelineData = Object.keys(groupedEvents).map((timeKey) => {
  const eventsAtSameTime = groupedEvents[timeKey];
  return {
    title: eventsAtSameTime[0].Time, // Display the start time
    content: (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: "16px" }}>
        {eventsAtSameTime.map((event) => (
          <Card key={event.Event_Proposed} event={event} />
        ))}
      </div>
    ),
  };
});


  return (
    <div
      className="w-full min-h-screen"
      style={{
        backgroundImage: `url(${schedulebg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="w-full min-h-screen backdrop-blur-sm flex">
        <div className="w-full relative">
          <div className="absolute top-60 ml-96 left-48">
            <Radio
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              days={uniqueDays}
            />
          </div>
          <Timeline
            key={selectedDay}
            data={timelineData}
            headerContent={
              <div className="pt-4 pb-8 mt-20 px-4 flex justify-center gap-4" />
            }
          />
        </div>
      </div>
    </div>
  );
}
