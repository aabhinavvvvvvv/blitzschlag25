import { useState } from 'react'
import { CheckIcon, PlusIcon, MinusIcon } from 'lucide-react'
import bg from '../Assets/passbg.webp'
const passes = [
  {
    name: "Horizon Pass",
    price: 300,
    description: "Participate in any club events of one day",
    features: [
      "Access to all club events for one day",
      "No access to flagship events",
      "No access to pronites",
      "Choose your preferred day",
    ],
    daySelection: true,
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

function PassCard({ pass }) {
  const [selectedDay, setSelectedDay] = useState("day1")
  const [selectedFlagship, setSelectedFlagship] = useState(flagshipEvents[0].value)
  const [quantity, setQuantity] = useState(0)

  const incrementQuantity = () => setQuantity(q => q + 1)
  const decrementQuantity = () => setQuantity(q => Math.max(0, q - 1))

  return (
    <div className="relative flex flex-col p-8 rounded-xl border border-gray-200 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
      <div className="flex-grow">
        <span className="text-indigo-600 font-medium">
          {pass.name}
        </span>
        <div className="mt-4 text-gray-800 text-3xl font-semibold">
          ₹{pass.price} <span className="text-xl text-gray-600 font-normal">/pass</span>
        </div>
        <p className="mt-4 text-gray-600">{pass.description}</p>
        
        <ul className="mt-6 space-y-3 flex flex-col">
          {pass.features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-3">
              <CheckIcon className="h-5 w-5 text-indigo-600 flex-shrink-0" />
              <span className="text-gray-700 text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-700 font-medium">Quantity:</span>
          <div className="flex items-center">
            <button onClick={decrementQuantity} className="p-1 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200">
              <MinusIcon className="h-4 w-4" />
            </button>
            <span className="mx-3 text-gray-800 font-semibold">{quantity}</span>
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
        className="h-screen w-full bg-transparent relative overflow-y-scroll"
        style={{ fontFamily: 'cursive' }}
      >
        {/* Background Image */}
        <div
          className="fixed inset-0 bg-cover bg-center opacity-90"
          style={{ backgroundImage: `url(${bg})` }}
        ></div>
          <section className="py-14 min-h-screen bg-white">
            <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
              <div className="relative max-w-xl mx-auto sm:text-center mb-12  bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-xl p-8 shadow-lg">
                <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                  Cultural Event Passes
                </h3>
                <div className="mt-3 max-w-xl">
                  <p>
                    Choose the perfect pass for your cultural fest experience. From single-day access to full event immersion, we have a pass for everyone.
                  </p>
                </div>
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
