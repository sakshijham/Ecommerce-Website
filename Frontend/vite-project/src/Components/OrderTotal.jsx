import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateTotal } from './Reducers/CartSlice';
import axios from 'axios';

const CartTotal = () => {
    const cartItems = useSelector((state)=>state.cart.cart);
    const total = useSelector((state)=>state.cart.total);
    const dispatch = useDispatch();
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const orderId = localStorage.getItem('orderId');

    useEffect(()=>{
        dispatch(updateTotal())
    },[cartItems])

    // const orderNow = async()=>{
    //   try {

    //     const orderDetail = await axios.post(`http://localhost:3000/order-now/${userId}`,
         
    //     )
    //     console.log(orderDetail)

        
    //   } catch (error) {
    //     console.log(err)
    //   }
    // }
    
    const checkoutHandler = async()=>{
       console.log('OrderId',orderId)
      const {data:{key}} = await axios.get('http://localhost:3000/getkey',
       
      )

      const {data: {order}} = await axios.post('http://localhost:3000/checkout',{amount:Math.round(total) , orderId},
        {
          headers:{
             "Authorization":`Bearer ${token}`,
            "Content-Type":"application/json"
          },
        }
      );
      // console.log('Checkout data',data);

      
      
      const options = {
        key ,
        amount : order.amount,
        currency :"INR",
        name:"Sakshi",
        description : "Tutorial of Razorpay",
        image:"https://cdn.razorpay.com/logos/BUVwvgaqVBym2L_medium.png",
        order_id:order.id,
        callback_url:`http://localhost:3000/paymentVerification?userId=${userId}`,
        prefill:{
          name:"Sakshi",
          email : 'sakshijhamnani@gmail.com',
          contact:'9999999999'
        },
        notes:{
          "address":"Razorpay Corporate Office"
        },
        theme:{
          color:"#121212"
        }
      }
      const razor = new window.Razorpay(options);
      razor.open();
    }


  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md mt-8 lg:mt-0">
      <h1 className="text-xl font-bold mb-4">Price Details</h1>
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
      onClick={checkoutHandler}>
        Proceed to Checkout
      </button>
    </div>
  )
}

export default CartTotal
