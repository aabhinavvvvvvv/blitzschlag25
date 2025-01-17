import React,{useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Trash2, MinusIcon, PlusIcon } from 'lucide-react';
import { removeFromCart, updateCartItemQuantity } from '../slices/cartSlice'; // Import your cartSlice actions
import bg from '../Assets/passbg.webp';
import { FaArrowLeft } from "react-icons/fa";

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cartItems); // Access cart items from Redux store
  const [totalCartAmount,settotalCartAmount] = useState(cartItems.reduce((sum, item) => sum + item.totalAmount, 0));
  const deleteItem = (item) => {
    dispatch(removeFromCart(item)); // Dispatch action to remove item from cart
    settotalCartAmount(cartItems.reduce((sum, item) => sum + item.totalAmount, 0))
  };

  const updateQuantity = (item, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateCartItemQuantity({ item, newQuantity })); // Dispatch action to update item quantity
    }
    settotalCartAmount(cartItems.reduce((sum, item) => sum + item.totalAmount, 0))
  };



  return (
    <div className="min-h-screen w-full bg-transparent relative overflow-y-auto font-sans" style={{ fontFamily: 'cursive' }}>
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      ></div>
      <div className="bg-black bg-opacity-30 relative h-screen">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <h1 className="text-5xl font-bold mt-8 mb-8 text-center text-gray-200 tracking-wider" style={{ fontFamily: "'Metal Mania', cursive" }}>
            Your Cart
          </h1>
          <div className="space-y-6">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="relative flex flex-col sm:flex-row items-center p-6 rounded-xl border border-gray-200 backdrop-filter backdrop-blur-lg shadow-xl transition-all duration-300"
              >
                <div className="flex-grow mb-4 sm:mb-0">
                  <h2 className="text-2xl font-semibold text-white mb-2">{item.passName}</h2>
                  {item.day && <p className="text-gray-300">{item.day}</p>}
                  {item.flagshipEvent && <p className="text-gray-300">{item.flagshipEvent}</p>}
                  <p className="text-gray-300 mt-2">Quantity: {item.quantity}</p>
                  <p className="text-xl font-bold text-indigo-400 mt-2">Total: ₹{item.totalAmount}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item, item.quantity - 1)}
                      className="bg-indigo-100 text-indigo-600 hover:bg-indigo-200 p-2 rounded-full"
                    >
                      <MinusIcon className="h-4 w-4" />
                    </button>
                    <span className="text-white font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item, item.quantity + 1)}
                      className="bg-indigo-100 text-indigo-600 hover:bg-indigo-200 p-2 rounded-full"
                    >
                      <PlusIcon className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => deleteItem(item)}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-right flex justify-center item-center">
            <p className="text-5xl font-bold text-white">Cart Total: ₹{totalCartAmount}</p>
          </div>
          <div className="mt-8 flex justify-between">
            <button className="px-6 py-3 flex flex-row items-center rounded-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-500">
            <FaArrowLeft className='mr-2'/><p>Back to passes</p>
            </button>
            <button className="px-6 py-3 rounded-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-500">
              Proceed to Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;


