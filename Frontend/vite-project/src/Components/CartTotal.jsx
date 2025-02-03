import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateTotal } from './Reducers/CartSlice';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const CartTotal = () => {
    const cartItems = useSelector((state)=>state.cart.cart);
    const total = useSelector((state)=>state.cart.total);
    const dispatch = useDispatch();
    const naviagte = useNavigate()
    const userId = localStorage.getItem('userId');

    useEffect(()=>{
        dispatch(updateTotal())
    },[cartItems])

    const placeOrderHandler = async()=>{
       try {
        const res = await axios.get(`http://localhost:3000/order-now/${userId}`);
        console.log('Order Now Response Data',res.data);
        localStorage.setItem('orderId',res.data.newOrder.orderId)
        // console.log('Order Response Data',res.data);
        
       } catch (error) {
         console.error('Error Placing Order',error);
       }
    }
    
   const OrderNow = async()=>{
      naviagte('/order-now');
   }
     


  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md mt-8 lg:mt-0">
      <h1 className="text-xl font-bold mb-4">Cart Summary</h1>
      <div className="space-y-3">
        <h3 className="text-gray-700">
          <span className="font-semibold">Subtotal:</span> ${total}
        </h3>
        <h3 className="text-gray-700">
          <span className="font-semibold">Shipping:</span> Free Shipping
        </h3>
        <h3 className="text-gray-800 text-lg">
          <span className="font-bold">Total:</span> ${total}
        </h3>
      </div>
      <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
      onClick={OrderNow}
     >
      <Link to='/order-now'>PLACE ORDER</Link> 
      </button>
    </div>
  )
}

export default CartTotal
