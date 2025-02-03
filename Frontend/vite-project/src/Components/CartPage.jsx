import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineDelete } from "react-icons/ai";
import { addToCart, resetCart, removefromCart } from "./Reducers/CartSlice";
import axios from "axios";
import OrderTotal from "./OrderTotal";
import CartTotal from "./CartTotal";

// const CartPage = () => {
//   const dispatch = useDispatch();
//   const cartItems = useSelector((state) => state.cart.cart);
//   const token = localStorage.getItem('token');

//   const fetchCartItems = async () => {
//     try {
//       let userId = localStorage.getItem("userId");
//       const res = await axios.get(`http://localhost:3000/get-cart-items/${userId}`, {
//         headers: {
//           "Authorization": `Bearer ${token}`,
//           "Content-Type": "application/json"
//         },
//       });

//       dispatch(resetCart());
//       if (res.data && res.data.length > 0) {
//         res.data.forEach((item) => {
//           dispatch(
//             addToCart({
//               cartId: item.cartId,
//               title: item.product.title,
//               image: item.product.imageUrl,
//               price: item.product.price,
//               quantity: item.quantity,
//             })
//           );
//         });
//       }
//     } catch (error) {
//       console.error("Error fetching cart items", error);
//     }
//   };

//   useEffect(() => {
//     fetchCartItems();
//   }, []);

//   const removeCartItem = async (cartId, index) => {
//     try {
//       let userId = localStorage.getItem("userId");
//       await axios.delete(`http://localhost:3000/delete-cart-item/${userId}/${cartId}`, {
//         headers: {
//           "Authorization": `Bearer ${token}`,
//           "Content-Type": "application/json"
//         },
//       });
//       dispatch(removefromCart(index));
//     } catch (error) {
//       console.error("Error removing cart item", error);
//     }
//   };


//   const clearCart = async()=>{
//     try {
//       let userId = localStorage.getItem("userId");
//       let result = await axios.delete(`http://localhost:3000/clear-cart/${userId}`,
//         {
//           headers:{
//             "Authorization":`Bearer ${token}`,
//             "Content-Type":"application/json"
//           }
//         }
//       );
//       dispatch(resetCart());
      
//     } catch (error) {
//       console.error("Error clearing cart", error);
//     }
//   }

//   const incrementQuantity = async(cartId)=>{
//     try {
//      const userId = localStorage.getItem('userId');
//      const res = await axios.post(`http://localhost:3000/plus-one-quantity`,{userId,cartId},
//        {
//          headers:{
//             "Authorization":`Bearer ${token}`,
//            "Content-Type":"application/json"
//          },
//        }
//      );
//      fetchCartItems();
 
//     } catch (error) {
//      console.error('Error incrementing quantity',error);
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 py-10">
//       <div className="container mx-auto px-6 lg:px-12">
//         <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Shopping Cart</h1>

//         {cartItems.length > 0 ? (
//           <div className="flex flex-col lg:flex-row gap-8">
//             <div className="flex-grow bg-white shadow-lg rounded-lg p-6">
//               <table className="w-full border-collapse">
//                 <thead>
//                   <tr className="bg-gray-200 text-gray-700 text-lg">
//                     {/* <th className="py-4 px-4 text-left">Product</th>
//                     <th className="py-4 px-4 text-center">Quantity</th>
//                     <th className="py-4 px-4 text-right">Price</th>
//                     <th className="py-4 px-4 text-center">Action</th> */}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {cartItems.map((item, index) => (
//                     <tr key={index} className="border-b border-gray-300">
//                       <td className="py-4 px-4 flex items-center">
//                         <img
//                           src={item.image}
//                           alt={item.title}
//                           className="w-20 h-20 object-cover rounded-lg mr-4 shadow-md"
//                         />
//                         <h5 className="text-lg font-medium text-gray-900">{item.title}</h5>
//                       </td>
//                       <td className="py-4 px-4 text-center flex items-center gap-3 justify-center">
//                         {/* <button
//                           className="bg-gray-700 text-white px-3 py-1 rounded-lg hover:bg-gray-600 transition"
//                         >
//                           -
//                         </button> */}
//                         <span className="text-lg font-semibold text-gray-800">{item.quantity}</span>
//                         <button
//                           className="bg-gray-700 text-white px-3 py-1 rounded-lg hover:bg-gray-600 transition"
//                           //onClick={incrementQuantity(item.cartId)}
//                         >
//                           +
//                         </button>
//                       </td>
//                       <td className="py-4 px-4 text-right text-gray-700 text-lg">${item.price}</td>
//                       <td className="py-4 px-4 text-center">
//                         <button
//                           className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-500 transition"
//                           onClick={() => removeCartItem(item.cartId, index)}
//                         >
//                           <AiOutlineDelete size={22} />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//               <div className="flex justify-between mt-6">
//                 <button
//                   className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-500 transition"
//                   onClick={clearCart}
//                 >
//                   Clear Cart
//                 </button>
//               </div>
//             </div>

