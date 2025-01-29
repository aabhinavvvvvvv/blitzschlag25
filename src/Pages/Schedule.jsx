"use client";
import React, { useState } from "react";
import { Timeline } from "../Components/ui/timeline";
import { events } from "../data/scheduledata";
import schedulebg from "../Assets/pexels-lucas-pilon-ferro-51318148-8137085.jpg";
import styled from "styled-components";
import schedulebg1 from "../Assets/schedulebg1.jpg";
import schedulebg2 from "../Assets/schedulebg2.jpg";
import schedulebg3 from "../Assets/schedulebg3.png";
import schedulebg4 from "../Assets/schedulebg4.webp";

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
        <div className="content flex flex-col items-center justify-center" >
          <p style={{ fontFamily: "'Metal Mania', cursive" }}>{event.Event_Proposed}</p>
          <p style={{ fontFamily: "'Metal Mania', cursive" }}>
            {event.Time} - {event.EndTime}
          </p>
          <p style={{ fontFamily: "'Metal Mania', cursive" }}>{event.Venue}</p>
          <p style={{ fontFamily: "'Metal Mania', cursive" }}>{event.Category}</p>
          <p style={{ fontFamily: "'Metal Mania', cursive" }}>{event.Event_Coordinator}</p>
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
  height: 200px;
  border-radius: var(--rounded);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: var(--border);
  backdrop-filter: blur(10px); /* Frosted glass effect */
  background-color:rgba(0,0,0,0.3);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1), 0 0 20px rgba(255, 255, 255, 0.1); /* Glass shadow effect */
  border: 2px solid rgba(255, 255, 255, 0.4); /* Thin border with opacity */
  transition: all 0.3s ease-in-out;
  font-family: "'Metal Mania', cursive"; /* Apply Metal Mania font */
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

@keyframes bg-spin {
  25% {
    background-position: right 20% bottom 40%;
  }
  75% {
    background-position: left 45% top 20%;
  }
}

.radio-input {
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: #1a1a1a;
  padding: 6px;
  border-radius: 12px;
  z-index: 10;
  position: absolute;
  top: 20px;
  left: 20px;
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

/* Media queries for mobile view */
@media (max-width: 768px) {
  .radio-input {
    position: static;
    margin: 16px auto;
    gap: 8px;
  }

  .label {
    font-family: "'Metal Mania', cursive"; /* Apply Metal Mania font to mobile */
  }
}

@media (max-width: 480px) {
  .radio-input {
    margin: 10px 0;
  }

  .label {
    width: 100%;
    font-family: "'Metal Mania', cursive"; /* Apply Metal Mania font to mobile */
  }
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
      className="w-full min-h-screen "
      style={{
        backgroundImage: `url(${schedulebg4})`,
        backgroundSize: "cover",
        // backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="w-full min-h-screen backdrop-contrast-125 flex">
        <div className="w-full relative">
          <div className="absolute top-48 w-80 left-8 md:absolute md:top-60 md:left-40 md:ml-96">
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
