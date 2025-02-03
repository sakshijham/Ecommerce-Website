import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { fetch } from './Fetch/fetch';

const AddProducts = ({product}) => {
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('');
    const [price,setPrice] = useState('');
    const [imageUrl,setImageUrl] = useState('');
    const [category,setCategory] = useState('')
    const [products,setProducts] = useState([])
    const token = localStorage.getItem('token')
    //title,description,price,imageUrl,category

    const titleChangeHandler = (e) =>{
        setTitle(e.target.value);
    }
    const descriptionChangeHandler = (e) =>{
        setDescription(e.target.value);
    }
    const priceChangeHandler = (e) =>{
        setPrice(e.target.value);
    }
    const imageUrlChangeHandler = (e) =>{
        setImageUrl(e.target.value);
    }
    const categoryChangeHandler = (e) =>{
        setCategory(e.target.value)
    }

    useEffect(()=>{
      if(product){
        setTitle(product.title);
        setDescription(product.description);
        setPrice(product.price);
        setImageUrl(product.imageUrl);
        setCategory(product.category);
      }
    },[product])



    const submitHandler = async(event) =>{
        event.preventDefault();

        if(product){
          await axios.put(`http://localhost:3000/update-product/${product.productId}`,
            {title,description,price,imageUrl,category},
            {
              headers:{
                Authorization:`Bearer ${token}`,
                "Content-Type":'application/json'
              }
            }
          )

          setTitle('');
          setDescription('');
          setPrice('');
          setImageUrl('');
          setCategory('');

          fetchProducts();
        }
        else{
          await axios.post('http://localhost:3000/add-product',{title,description,price,imageUrl,category},
            {
                headers:{
                    "Authorization":`Bearer ${token}`,
                   "Content-Type":"application/json"
                 },  
            }
        ).then((res)=>{
           setProducts(res.data);
           fetchProducts();

           setTitle('');
           setDescription('');
           setPrice('');
           setImageUrl('');
           setCategory('')
          
            console.log('addd product ************',res.data);
        }).catch((err)=>{
          console.log(err)
        })
          
        }


       
        
     
    }

    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/get-products', {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        setProducts(response.data); 
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

   


   
  return (
    <form onSubmit={submitHandler} >

         <div className=' m-10 p-20 w-200'>
        
         <h1 className='text-3xl font-semibold text-gray-600'>Add Products</h1>

         <label htmlFor="title" className='mt-10 block text-lg font-medium  text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 '>Title</label>
        <input
          id="title"
          type="text"
          placeholder="Title"
          name="title"
          value={title}
          onChange={titleChangeHandler}
          className="w-96 p-3 mt-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
         <label htmlFor="desc" className='block text-lg font-medium  text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500'>Description</label>
        <input
          id="desc"
          type="text"
          placeholder="Description"
          name="desc"
          value={description}
          onChange={descriptionChangeHandler}
          className="w-96 p-3 mt-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
         <label htmlFor="price" className='block text-lg font-medium  text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500'>Price</label>
        <input
          id="price"
          type="text"
          placeholder="Price"
          name="price"
          value={price}
          onChange={priceChangeHandler}
          className="w-96 p-3 mt-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
         <label htmlFor="img" className='block text-lg font-medium  text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500'>ImageUrl</label>
        <input
          id="img"
          type="text"
          placeholder="ImageUrl"
          name="img"
          value={imageUrl}
          onChange={imageUrlChangeHandler}
          className="w-96 p-3 mt-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label htmlFor="category" className='block text-lg font-medium  text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500'>Category</label>
        <input
          id="category"
          type="text"
          placeholder="Category"
          name="category"
          value={category}
          onChange={categoryChangeHandler}
          className="w-96 p-3 mt-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className=" block w-96 bg-gray-800 text-white py-3 rounded-lg mt-4 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Product
        </button>
        </div>
    </form>
  )
}

export default AddProducts
