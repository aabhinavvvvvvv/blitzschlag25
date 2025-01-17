import React, { useState, useEffect } from "react";
import {Link, useLocation } from "react-router-dom";
import bg from "../Assets/payment_bg.jpg";
import axios from "axios";
import { auth } from "../../firebase";
import post from "../Assets/poster.png";

const PaymentPage = () => {
  const location = useLocation();
  
  // Retrieve state from location or fallback to session storage
  const [uid, setUid] = useState(null);
  const [transactionId, setTransactionId] = useState("");
  const [inputAmount, setInputAmount] = useState(0);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [isRequesting, setIsRequesting] = useState(false);

  const [teamCode, setTeamCode] = useState("");
  const [passDetails, setPassDetails] = useState([]);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    // Try to fetch values from location or sessionStorage
    const savedState = JSON.parse(sessionStorage.getItem("paymentPageState")) || {};
    const state = location.state || savedState;

    setTeamCode(state.teamCode || "");
    setPassDetails(state.passDetails || []);
    setAmount(state.amount || 0);
    setInputAmount(state.amount || 0);

    // Save state to sessionStorage for page reloads
    if (location.state) {
      sessionStorage.setItem("paymentPageState", JSON.stringify(location.state));
    }

    const user = auth.currentUser;
    if (user) {
      setUid(user.uid); // Set UID if user is logged in
    }
  }, [location.state]);

  const handleTransactionIdChange = (e) => {
    setTransactionId(e.target.value);
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setInputAmount(value);
    }
  };

  const handleRequestPayment = async () => {
    if (!transactionId.trim()) {
      setVerificationStatus("Please enter a valid transaction ID.");
      return;
    }
    setIsRequesting(true);
    setVerificationStatus(null);
    try {
      const type = teamCode ? "registration" : "pass";
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/payment/request`, {
        userId: uid,
        amount: inputAmount,
        transactionId,
        type,
        passDetails,
        teamCode,
      });

      if (response.status === 201) {
        window.open("https://docs.google.com/forms/d/e/1FAIpQLSdPFuP4fPpwAmBlaJuOQDvPCvfyBwfpGkMbSL-FtS0_tjgprg/viewform");
        setVerificationStatus("Your request has been posted and will be reviewed soon.");
      } else {
        setVerificationStatus(response.data.message || "Failed to submit payment request.");
      }
    } catch (error) {
      setVerificationStatus(
        error.response?.data?.message || "An error occurred. Please try again later."
      );
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        paddingTop: "50px",
      }}
    >
      <div
        style={{
          padding: "15px",
          maxWidth: "400px",
          margin: "auto",
          marginTop: "30px",
          textAlign: "center",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          color: "#fff",
        }}
      >
        <h2 style={{ marginBottom: "10px" }}>Complete Your Payment</h2>
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="amount"
            style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "14px",
            }}
          >
            Amount to Pay:
          </label>
          <input
            type="number"
            id="amount"
            value={inputAmount}
            onChange={handleAmountChange}
            style={{
              padding: "8px",
              width: "100%",
              boxSizing: "border-box",
              borderRadius: "5px",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              color: "#fff",
              fontSize: "14px",
            }}
            placeholder="Enter amount to pay"
          />
        </div>
        <div style={{ margin: "20px 0", display: "flex", justifyContent: "center" }}>
          <img
            src={post}
            alt="QR Code for Payment"
            style={{
              border: "1px solid rgba(255, 255, 255, 0.3)",
              padding: "10px",
              borderRadius: "8px",
              maxWidth: "100%",
            }}
          />
        </div>
        <div style={{ margin: "15px 0" }}>
          <label
            htmlFor="transactionId"
            style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "14px",
            }}
          >
            Enter Transaction ID:
          </label>
          <input
            type="text"
            id="transactionId"
            value={transactionId}
            onChange={handleTransactionIdChange}
            style={{
              padding: "8px",
              width: "100%",
              boxSizing: "border-box",
              borderRadius: "5px",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              color: "#fff",
              fontSize: "14px",
            }}
            placeholder="Enter transaction ID here"
          />
        </div>
        <button
          onClick={handleRequestPayment}
          style={{
            padding: "10px 20px",
            backgroundColor: isRequesting ? "#555" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: isRequesting ? "not-allowed" : "pointer",
            fontSize: "14px",
          }}
          disabled={isRequesting}
        >
          {isRequesting ? "Requesting..." : "Request Payment Verification"}
        </button>
        {verificationStatus && (
          <div
            style={{
              marginTop: "20px",
              padding: "10px",
              borderRadius: "5px",
              backgroundColor: verificationStatus.includes("reviewed")
                ? "rgba(40, 167, 69, 0.2)"
                : "rgba(220, 53, 69, 0.2)",
              color: verificationStatus.includes("reviewed") ? "#28a745" : "#dc3545",
              border: verificationStatus.includes("reviewed")
                ? "1px solid rgba(40, 167, 69, 0.5)"
                : "1px solid rgba(220, 53, 69, 0.5)",
            }}
          >
            {verificationStatus}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
