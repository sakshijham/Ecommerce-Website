import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Orders = () => {
  const userId = localStorage.getItem('userId');
  const [allOrders, setAllOrders] = useState([]);
  const token =localStorage.getItem('token');

  const fetchOrders = async () => {
    try {
      const orders = await axios.get(`http://localhost:3000/get-order/${userId}`,
        {
          headers:{
             "Authorization":`Bearer ${token}`,
            "Content-Type":"application/json"
          },
        }
      );
      console.log(orders.data.order);
      setAllOrders(orders.data.order);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(()=>{
    fetchOrders();
  },[])

  return (
    <div className="p-4">
      {/* <button
        onClick={fetchOrders}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Fetch Orders
      </button> */}
      <h1 className='text-2xl my-10 ml-3  text-gray-600'>YOUR ORDERS</h1>
      <table className="table-auto border-collapse w-full text-left">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Image</th>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Quantity</th>
            <th className="border px-4 py-2">Price</th>
          </tr>
        </thead>
        <tbody>
          {allOrders?.map((order, index) => (
            <React.Fragment key={index}>
             
              <tr className="bg-gray-100">
                <td colSpan="4" className="border px-4 py-2">
                  <strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>

             
              {order.orderItems?.map((orderItem, idx) => (
                <tr key={idx} className="border-t">
                  <td className="border px-4 py-2">
                    <img
                      src={orderItem.product.imageUrl}
                      alt={orderItem.product.title}
                      className="w-16 h-16 object-contain rounded-lg"
                    />
                  </td>
                  <td className="border px-4 py-2">{orderItem.product.title}</td>
                  <td className="border px-4 py-2">{orderItem.quantity}</td>
                  <td className="border px-4 py-2">${orderItem.product.price}</td>
                </tr>
              ))}

             
              <tr className="bg-gray-100">
                <td colSpan="4" className="border px-4 py-2 text-right">
                  <strong>Total Amount:</strong> ${order.totalAmount}
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
