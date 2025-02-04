import React, { useState } from 'react';
import './TransactionDetails.css'; // Assuming you want to use a separate CSS file for styling

const TransactionDetails = () => {
    const [transactionId, setTransactionId] = useState('');
    const [passDetails, setPassDetails] = useState(null);
    const [teamCode, setTeamCode] = useState(null);
    const [statusMessage, setStatusMessage] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [showAddButton, setShowAddButton] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleTransactionIdChange = (e) => {
        setTransactionId(e.target.value);
    };

    const fetchPaymentDetails = async () => {
        if (!transactionId) {
            alert('Please enter a Transaction ID.');
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/payment/details?transactionId=${transactionId}`);
            const data = await response.json();

            if (response.status === 200) {
                setStatusMessage('Payment details fetched successfully.');
                const { passDetails, teamCode } = data.data;

                setPassDetails(passDetails || null);
                setTeamCode(teamCode || null);
                setIsVerified(true);
                setShowAddButton(true);
            } else {
                setStatusMessage(data.message || 'Error fetching details.');
                setIsVerified(false);
                setShowAddButton(false);
            }
        } catch (error) {
            setStatusMessage('An error occurred while fetching details.');
            setIsVerified(false);
            setShowAddButton(false);
        } finally {
            setIsLoading(false);
        }
    };

    const addToDatabase = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/transaction/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ transactionId })
            });

            const data = await response.json();

            if (response.status === 200) {
                alert('Transaction added successfully to the database!');
                setStatusMessage('Transaction successfully added. Give the following passes to the client.');
                // Optionally show passes here if needed
            } else {
                alert(data.message || 'Error adding transaction.');
            }
        } catch (error) {
            alert('An error occurred while adding to the database.');
        }
    };

    return (
        <div className="container">
            <h2 className="header">Fetch Transaction Details</h2>

            <div className="form-group">
                <label htmlFor="transactionId">Enter Transaction ID:</label>
                <input
                    type="text"
                    id="transactionId"
                    value={transactionId}
                    onChange={handleTransactionIdChange}
                    placeholder="Enter transaction ID"
                    required
                    className="input-field"
                />
            </div>

            <button
                onClick={fetchPaymentDetails}
                className="button primary-btn"
                disabled={isLoading}
            >
                {isLoading ? 'Fetching...' : 'Fetch Details'}
            </button>

            <div className={`result-box ${isVerified ? 'show' : ''}`}>
                <h3>Transaction Details</h3>
                <p className="status-message">{statusMessage}</p>

                {passDetails && (
                    <div className="details">
                        <h4>Pass Details:</h4>
                        <pre>{JSON.stringify(passDetails, null, 2)}</pre>
                    </div>
                )}

                {teamCode && (
                    <div className="details">
                        <h4>Team Code:</h4>
                        <p>{teamCode}</p>
                    </div>
                )}

                {showAddButton && (
                    <button
                        onClick={addToDatabase}
                        className="button success-btn"
                    >
                        Add to Database
                    </button>
                )}
            </div>
        </div>
    );
};

export default TransactionDetails;
