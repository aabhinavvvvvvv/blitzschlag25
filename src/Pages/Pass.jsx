import { useState } from 'react'
import { CheckIcon, PlusIcon, MinusIcon, XIcon } from 'lucide-react'
import bg from '../Assets/passbg.webp'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';
import styled from 'styled-components';
import { toast } from 'react-toastify';
const Button = () => {
  const navigate = useNavigate();
  return (
    <StyledWrapper>
      <button onClick={() => navigate('/cart')} className="button scale-75 -right-8">
        <div className="bgContainer tracking-wider">
          <span className="tracking-wider" style={{ fontFamily: "'Metal Mania', cursive" }}>Cart&nbsp; </span>
          <span className="tracking-wider" style={{ fontFamily: "'Metal Mania', cursive" }}> Cart&nbsp; </span>
        </div>
        <div className="arrowContainer">
          <svg width={25} height={25} viewBox="0 0 45 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M43.7678 20.7678C44.7441 19.7915 44.7441 18.2085 43.7678 17.2322L27.8579 1.32233C26.8816 0.34602 25.2986 0.34602 24.3223 1.32233C23.346 2.29864 23.346 3.88155 24.3223 4.85786L38.4645 19L24.3223 33.1421C23.346 34.1184 23.346 35.7014 24.3223 36.6777C25.2986 37.654 26.8816 37.654 27.8579 36.6777L43.7678 20.7678ZM0 21.5L42 21.5V16.5L0 16.5L0 21.5Z" fill="black" />
          </svg>
        </div>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  position: fixed;
  bottom: 1rem; 
  right: 1rem; 
  z-index: 1000;

  @media (max-width: 768px) { /* Adjust the width as needed for your definition of 'small devices' */
    position: static;
    bottom: unset;
    right: unset;
  }
  button {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 1em 0em 1em 1em;
    background-color: pink;
    cursor: pointer;
    box-shadow: 4px 6px 0px black;
    border: 4px solid;
    border-radius: 15px;
    position: relative;
    overflow: hidden;
    z-index: 100;
    opacity:0.6;
    transition: box-shadow 250ms, transform 250ms, filter 50ms;
  }
  button:hover{
    opacity:1;
  }
  button:active {
    filter: saturate(0.75);
  }

  button::after {
    content: "";
    position: absolute;
    inset: 0;
    background-color: yellow;
    z-index: -1;
    transform: translateX(-100%);
    transition: transform 250ms;
  }

  button:hover::after {
    transform: translateX(0);
  }

  .bgContainer {
    position: relative;
    display: flex;
    justify-content: start;
    align-items: center;
    overflow: hidden;
    max-width: 33%; /* adjust this if the button text is not proper */
    font-size: 2em;
    font-weight: 600;
  }

  .bgContainer span {
    position: relative;
    transform: translateX(-100%);
    transition: all 250ms;
  }

  .button:hover .bgContainer > span {
    transform: translateX(0);
  }

  .arrowContainer {
    padding: 1em;
    margin-inline-end: 1em;
    border: 4px solid;
    border-radius: 50%;
    background-color: yellow;
    position: relative;
    overflow: hidden;
    transition: transform 250ms, background-color 250ms;
    z-index: 100;
  }

  .arrowContainer::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background-color: pink;
    transform: translateX(-100%);
    z-index: -1;
    transition: transform 250ms ease-in-out;
  }

  button:hover .arrowContainer::after {
    transform: translateX(0);
  }

  button:hover .arrowContainer {
    transform: translateX(5px);
  }

  button:active .arrowContainer {
    transform: translateX(8px);
  }

  .arrowContainer svg {
    vertical-align: middle;
  }
`;


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
    price: 1300,
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
    price: 700,
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
    price: 700,
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
    price: 700,
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
    price: 1000,
    description: "Access to stall areas and pronite of Day 3",
    features: [
      "Access to stall areas on Day 3",
      "Attend Day 3 pronite",
      "No access to club events",
      "No access to flagship events",
    ],
  },
]

const flagshipEventsByDay = {
  day1: [
    { value: "panache", label: "Panache" },
    { value: "tamasha", label: "Tamasha" },
  ],
  day2: [
    { value: "rambasamba", label: "Ramba Samba" },
  ],
  day3: [
    { value: "battleofbands", label: "Battle of Bands" },
  ],
}

const days = [
  { value: "day3", label: "Day 3" },
  { value: "day2", label: "Day 2" },
  { value: "day1", label: "Day 1" },
]

function PassCard({ pass }) {
  const [selectedDay, setSelectedDay] = useState(days[0].value)
  
  const [quantity, setQuantity] = useState(0)

  const incrementQuantity = () => setQuantity(q => q + 1)
  const decrementQuantity = () => setQuantity(q => Math.max(0, q - 1))
  const availableFlagshipEvents = flagshipEventsByDay[selectedDay] || []
  const [selectedFlagship, setSelectedFlagship] = useState(availableFlagshipEvents[0].label)
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    if (quantity > 0) {
      const details = {
        passName: pass.name,
        quantity,
        totalAmount: pass.price,
        ...(pass.daySelection && { day: selectedDay }),
        ...(pass.flagshipSelection && { flagshipEvent: selectedFlagship }),
      };
      
      // Dispatch the action to add to cart
      dispatch(addToCart(details));
      toast.success("Succesfully added to cart");
    } else {
      toast.error("Quantity must be greater than 0");
    }
  };
  return (
    <div className="relative flex flex-col p-8 rounded-xl border border-gray-200 bg-opacity-10 backdrop-filter backdrop-blur-lg shadow-xl transition-all duration-300 h-full">
      <div className="flex-grow">
        <div className="text-indigo-600 text-xl text-center font-bold mx-auto">
          {pass.name}
        </div>
        <div className="mt-4 text-gray-200 text-3xl font-semibold">
          ₹{pass.price} <span className="text-xl text-gray-700 font-normal">/pass</span>
        </div>
        {/* <p className="mt-4 text-gray-300">{pass.description}</p> */}
        
        <ul className="mt-6 space-y-3 flex flex-col">
          {pass.features.map((feature, idx) => (
            <li key={idx} className="flex gap-2">
              {feature.startsWith("No ") ? (
                <XIcon className="h-5 w-5 text-red-500 flex-shrink-0" />
              ) : (
                <CheckIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
              )}
              <span className="text-gray-200 text-md flex-1">{feature}</span>
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
              {availableFlagshipEvents.map((event) => (
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
        <button onClick={handleAddToCart} className="px-3 py-3 rounded-lg w-full font-semibold text-sm duration-150 text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 backdrop-filter backdrop-blur-sm">
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default function Pass() {
  const navigate = useNavigate(); 
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
            <Button >Go to Cart</Button>
            

            
          </div>
        </div>
      </section>
    </div>
  )
}



