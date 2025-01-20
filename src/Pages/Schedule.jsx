// "use client";
// import React, { useState } from "react";
// import { Timeline } from "../Components/ui/timeline";
// import { events } from "../data/scheduledata";
// import schedulebg from "../Assets/schedulebg.jpg";
// import styled from "styled-components";

// const Radio = ({ selectedDay, setSelectedDay, days }) => {
//   return (
//     <StyledWrapper>
//       <div className="radio-input">
//         {days.map((day) => (
//           <label className="label" key={day}>
//             <input
//               type="radio"
//               name="value-radio"
//               id={'value'-'${day}'}
//               checked={selectedDay === day}
//               onChange={() => setSelectedDay(day)}
//             />
//             <span className="text">{day}</span>
//           </label>
//         ))}
//       </div>
//     </StyledWrapper>
//   );
// };

// const Card = ({ event }) => {
//   return (
//     <StyledWrapper>
//       <div className="card">
//         <div className="card2">
//           <div className="content">
//             <p><strong>Event:</strong> {event.Event_Proposed}</p>
//             <p><strong>Duration:</strong> {event.Time} - {event.EndTime}</p>
//             <p><strong>Venue:</strong> {event.Venue}</p>
//             <p><strong>Category:</strong> {event.Category}</p>
//             <p><strong>Coordinator:</strong> {event.Event_Coordinator}</p>
//           </div>
//         </div>
//       </div>
//     </StyledWrapper>
//   );
// };

// // Helper function to group events by their time range
// const groupEventsByTime = (events) => {
//   return events.reduce((acc, event) => {
//     const timeKey = `${event.Time}-${event.EndTime}`;
//     if (!acc[timeKey]) {
//       acc[timeKey] = [];
//     }
//     acc[timeKey].push(event);
//     return acc;
//   }, {});
// };


// const StyledWrapper = styled.div`
//   .radio-input {
//     display: flex;
//     align-items: center;
//     gap: 4px;
//     background-color: #1a1a1a;
//     padding: 6px;
//     border-radius: 12px;
//     z-index: -1;
//   }

//   .radio-input input {
//     display: none;
//   }

//   .radio-input .label {
//     width: 100px;
//     height: 60px;
//     background: linear-gradient(145deg, #4a4a4a, #2a2a2a);
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     padding: 8px;
//     transition: all 0.2s ease-in-out;
//     border: 1px solid #333;
//     border-radius: 8px;
//     position: relative;
//     cursor: pointer;
//     box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.4);
//   }

//   .label:has(input[type="radio"]:checked) {
//     box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.6), inset 0px 0px 12px rgba(255, 255, 255, 0.1);
//     background: linear-gradient(145deg, #2563eb, #1e3a8a);
//     border: 1px solid #2563eb;
//   }

//   .label .text {
//     color: #e4e4e4;
//     font-size: 15px;
//     font-weight: 700;
//     text-transform: uppercase;
//     text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.2), 0px 3px 5px rgba(0, 0, 0, 0.4);
//     transition: all 0.2s ease-in-out;
//   }

//   .label input[type="radio"]:checked + .text {
//     color: #ffffff;
//     text-shadow: 0px 0px 12px #93c5fd, 0px 2px 6px rgba(255, 255, 255, 0.8);
//   }

//   .card {
//     width: 190px;
//     height: 254px;
//     background-image: linear-gradient(163deg, #00ff75 0%, #3700ff 100%);
//     border-radius: 20px;
//     transition: all 0.3s;
//   }

//   .card2 {
//     width: 190px;
//     height: 254px;
//     background-color: #1a1a1a;
//     transition: all 0.2s;
//     border-radius: 20px;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     color: white;
//     font-family: sans-serif;
//     padding: 1rem;
//   }

//   .card2:hover {
//     transform: scale(0.98);
//   }

//   .card:hover {
//     box-shadow: 0px 0px 30px 1px rgba(0, 255, 117, 0.3);
//   }

//   .content p {
//     margin: 4px 0;
//     font-size: 0.85rem;
//     color: #ddd;
//   }

//   .content strong {
//     color: white;
//   }
// `;

// export default function Schedule() {
//   const uniqueDays = [...new Set(events.map((event) => event.Day))];
//   const [selectedDay, setSelectedDay] = useState(uniqueDays[0]);

//   const selectedDayEvents = events.filter((event) => event.Day === selectedDay);
//   const groupedEvents = groupEventsByTime(selectedDayEvents); // Group events by time

//   const timelineData = Object.keys(groupedEvents).map((timeKey) => {
//     const eventsAtSameTime = groupedEvents[timeKey];
//     return {
//       title: eventsAtSameTime[0].Time, // Display the start time
//       content: (
//         <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
//           {eventsAtSameTime.map((event) => (
//             <Card key={event.Event_Proposed} event={event} />
//           ))}
//         </div>
//       ),
//     };
//   });

//   return (
//     <div
//       className="w-full min-h-screen"
//       style={{
//         backgroundImage: `url(${schedulebg})` ,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundAttachment: "fixed",
//       }}
//     >
//       <div className="w-full min-h-screen backdrop-blur-sm flex">
//         <div className="w-full relative">
//           <div className="absolute top-60 ml-96 left-48">
//             <Radio
//               selectedDay={selectedDay}
//               setSelectedDay={setSelectedDay}
//               days={uniqueDays}
//             />
//           </div>
//           <Timeline
//             key={selectedDay}
//             data={timelineData}
//             headerContent={
//               <div className="pt-4 pb-8 mt-20 px-4 flex justify-center gap-4" />
//             }
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { Timeline } from '../Components/ui/timeline';
import {events} from '../data/scheduledata';

const Radio = ({ selectedDay, setSelectedDay, days }) => (
  <div className="flex gap-4 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
    {days.map((day) => (
      <button
        key={day}
        onClick={() => setSelectedDay(day)}
        className={`px-6 py-3 rounded-lg transition-all duration-200 ${
          selectedDay === day
            ? 'bg-white/20 text-white shadow-lg scale-105'
            : 'bg-white/5 text-white/70 hover:bg-white/10'
        }`}
      >
        {day}
      </button>
    ))}
  </div>
);

const Schedule = () => {
  const uniqueDays = [...new Set(events.map((event) => event.Day))];
  const [selectedDay, setSelectedDay] = useState(uniqueDays[0]);

  const selectedDayEvents = events.filter((event) => event.Day === selectedDay);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: 'url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/campus.jpg-5iPH81GZWK4ymQqI4ShTHeEB09RWCm.jpeg)',
      }}
    >
      <div className="min-h-screen bg-black/50 backdrop-blur-[2px]">
        <div className="w-full relative">
          <div className="absolute top-40 left-1/2 transform -translate-x-1/2 z-10">
            <Radio
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              days={uniqueDays}
            />
          </div>
          <Timeline key={selectedDay} data={selectedDayEvents} />
        </div>
      </div>
    </div>
  );
};

export default Schedule;
