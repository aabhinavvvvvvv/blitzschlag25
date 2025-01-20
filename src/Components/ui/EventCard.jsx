import React from 'react';
import { Clock, MapPin } from 'lucide-react';

export const EventCard = ({ event }) => (
  <div className="relative group">
    <div className="absolute inset-0 bg-gradient-to-r from-pink-500/30 to-cyan-500/30 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
    <div className="relative p-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg shadow-xl hover:shadow-2xl transition duration-200">
      <h3 className="text-lg font-semibold mb-2 text-white">{event.Event_Proposed}</h3>
      <div className="inline-block px-3 py-1 mb-2 text-xs font-medium text-white bg-white/20 backdrop-blur-sm rounded-full">
        {event.Event_Coordinator}
      </div>
      <div className="flex items-center text-sm text-white/80 mb-1">
        <MapPin className="w-4 h-4 mr-1" />
        {event.Venue}
      </div>
      <div className="flex items-center text-sm text-white/80">
        <Clock className="w-4 h-4 mr-1" />
        {event.Time}
      </div>
    </div>
  </div>
);
