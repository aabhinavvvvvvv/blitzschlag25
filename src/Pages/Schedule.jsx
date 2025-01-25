"use client";
import React, { useState } from "react";
import { Timeline } from "../Components/ui/timeline";
import { events } from "../data/scheduledata";
import schedulebg from "../Assets/pexels-lucas-pilon-ferro-51318148-8137085.jpg";
import styled from "styled-components";
import schedulebg1 from "../Assets/schedulebg1.jpg";
import schedulebg2 from "../Assets/schedulebg2.jpg";

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

{/* <p>{event.Event_Proposed}</p>
<p>
  {event.Time} - {event.EndTime}
</p>
<p>{event.Venue}</p>
<p>{event.Category}</p>
<p>{event.Event_Coordinator}</p> */}

const Card = ({ event }) => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="content flex flex-col items-center justify-center">
          <p>{event.Event_Proposed}</p>
          <p>
            {event.Time} - {event.EndTime}
          </p>
          <p>{event.Venue}</p>
          <p>{event.Category}</p>
          <p>{event.Event_Coordinator}</p>
        </div>
        <div className="points_wrapper">
          {Array.from({ length: 10 }).map((_, index) => (
            <i key={index} className="point" />
          ))}
        </div>
      </div>
    </StyledWrapper>
  );
};
const StyledWrapper = styled.div`
  .card {
    --border: 4px;
    --rounded: 16px;
    --quantity: 12;
    --w-card: 450px;
    --h-card: 400px;
    margin: 0;
    width: 190px;
    height: 254px;
    // max-width: 80%;
    // max-height: 80%;
    border-radius: var(--rounded);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: var(--border);
  }

  .card::before,
  .card::after {
    content: "";
    z-index: -1;
    position: absolute;
    will-change: auto;
    --size: calc(100%);
    --size-old: calc(100% - calc(var(--border) * 2));
    width: var(--size);
    height: var(--size);
    min-width: var(--size);
    min-height: var(--size);
    max-width: var(--size);
    max-height: var(--size);
    border-radius: var(--rounded);
    background-size: 400% 400%;
    animation: bg-spin 3s linear 0s infinite normal none running;
    background-image: radial-gradient(
        circle farthest-side at 0 100%,
        #00ccb1,
        transparent
      ),
      radial-gradient(circle farthest-side at 100% 0, #5ddcff, transparent),
      radial-gradient(circle farthest-side at 100% 100%, #3c67e3, transparent),
      radial-gradient(circle farthest-side at 0 0, #4e00c2, #0000);
  }

  .card::after {
    transition-property: color, background-color, border-color,
      text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter,
      backdrop-filter;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 0.5s;
    animation-delay: 0.5s;
    filter: blur(24px);
    opacity: 0.7;
  }

  @keyframes bg-spin {
    25% {
      background-position: right 20% bottom 40%;
    }
    75% {
      background-position: left 45% top 20%;
    }
  }

  .points_wrapper {
    position: absolute;
    overflow: hidden;
    width: calc(100% - (var(--border) * 4));
    height: calc(100% - (var(--border) * 4));
    border-radius: calc(var(--rounded) - 4px);
    pointer-events: none;
    z-index: 80;
  }

  .points_wrapper .point {
    --sz-point: 4px;
    top: -8px;
    position: absolute;
    animation: floating-points infinite ease-in-out;
    pointer-events: none;
    width: var(--sz-point);
    height: var(--sz-point);
    background-color: #5ddcff;
    border-radius: 9999px;
  }

  @keyframes floating-points {
    0% {
      transform: translate(0, 0);
    }
    95% {
      opacity: 0;
    }
    100% {
      opacity: 0;
      transform: translate(calc(var(--h-card) / 1.75), calc(var(--h-card) / 1.5));
    }
  }

  .points_wrapper .point:nth-child(1) {
    left: 10%;
    opacity: 1;
    animation-duration: 2.35s;
    animation-delay: 0.2s;
  }

  .points_wrapper .point:nth-child(2) {
    left: 30%;
    opacity: 0.7;
    animation-duration: 2.5s;
    animation-delay: 0.5s;
  }

  .points_wrapper .point:nth-child(3) {
    left: 25%;
    opacity: 0.8;
    animation-duration: 2.2s;
    animation-delay: 0.1s;
  }

  .points_wrapper .point:nth-child(4) {
    left: 44%;
    opacity: 0.6;
    animation-duration: 2.05s;
  }

  .points_wrapper .point:nth-child(5) {
    left: 50%;
    opacity: 1;
    animation-duration: 1.9s;
  }

  .points_wrapper .point:nth-child(6) {
    left: 75%;
    opacity: 0.5;
    animation-duration: 1.5s;
    animation-delay: 1.5s;
  }

  .points_wrapper .point:nth-child(7) {
    left: 88%;
    opacity: 0.9;
    animation-duration: 2.2s;
    animation-delay: 0.2s;
  }

  .points_wrapper .point:nth-child(8) {
    left: 58%;
    opacity: 0.8;
    animation-duration: 2.25s;
    animation-delay: 0.2s;
  }

  .points_wrapper .point:nth-child(9) {
    left: 98%;
    opacity: 0.6;
    animation-duration: 2.6s;
    animation-delay: 0.1s;
  }

  .points_wrapper .point:nth-child(10) {
    left: 65%;
    opacity: 1;
    animation-duration: 2.5s;
    animation-delay: 0.2s;
  }

  .content {
    position: absolute;
    width: calc(100% - (var(--border) * 4));
    height: calc(100% - (var(--border) * 4));
    border-radius: calc(var(--rounded) - 4px);
    overflow: hidden;
    z-index: 7;
    background-color: #191c29;
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
      // flex-direction: column; /* Stack the radio buttons vertically */
      gap: 8px;
      // width: 100%; /* Make the filter take full width */
      // align-items: center;
      
    }

    .label {
      // width: 80%; /* Adjust width for mobile */
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
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))",
            gap: "16px",
          }}
        >
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
        backgroundImage: `url(${schedulebg1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="w-full min-h-screen backdrop-contrast-125 flex">
        <div className="w-full relative">
          <div className="absolute top-48 w-80 left-16 md:absolute md:top-60 md:left-40 md:ml-96">
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
