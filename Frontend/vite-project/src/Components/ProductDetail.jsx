import React from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'


import axios from 'axios';

const ProductDetail = ({products}) => {
  const dispatch = useDispatch();
  const {productId} = useParams();
  const product = products?.find((p)=>p.productId === parseInt(productId))
  const token = localStorage.getItem('token');

  if(!product){
    return(
      <div className='text-center text-red-500 font-semibold mt-10'>
        Product not found
      </div>
    )
  }

  const addToCart = async(productId)=>{
      const userId = localStorage.getItem('userId');
      try {
        const res = await axios.post('http://localhost:3000/add-to-cart',{userId,productId,quantity:1},
          {
            headers:{
               "Authorization":`Bearer ${token}`,
              "Content-Type":"application/json"
            },
          }
        );

        if(res.status === 201 && res.data.msg === 'Product added to cart'){
            dispatch(addToCart({
              cartId:res.data.cartId,
              title:res.data.product.title,
              image:res.data.product.imageUrl,
              price:res.data.product.price,
              quantity:res.data.quantity
              
            }))
        }
  } catch (error) {
        console.error('Error adding to cart',error)
      }
  }
  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md flex flex-col md:flex-row gap-8 ">
        <div className='md:w-1/2  flex justify-center items-center'>
          <img src={product.imageUrl} alt={product.title} 
          className='w-72 h-72 object-contain rounded-lg shadow-lg'/>
        </div>

        <div className='md:w-1/2'>
          <h1 className='text-3xl fond-bold text-gray-800 mb-4'>
            {product.title}
          </h1>
          <p className='text-gray-600 mb-6'>
            {product.description}
          </p>
          <span className='text-2xl font-bold text-blue-600 mb-6 block'>
            {product.price}
          </span>
          <button className='bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700'
           onClick={()=>addToCart(product.productId)} >
            Add To Cart
          </button>
        </div>
    </div>
  )
}

export default ProductDetail
