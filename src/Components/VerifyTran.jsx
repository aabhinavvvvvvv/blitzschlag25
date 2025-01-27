import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { auth } from '../../fi';
import './PaymentVerificationForm.css'; // Import the CSS file for styles

const PaymentVerificationForm = () => {
    const [transactionId, setTransactionId] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleTransactionIdChange = (e) => {
        setTransactionId(e.target.value);
    };
    useEffect(() => {
        const fetchEmail = async () => {
            const currentUser = auth.currentUser;
            if (!currentUser) {
              console.error("No user is logged in.");
              return false; // Return false if no user is logged in
            }
            
            const mail = currentUser.email;
            console.log(mail);
            setEmail(mail);
          }     
        fetchEmail(); // Call the async function
      }, [ auth.currentUser]);



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!transactionId || !email) {
            setMessage('Please fill in both email and transaction ID.');
            return;
        }

        setLoading(true);
        setMessage('');
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/payment/verify`, {
                transactionId,
                email,
            });

            if (response.status === 200) {
                setMessage('Payment verified successfully!');
            } else {
                setMessage(response.data.message || 'An error occurred.');
            }
        } catch (error) {
            setMessage(`Error: ${error.response?.data?.message || error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <div className="form-wrapper">
                <h2>Verify Payment</h2>
                <form onSubmit={handleSubmit}>
                   
                    <div className="input-group">
                        <label htmlFor="transactionId">Transaction ID:</label>
                        <input
                            type="text"
                            id="transactionId"
                            value={transactionId}
                            onChange={handleTransactionIdChange}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? 'Verifying...' : 'Verify Payment'}
                    </button>
                </form>
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
};

export default PaymentVerificationForm;
