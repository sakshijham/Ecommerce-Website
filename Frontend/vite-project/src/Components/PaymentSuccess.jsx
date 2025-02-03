import React from 'react';
import { useSearchParams } from 'react-router-dom';

const PaymentSuccess = () => {
  const [searchQuery] = useSearchParams();
  const referenceNum = searchQuery.get('reference');

  return (
    <div>
      {referenceNum ? (
        <>
          <h1>Order Successful</h1>
          <h3>Reference No: {referenceNum}</h3>
        </>
      ) : (
        <h3>Error: Reference number is missing!</h3>
      )}
    </div>
  );
};

export default PaymentSuccess;
