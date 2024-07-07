import React from 'react';

const dummyCoupons = [
  {
    code: 'SUMMER21',
    discount: '20%',
    expire: '2023-12-31',
    availableOn: 'All Products',
  },
  {
    code: 'WINTER50',
    discount: '50%',
    expire: '2023-01-31',
    availableOn: 'Selected Items',
  },
  // Add more dummy coupons as needed
];

const Coupons = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Coupons</h1>
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
        This is in test version you can not add, delete or edit data
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200 text-left text-lg font-semibold text-gray-700">Coupon Code</th>
              <th className="py-2 px-4 bg-gray-200 text-left text-lg font-semibold text-gray-700">Discount</th>
              <th className="py-2 px-4 bg-gray-200 text-left text-lg font-semibold text-gray-700">Expire</th>
              <th className="py-2 px-4 bg-gray-200 text-left text-lg font-semibold text-gray-700">Available On</th>
              <th className="py-2 px-4 bg-gray-200 text-left text-lg font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {dummyCoupons.map((coupon, index) => (
              <tr key={index}>
                <td className="py-2 px-4 text-lg text-gray-700">{coupon.code}</td>
                <td className="py-2 px-4 text-lg text-gray-700">{coupon.discount}</td>
                <td className="py-2 px-4 text-lg text-gray-700">{coupon.expire}</td>
                <td className="py-2 px-4 text-lg text-gray-700">{coupon.availableOn}</td>
                <td className="py-2 px-4 text-lg text-gray-700">
                  <a href="#" className="text-blue-500 hover:underline">View</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Coupons;
