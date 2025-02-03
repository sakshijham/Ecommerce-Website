import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, resetCart } from './Reducers/CartSlice';
import { AiOutlineDelete } from 'react-icons/ai';
import OrderTotal from './OrderTotal';

const OrderNow = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state)=>state.cart.cart);
    const token = localStorage.getItem('token')
    // console.log(cartItems)


    const fetchCartItems = async () => {
      try {
        let userId = localStorage.getItem("userId");
        const res = await axios.get(`http://localhost:3000/get-cart-items/${userId}`,
          {
            headers:{
               "Authorization":`Bearer ${token}`,
              "Content-Type":"application/json"
            },
          }
        );
        // console.log("response data", res.data);
  
        dispatch(resetCart());
  
        if (res.data && res.data.length > 0) {
          res.data.forEach((item) => {
            dispatch(
              addToCart({
                cartId: item.cartId,
                title: item.product.title,
                image: item.product.imageUrl,
                price: item.product.price,
                quantity: item.quantity,
              })
            );
          });
        }
      } catch (error) {
        console.error("Error fetching cart items", error);
      }
    };
  
    useEffect(() => {
      fetchCartItems();
    }, []);
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">ORDER SUMMARY</h1>

        {cartItems.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8">
          
            <div className="flex-grow overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-lg">
                <thead>
                  <tr className="bg-gray-200 text-gray-700">
                    <th className="py-4 px-4 text-left w-2/4">Product</th>
                    <th className="py-4 px-4 text-center w-1/4">Quantity</th>
                    <th className="py-4 px-4 text-right w-1/4">Price</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-4 px-4 flex items-center">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 object-contain rounded-lg mr-4"
                        />
                        <div>
                          <h4 className="text-lg font-semibold">{item.title}</h4>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">{item.quantity}</td> 
                      <td className="py-4 px-4 text-right text-gray-600">
                        ${item.price}
                      </td>
                      <td className="py-4 px-4 text-center">
                       
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

           
            <div className="lg:w-1/3">
              <OrderTotal/>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg mt-10">
            Your cart is empty.
          </p>
        )}
      </div>
    </div>
  )
}

export default OrderNow
