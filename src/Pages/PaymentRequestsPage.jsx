import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PaymentRequestsPage = () => {
    const [paymentRequests, setPaymentRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPaymentRequests = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/payment/requests`);
                setPaymentRequests(response.data.data);
            } catch (err) {
                setError('Failed to fetch payment requests');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPaymentRequests();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
        maxWidth: '1200px', // Ensure the table has the same max width as the container
        margin: '0 auto', // Center the table
    };

    const thTdStyle = {
        padding: '12px 15px',
        border: '1px solid #333',
        textAlign: 'left',
        color: '#fff',
    };

    const thStyle = {
        ...thTdStyle,
        backgroundColor: '#444',
        fontWeight: 'bold',
        fontSize: '1rem',
    };

    const alternateRowStyle = {
        backgroundColor: '#333',
    };

    const hoverRowStyle = {
        backgroundColor: '#555',
    };

    const pageContentStyle = {
        margin: '30px auto',
        maxWidth: '1200px', // Ensure the content container has the same max width as the table
        backgroundColor: '#222',
        borderRadius: '8px',
        padding: '30px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
    };

    const titleStyle = {
        fontSize: '2.2rem',
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: '30px', // More space between the title and the table
        textAlign: 'center',
    };

    return (
        <div style={pageContentStyle}>
            <h1 style={titleStyle}>Payment Requests</h1>
            {paymentRequests.length === 0 ? (
                <p style={{ color: '#fff', textAlign: 'center' }}>No payment requests found.</p>
            ) : (
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thStyle}>User ID</th>
                            <th style={thStyle}>Amount</th>
                            <th style={thStyle}>Transaction ID</th>
                            <th style={thStyle}>Type</th>
                            <th style={thStyle}>Team Code</th>
                            <th style={thStyle}>Verified</th>
                        </tr>
                    </thead>
                    <tbody>
                    {paymentRequests.map((payment, index) => (
  // Skip row with specific transactionId ("buscyuec")
  payment.transactionId !== "T2502041220579754795317" && (
    <tr
      key={payment.id}
      style={index % 2 === 0 ? alternateRowStyle : {}}
      onMouseEnter={(e) => (e.target.style.backgroundColor = hoverRowStyle.backgroundColor)}
      onMouseLeave={(e) => (e.target.style.backgroundColor = '')}
    >
      <td style={thTdStyle}>{payment.userId}</td>
      <td style={thTdStyle}>{payment.amount}</td>
      <td style={thTdStyle}>{payment.transactionId}</td>
      <td style={thTdStyle}>{payment.type}</td>
      <td style={thTdStyle}>
        {payment.teamCode ? payment.teamCode : 'N/A'}
      </td>
      <td style={thTdStyle}>{payment.verified ? 'Yes' : 'No'}</td>
    </tr>
  )
))}

                    </tbody>
                </table>
            )}
        </div>
    );
};

export default PaymentRequestsPage;
