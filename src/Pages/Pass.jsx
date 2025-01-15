import { useState } from 'react'
import { CheckIcon, PlusIcon, MinusIcon, XIcon } from 'lucide-react'
import bg from '../Assets/passbg.webp'

const passes = [
  {
    name: "Cosmic Pass",
    price: 2500,
    description: "Full access to all events for all three days",
    features: [
      "Participate in all events for three days",
      "Access to all club events",
      "Attend all three pronites",
      "Participate in one flagship event",
      "Accommodation for all three days",
    ],
    daySelection: false,
  },
  
  {
    name: "Galaxy Pass",
    price: 1200,
    description: "Access flagship event, club events, and pronite",
    features: [
      "Participate in one flagship event",
      "Access to all club events for one day",
      "Attend pronite of the same day",
      "Accommodation included (excluding food)",
    ],
    daySelection: true,
    flagshipSelection: true,
  },
  {
    name: "Horizon Pass",
    price: 300,
    description: "Participate in any club events of one day",
    features: [
      "Access to all club events for one day",
      "Choose your preferred day",
      "No access to flagship events",
      "No access to pronites",
    ],
    daySelection: true,
  },
  {
    name: "Participation Pass",
    price: 500,
    description: "Participate in one flagship event",
    features: [
      "Participate in one flagship event",
      "No accommodation",
      "No access to regular club events",
      "No access to pronites",
    ],
    flagshipSelection: true,
    daySelection: true,
  },
  {
    name: "Day 1 Pass",
    price: 500,
    description: "Access to stall areas and pronite of Day 1",
    features: [
      "Access to stall areas on Day 1",
      "Attend Day 1 pronite",
      "No access to club events",
      "No access to flagship events",
    ],
  },
  {
    name: "Day 2 Pass",
    price: 500,
    description: "Access to stall areas and pronite of Day 2",
    features: [
      "Access to stall areas on Day 2",
      "Attend Day 2 pronite",
      "No access to club events",
      "No access to flagship events",
    ],
  },
  {
    name: "Day 3 Pass",
    price: 800,
    description: "Access to stall areas and pronite of Day 3",
    features: [
      "Access to stall areas on Day 3",
      "Attend Day 3 pronite",
      "No access to club events",
      "No access to flagship events",
    ],
  },
]

const flagshipEvents = [
  { value: "panache", label: "Panache" },
  { value: "battleofbands", label: "Battle of Bands" },
  { value: "tamasha", label: "Tamasha" },
  { value: "rambasamba", label: "Ramba Samba" },
]

const days = [
  { value: "day3", label: "Day 3" },
  { value: "day2", label: "Day 2" },
  { value: "day1", label: "Day 1" },
]

function PassCard({ pass }) {
  const [selectedDay, setSelectedDay] = useState(days[0].value)
  const [selectedFlagship, setSelectedFlagship] = useState(flagshipEvents[0].value)
  const [quantity, setQuantity] = useState(0)

  const incrementQuantity = () => setQuantity(q => q + 1)
  const decrementQuantity = () => setQuantity(q => Math.max(0, q - 1))

  return (
    <div className="relative flex flex-col p-8 rounded-xl border border-gray-200 bg-opacity-10 backdrop-filter backdrop-blur-lg shadow-xl transition-all duration-300 h-full">
      <div className="flex-grow">
        <div className="text-indigo-600 text-xl text-center font-bold mx-auto">
          {pass.name}
        </div>
        <div className="mt-4 text-gray-200 text-3xl font-semibold">
          ₹{pass.price} <span className="text-xl text-gray-700 font-normal">/pass</span>
        </div>
        <p className="mt-4 text-gray-300">{pass.description}</p>
        
        <ul className="mt-6 space-y-3 flex flex-col">
          {pass.features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-3">
              {feature.startsWith("No ") ? (
                <XIcon className="h-5 w-5 text-red-500 flex-shrink-0" />
              ) : (
                <CheckIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
              )}
              <span className="text-gray-200 text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-8 space-y-4">
        {pass.daySelection && (
          <div>
            <label htmlFor={`day-${pass.name}`} className="block text-sm font-medium text-gray-200 mb-1">
              Select Day
            </label>
            <select
              id={`day-${pass.name}`}
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white bg-opacity-20 text-gray-200"
            >
              {days.map((day) => (
                <option key={day.value} className='text-gray-500' value={day.value}>
                  {day.label}
                </option>
              ))}
            </select>
          </div>
        )}
        {pass.flagshipSelection && (
          <div>
            <label htmlFor={`flagship-${pass.name}`} className="block text-sm font-medium text-gray-200 mb-1">
              Select Flagship Event
            </label>
            <select
              id={`flagship-${pass.name}`}
              value={selectedFlagship}
              onChange={(e) => setSelectedFlagship(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white bg-opacity-20  text-gray-200"
            >
              {flagshipEvents.map((event) => (
                <option key={event.value} className='text-gray-500' value={event.value}>
                  {event.label}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="flex items-center justify-between">
          <span className="text-gray-200 font-medium">Quantity:</span>
          <div className="flex items-center">
            <button onClick={decrementQuantity} className="p-1 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200">
              <MinusIcon className="h-4 w-4" />
            </button>
            <span className="mx-3 text-gray-200 font-semibold">{quantity}</span>
            <button onClick={incrementQuantity} className="p-1 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200">
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
        <button className="px-3 py-3 rounded-lg w-full font-semibold text-sm duration-150 text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 backdrop-filter backdrop-blur-sm">
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default function Pass() {
  return (
    <div
      className="min-h-screen w-full bg-transparent relative overflow-y-auto"
      style={{ fontFamily: 'cursive' }}
    >
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      ></div>
      <section className="py-14 relative bg-black bg-opacity-10">
        <div className="max-w-screen-xl mx-auto px-4 text-gray-700 md:px-8">
          <div className="relative max-w-xl mx-auto sm:text-center mb-12">
            <h3
              className="text-6xl font-bold mt-8 tracking-wider text-center text-gray-200"
              style={{ fontFamily: "'Metal Mania', cursive" }}
            >
              Cultural Fest Passes
            </h3>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-center items-stretch">
            {passes.map((pass, idx) => (
              <PassCard key={idx} pass={pass} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}



