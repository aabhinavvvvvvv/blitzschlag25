import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Trash2, MinusIcon, PlusIcon } from 'lucide-react';
import { removeFromCart, updateCartItemQuantity } from '../slices/cartSlice'; // Import your cartSlice actions
import bg from '../Assets/passbg.webp';
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { auth } from '../../fi';
import { toast } from 'react-toastify';
function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cartItems); // Access cart items from Redux store
  const [totalCartAmount, setTotalCartAmount] = useState(0);

  // Recalculate totalCartAmount whenever cartItems change
  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + item.totalAmount * item.quantity, 0);
    setTotalCartAmount(total);
  }, [cartItems]);

  const deleteItem = (item) => {
    toast.success("Removed from cart");
    dispatch(removeFromCart(item)); // Dispatch action to remove item from cart
  };

  const updateQuantity = (item, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateCartItemQuantity({ item, newQuantity })); // Dispatch action to update item quantity
    }
  };

  // *****************************************//
  const [uid, setUid] = useState(null);
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUid(user.uid); // Set UID when the user is logged in
    } else {
      toast.error("User not logged in.");
    }
  }, []);

  const handleOnclick = (e) => {
    e.preventDefault();
    navigate('/pay', {
      state: {
        passDetails: cartItems,
        amount: totalCartAmount,
        userId: uid
      },
    });
  }
  // *****************************************//

  return (
    <div className="min-h-screen w-full bg-transparent relative overflow-y-auto font-sans" style={{ fontFamily: 'cursive' }}>
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      ></div>
      <div className="bg-black bg-opacity-30 relative min-h-screen">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <h1 className="text-5xl font-bold mt-8 mb-8 text-center text-gray-200 tracking-wider" style={{ fontFamily: "'Metal Mania', cursive" }}>
            Your Cart
          </h1>
          {
            cartItems.length === 0 ? (
              <div className='flex justify-center my-40'>
                <p className='text-5xl font-bold text-white'>Your cart is empty</p>
              </div>
            ) : (
              <div>
                <div className="space-y-6">
                  {cartItems.map((item, index) => (
                    <div
                      key={index}
                      className="relative flex flex-col sm:flex-row items-center p-3 md:p-6 rounded-xl border border-gray-200 backdrop-filter backdrop-blur-lg shadow-xl transition-all duration-300"
                    >
                      <div className="flex-grow mb-4 sm:mb-0">
                        <h2 className="text-2xl font-semibold text-white mb-2">{item.passName}</h2>
                        {item.day && <p className="text-gray-300">{item.day}</p>}
                        {item.flagshipEvent && <p className="text-gray-300">{item.flagshipEvent}</p>}
                        <p className="text-gray-300 mt-2">Quantity: {item.quantity}</p>
                        <p className="text-xl font-bold text-indigo-400 mt-2">Total: ₹{item.totalAmount * item.quantity}</p>
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
                <div className="mt-12  flex justify-center items-center">
                  <p className="text-3xl md:text-5xl font-bold text-white">Cart Total: ₹{totalCartAmount}</p>
                </div>
              </div>
            )
          }

          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <button onClick={() => { navigate('/pass'); }} className="p-3 md:px-6 md:py-3 flex flex-row items-center rounded-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-500">
              <FaArrowLeft className='mr-2' /><p>Back to passes</p>
            </button>
            <button onClick={handleOnclick} className="p-3 md:px-6 md:py-3 rounded-lg flex flex-row items-center font-semibold text-white bg-indigo-600 hover:bg-indigo-500">
              Proceed to Buy<FaArrowRight className='ml-2'/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;