//             <div className="lg:w-1/3">
//               <CartTotal />
//             </div>
//           </div>
//         ) : (
//           <p className="text-center text-gray-600 text-xl mt-10">Your cart is empty</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CartPage;








const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart);
  const token = localStorage.getItem('token')

  // const fetchCartItems = async () => {
  //   try {
  //     let userId = localStorage.getItem("userId");
  //     const res = await axios.get(`http://localhost:3000/get-cart-items/${userId}`,
  //       {
  //         headers:{
  //            "Authorization":`Bearer ${token}`,
  //           "Content-Type":"application/json"
  //         },
  //       }
  //     );
  //     // console.log("response data", res.data);

  //     dispatch(resetCart());

  //     if (res.data && res.data.length > 0) {
  //       res.data.forEach((item) => {
  //         dispatch(
  //           addToCart({
  //             cartId: item.cartId,
  //             title: item.product.title,
  //             image: item.product.imageUrl,
  //             price: item.product.price,
  //             quantity: item.quantity,
  //           })
  //         );
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error fetching cart items", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchCartItems();
  // }, []);

  const removeCartItem = async (cartId, index) => {
    try {
      let userId = localStorage.getItem("userId");
      await axios.delete(`http://localhost:3000/delete-cart-item/${userId}/${cartId}`,
        {
          headers:{
             "Authorization":`Bearer ${token}`,
            "Content-Type":"application/json"
          },
        }
      );
      dispatch(removefromCart(index));
    } catch (error) {
      console.error("Error removing cart item", error);
    }
  };

  const clearCart = async () => {
    try {
      let userId = localStorage.getItem("userId");
      await axios.delete(`http://localhost:3000/clear-cart/${userId}`,
        {
          headers:{
             "Authorization":`Bearer ${token}`,
            "Content-Type":"application/json"
          },
        }
      );
      dispatch(resetCart());
    } catch (error) {
      console.error("Error clearing cart", error);
    }
  };

 
 const incrementQuantity = async(cartId)=>{
   try {
    const userId = localStorage.getItem('userId');
    const res = await axios.post(`http://localhost:3000/plus-one-quantity`,{userId,cartId},
      {
        headers:{
           "Authorization":`Bearer ${token}`,
          "Content-Type":"application/json"
        },
      }
    );
     dispatch(addToCart({
              cartId: res?.data?.data?.cartId,
              title: res?.data?.data?.product?.title,
              image: res?.data?.data?.product?.imageUrl,
              price: res?.data?.data?.product?.price,
              quantity: res?.data?.data?.quantity
            }))

   } catch (error) {
    console.error('Error incrementing quantity',error);
   }
 }

 const decrementQuantity =async(cartId)=>{
   try {
    const userId = localStorage.getItem('userId');
    const res = await axios.post('http://localhost:3000/minus-one-quantity',{userId,cartId},
      {
        headers:{
           "Authorization":`Bearer ${token}`,
          "Content-Type":"application/json"
        },
      }
    )
    dispatch(addToCart({
      cartId: res?.data?.data?.cartId,
      title: res?.data?.data?.product?.title,
      image: res?.data?.data?.product?.imageUrl,
      price: res?.data?.data?.product?.price,
      quantity: res?.data?.data?.quantity
    }))
    
   } catch (error) {
     console.error('Error decrementing quantity',error);
   }
 }




  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Shopping Cart</h1>

        {cartItems.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-grow">
              <table className="min-w-full bg-white rounded-lg shadow-lg">
                <thead>
                  {/* <tr className="bg-gray-200 text-gray-700">
                    <th className="py-4 px-4 text-left w-2/5">Product</th>
                    <th className="py-4 px-4 text-left w-2/5">Quantity</th>
                    <th className="py-4 px-4 text-left w-2/5">Price</th>
                    <th className="py-4 px-4 text-left w-2/5">Action</th>
                  </tr> */}
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
                          <h5 className="text-lg font-semibold">{item.title}</h5>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center flex items-center gap-2">
                        <button
                          className="bg-gray-800 text-white px-2 py-1 rounded-lg hover:bg-gray-400 transition"
                          onClick={()=>decrementQuantity(item.cartId)}
                        >
                          -
                        </button>
                        {item.quantity}
                        <button
                          className="bg-gray-800 text-white px-2 py-1 rounded-lg hover:bg-gray-400 transition"
                          onClick={()=>incrementQuantity(item.cartId)}
                        >
                          +
                        </button>
                      </td>
                      <td className="py-4 px-4 text-right text-gray-600">${item.price}</td>
                      <td className="py-4 px-4 text-center">
                        <button
                          className="bg-gray-800 text-white px-2 py-2 rounded-lg hover:bg-gray-400 transition"
                          onClick={() => removeCartItem(item.cartId, index)}
                        >
                          <AiOutlineDelete size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500"
                onClick={clearCart}
              >
                Clear Cart
              </button>
            
            </div>
            <div className="lg-w-1/3">
              {/* <OrderTotal />
               */}
             <CartTotal/>
               
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg mt-10">Your cart is empty</p>
        )}
      </div>
    </div>
  );
};

export default CartPage; 
