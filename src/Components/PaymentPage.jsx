import React, { useState } from "react";
import post from "../Assets/poster.png";
const PaymentPage = ({ amount, onVerifyPayment }) => {
  const [transactionId, setTransactionId] = useState("");
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleTransactionIdChange = (e) => {
    setTransactionId(e.target.value);
  };

  const handleVerifyPayment = async () => {
    if (!transactionId.trim()) {
      setVerificationStatus("Please enter a valid transaction ID.");
      return;
    }

    setIsVerifying(true);
    setVerificationStatus(null);

    try {
      const isVerified = await onVerifyPayment(transactionId);
      if (isVerified) {
        setVerificationStatus("Payment verified successfully!");
      } else {
        setVerificationStatus("Verification failed. Please check the transaction ID.");
      }
    } catch (error) {
      setVerificationStatus("An error occurred during verification. Please try again later.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
      <h2>Complete Your Payment</h2>
      <p>Amount to Pay: <strong>{amount.toFixed(2)} USD</strong></p>
      <div style={{ margin: "20px 0" }}>
        <img
          src={post}
          alt="QR Code for Payment"
          style={{ border: "1px solid #ccc", padding: "10px" }}
        />
      </div>
      <div style={{ margin: "20px 0" }}>
        <label htmlFor="transactionId" style={{ display: "block", marginBottom: "10px" }}>
          Enter Transaction ID:
        </label>
        <input
          type="text"
          id="transactionId"
          value={transactionId}
          onChange={handleTransactionIdChange}
          style={{ padding: "10px", width: "100%", boxSizing: "border-box" }}
          placeholder="Enter transaction ID here"
        />
      </div>
      <button
        onClick={handleVerifyPayment}
        style={{
          padding: "10px 20px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          opacity: isVerifying ? 0.7 : 1,
        }}
        disabled={isVerifying}
      >
        {isVerifying ? "Verifying..." : "Request to Verify Payment"}
      </button>
      {verificationStatus && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            color: verificationStatus.includes("successfully") ? "green" : "red",
          }}
        >
          {verificationStatus}
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
