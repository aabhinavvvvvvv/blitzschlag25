const pass_data = {
    "horizon_day1": {
      "name": "Horizon Pass - Day 1",
      "description": "Access to all club events of Day 1 except flagship events and pronites.",
      "price": 300,
      "access": {
        "club_events": true,
        "flagship_events": false,
        "pronites": false,
        "day": 1
      }
    },
    "horizon_day2": {
      "name": "Horizon Pass - Day 2",
      "description": "Access to all club events of Day 2 except flagship events and pronites.",
      "price": 300,
      "access": {
        "club_events": true,
        "flagship_events": false,
        "pronites": false,
        "day": 2
      }
    },
    "horizon_day3": {
      "name": "Horizon Pass - Day 3",
      "description": "Access to all club events of Day 3 except flagship events and pronites.",
      "price": 300,
      "access": {
        "club_events": true,
        "flagship_events": false,
        "pronites": false,
        "day": 3
      }
    },
    "galaxy_day1": {
      "name": "Galaxy Pass - Day 1",
      "description": "Access to one flagship event, all club events, and pronite of Day 1. Includes accommodation (excluding food).",
      "price": 1200,
      "access": {
        "club_events": true,
        "flagship_events": true,
        "pronites": true,
        "accommodation": true,
        "day": 1
      }
    },
    "galaxy_day2": {
      "name": "Galaxy Pass - Day 2",
      "description": "Access to one flagship event, all club events, and pronite of Day 2. Includes accommodation (excluding food).",
      "price": 1200,
      "access": {
        "club_events": true,
        "flagship_events": true,
        "pronites": true,
        "accommodation": true,
        "day": 2
      }
    },
    "galaxy_day3": {
      "name": "Galaxy Pass - Day 3",
      "description": "Access to one flagship event, all club events, and pronite of Day 3. Includes accommodation (excluding food).",
      "price": 1200,
      "access": {
        "club_events": true,
        "flagship_events": true,
        "pronites": true,
        "accommodation": true,
        "day": 3
      }
    },
    "cosmic_pass": {
      "name": "Cosmic Pass",
      "description": "Access to all events and pronites of all three days. Includes one flagship event and accommodation for all three days.",
      "price": 2500,
      "access": {
        "club_events": true,
        "flagship_events": true,
        "pronites": true,
        "accommodation": true,
        "days": [1, 2, 3]
      }
    },
    "participation_rambha_sambha": {
      "name": "Participation Pass - Rambha Sambha",
      "description": "Access to participate in the Rambha Sambha flagship event. No club events, pronites, or accommodation.",
      "price": 500,
      "access": {
        "club_events": false,
        "flagship_events": true,
        "pronites": false,
        "accommodation": false
      }
    },
    "participation_panache": {
      "name": "Participation Pass - Panache",
      "description": "Access to participate in the Panache flagship event. No club events, pronites, or accommodation.",
      "price": 500,
      "access": {
        "club_events": false,
        "flagship_events": true,
        "pronites": false,
        "accommodation": false
      }
    },
    "participation_tamasha": {
      "name": "Participation Pass - Tamasha",
      "description": "Access to participate in the Tamasha flagship event. No club events, pronites, or accommodation.",
      "price": 500,
      "access": {
        "club_events": false,
        "flagship_events": true,
        "pronites": false,
        "accommodation": false
      }
    },
    "participation_battleofbands": {
      "name": "Participation Pass - Battle of Bands",
      "description": "Access to participate in the Battle of Bands flagship event. No club events, pronites, or accommodation.",
      "price": 500,
      "access": {
        "club_events": false,
        "flagship_events": true,
        "pronites": false,
        "accommodation": false
      }
    },
    "pass_day1": {
      "name": "Day 1 Pass",
      "description": "Access to stall areas and pronite of Day 1. No club events or flagship events.",
      "price": 500,
      "access": {
        "club_events": false,
        "flagship_events": false,
        "pronites": true,
        "accommodation": false,
        "day": 1
      }
    },
    "pass_day2": {
      "name": "Day 2 Pass",
      "description": "Access to stall areas and pronite of Day 2. No club events or flagship events.",
      "price": 500,
      "access": {
        "club_events": false,
        "flagship_events": false,
        "pronites": true,
        "accommodation": false,
        "day": 2
      }
    },
    "pass_day3": {
      "name": "Day 3 Pass",
      "description": "Access to stall areas and pronite of Day 3. No club events or flagship events.",
      "price": 800,
      "access": {
        "club_events": false,
        "flagship_events": false,
        "pronites": true,
        "accommodation": false,
        "day": 3
      }
    }
  }

export default pass_data;