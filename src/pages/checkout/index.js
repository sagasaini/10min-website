import React from 'react';

const PaymentPage = () => {
  return (
    <div className="payment-page flex p-6">
      <div className="payment w-full m-auto">
        <h2 className="text-xl font-bold mb-4">Select Payment Method</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded">
            <button className="w-full text-left">Wallets</button>
          </div>
          <div className="p-4 border rounded">
            <button className="w-full text-left">Add credit or debit cards</button>
          </div>
          <div className="p-4 border rounded">
            <button className="w-full text-left">Netbanking</button>
          </div>
          <div className="p-4 border rounded">
            <button className="w-full text-left">Add new UPI ID</button>
          </div>
          <div className="p-4 border rounded text-gray-400">
            <button className="w-full text-left" disabled>
              Cash
            </button>
            <p className="text-xs">This payment method is not available at the moment</p>
          </div>
          <div className="p-4 border rounded">
            <button className="w-full text-left">Pay Later</button>
          </div>
        </div>
      </div>
      <div className="margin w-full">
        <div className="p-4 border rounded mb-4">
          <h2 className="text-xl font-bold mb-2">Delivery Address</h2>
          <p className="text-sm">Home: sdf, sectro 37, Gurugram Haryana, India, Gurgaon Division</p>
        </div>
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-2">
            My Cart <span className="text-sm">(2 items)</span>
          </h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>1</span>
              <span>Amul Pure Milk Cheese Slices, 200 g</span>
              <span>₹145</span>
            </div>
            <div className="flex justify-between">
              <span>1</span>
              <span>Amul Masti Curd, 400 g</span>
              <span>₹35</span>
            </div>
          </div>
          <button className="w-full mt-4 bg-gray-200 p-2 rounded">Pay Now</button>
        </div>
      </div>

      <style jsx>{`
        .payment-page {
          width: 80%;
          margin: auto auto 145px;
          position: relative;
          top: 9rem;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        @media (min-width: 768px) {
          .payment-page {
            flex-direction: row;
          }
          .payment {
            width: 60%;
          }
          .margin {
            width: 40%;
            margin-left: 24px;
          }
        }
      `}</style>
    </div>
  );
};

export default PaymentPage;
