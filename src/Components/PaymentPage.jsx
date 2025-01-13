import React, { useState } from "react";
import bg from "../Assets/payment_bg.jpg";
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
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundImage: `url(${bg})`,
      backgroundSize: "cover",
    }}>
      <div style={{
        padding: "20px",
        maxWidth: "500px",
        margin: "auto",
        textAlign: "center",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
      }}>
        <h2 style={{ color: "#343a40", marginBottom: "10px" }}>Complete Your Payment</h2>
        <p style={{ fontSize: "16px", color: "#6c757d" }}>Amount to Pay: <strong>{amount.toFixed(2)} USD</strong></p>
        <div style={{ margin: "20px 0", display: "flex", justifyContent: "center" }}>
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?data=PAYMENT:${amount}&size=200x200`}
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
          onClick={handleVerifyPayment}
          style={{
            padding: "10px 20px",
            backgroundColor: isVerifying ? "#6c757d" : "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: isVerifying ? "not-allowed" : "pointer",
            fontSize: "14px",
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
              borderRadius: "5px",
              backgroundColor: verificationStatus.includes("successfully") ? "#d4edda" : "#f8d7da",
              color: verificationStatus.includes("successfully") ? "#155724" : "#721c24",
              border: verificationStatus.includes("successfully") ? "1px solid #c3e6cb" : "1px solid #f5c6cb",
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
