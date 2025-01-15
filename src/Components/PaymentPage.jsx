import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import bg from "../Assets/payment_bg.jpg";
import axios from "axios";
import post from "../Assets/poster.png";

const PaymentPage = () => {
  // Retrieve state passed via navigation
  const location = useLocation();
  const { teamCode = "", passDetails = [], amount = 0, userId = "" } = location.state || {};

  const [transactionId, setTransactionId] = useState("");
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [isRequesting, setIsRequesting] = useState(false);

  const handleTransactionIdChange = (e) => {
    setTransactionId(e.target.value);
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
        userId,
        amount,
        transactionId,
        type,
        passDetails,
        teamCode,
      });

      if (response.status === 201) {
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
      }}
    >
      <div
        style={{
          padding: "20px",
          maxWidth: "500px",
          margin: "auto",
          textAlign: "center",
          border: "1px solid #ddd",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
        }}
      >
        <h2 style={{ color: "#343a40", marginBottom: "10px" }}>Complete Your Payment</h2>
        <p style={{ fontSize: "16px", color: "#6c757d" }}>
          Amount to Pay: <strong>{amount.toFixed(2)} Rupees</strong>
        </p>
        <div style={{ margin: "20px 0", display: "flex", justifyContent: "center" }}>
          <img
            src={post}
            alt="QR Code for Payment"
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "8px",
            }}
          />
        </div>
        <div style={{ margin: "20px 0" }}>
          <label
            htmlFor="transactionId"
            style={{
              display: "block",
              marginBottom: "10px",
              fontSize: "14px",
              color: "#495057",
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
              padding: "10px",
              width: "100%",
              boxSizing: "border-box",
              borderRadius: "5px",
              border: "1px solid #ced4da",
              fontSize: "14px",
              color: "#495057",
            }}
            placeholder="Enter transaction ID here"
          />
        </div>
        <button
          onClick={handleRequestPayment}
          style={{
            padding: "10px 20px",
            backgroundColor: isRequesting ? "#6c757d" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: isRequesting ? "not-allowed" : "pointer",
            fontSize: "14px",
          }}
          disabled={isRequesting}
        >
          {isRequesting ? "Requesting..." : "Request Payment"}
        </button>
        {verificationStatus && (
          <div
            style={{
              marginTop: "20px",
              padding: "10px",
              borderRadius: "5px",
              backgroundColor: verificationStatus.includes("reviewed")
                ? "#d4edda"
                : "#f8d7da",
              color: verificationStatus.includes("reviewed")
                ? "#155724"
                : "#721c24",
              border: verificationStatus.includes("reviewed")
                ? "1px solid #c3e6cb"
                : "1px solid #f5c6cb",
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
