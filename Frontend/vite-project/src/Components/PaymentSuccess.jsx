import React from 'react';
import { useSearchParams } from 'react-router-dom';

const PaymentSuccess = () => {
  const [searchQuery] = useSearchParams();
  const referenceNum = searchQuery.get('reference');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      {referenceNum ? (
        <>
          <h1 className="text-3xl font-bold text-green-600">Order Successful</h1>
          <h3 className="text-lg text-gray-700 mt-2">
            Reference No: <span className="font-semibold text-blue-500">{referenceNum}</span>
          </h3>
        </>
      ) : (
        <h3 className="text-2xl font-semibold text-red-500">Error: Reference number is missing!</h3>
      )}
    </div>
  );
};

export default PaymentSuccess;


