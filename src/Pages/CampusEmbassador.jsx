import React, { useState,useEffect } from "react";
import { motion } from "framer-motion";
import bg from "../Assets/campus.jpg";
import {toast} from 'react-toastify'
import { auth } from '../../fi';
const CampusEmbassador = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    message: "",
  });
  const [uid, setUid] = useState(null);
    useEffect(() => {
      const user = auth.currentUser;
      if (user) {
        setUid(user.uid); // Set UID when the user is logged in
      }
    }, []);
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if(!user){
      toast.error("User not logged in.");
      setFormData({
        name: "",
      email: "",
      phone: "",
      college: "",
      message: ""
      })
      return;
    }
    console.log("Form Data Submitted:", formData);
    setFormData({
      name: "",
    email: "",
    phone: "",
    college: "",
    message: ""
    })
    toast.success("Registerd Succesfully")
    // You can add logic here to send formData to an API or perform any action
  };

  return (
    <div
      className="h-screen w-full bg-transparent relative overflow-y-scroll"
      style={{ fontFamily: "cursive" }}
    >
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center opacity-50 "
        style={{ backgroundImage: `url(${bg})` }}
      ></div>
      <div className="px-8 md:px-0">
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl md:mx-auto bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-4 md:p-8 pt-0 border border-white/20 mt-20 mb-10"
      >
        <div className="max-w-2xl mx-auto space-y-4 text-center pt-10">
          <h2
            className="text-white text-4xl font-bold md:text-5xl capitalize tracking-wider"
            style={{ fontFamily: "'Metal Mania', cursive" }}
          >
            Campus Ambassador
          </h2>
          <p className="text-indigo-100 md:text-lg text-sm">
            Represent your college and be part of an exciting community! Fill out the form below to get started.
          </p>
        </div>
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          onSubmit={handleSubmit}
          className="mt-12 space-y-6"
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-white mb-1" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-white/20 border border-white/10 text-white placeholder-white/50 p-3 rounded-xl focus:ring-4 focus:ring-indigo-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-white/20 border border-white/10 text-white placeholder-white/50 p-3 rounded-xl focus:ring-4 focus:ring-indigo-400 focus:outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-white mb-1" htmlFor="phone">
                Phone number
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full bg-white/20 border border-white/10 text-white placeholder-white/50 p-3 rounded-xl focus:ring-4 focus:ring-indigo-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1" htmlFor="college">
                College
              </label>
              <input
                id="college"
                type="text"
                placeholder="Enter your college name"
                value={formData.college}
                onChange={handleChange}
                required
                className="w-full bg-white/20 border border-white/10 text-white placeholder-white/50 p-3 rounded-xl focus:ring-4 focus:ring-indigo-400 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-1" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              placeholder="Write your message here..."
              value={formData.message}
              onChange={handleChange}
              className="w-full h-36 bg-white/20 border border-white/10 text-white placeholder-white/50 p-3 rounded-xl focus:ring-4 focus:ring-indigo-400 focus:outline-none"
            ></textarea>
          </div>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="w-fit px-10 mx-auto text-center active:scale-90 transition-all duration-300 bg-white hover:text-white text-indigo-600 hover:bg-indigo-600 py-3 rounded-xl font-medium"
            >
              Register as Campus Ambassador
            </button>
          </div>
        </motion.form>
      </motion.main>
      </div>
      
    </div>
  );
};

export default CampusEmbassador;
