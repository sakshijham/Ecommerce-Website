import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component';
import '../App.css'

const Home = () => {
  const [products, setProducts] = useState([])
  const [limit, setLimit] = useState(8);
  const dispatch = useDispatch();
  const userId = localStorage.getItem('userId')
  const token = localStorage.getItem('token');
  const [pageCount, setPageCount] = useState(1);
  const currentPage = useRef(1);
  //let totalCount  = 3;
  const [totalCount, setTotalCount] = useState(0);
  // const [searchQuery,setSearchQuery] = useState('')

  useEffect(() => {
    // currentPage.current = 1;
    getPaginatedProducts(true);
  }, [])

  const addToCart = async (productId) => {
    try {
      const res = await axios.post('http://localhost:3000/add-to-cart', { userId, productId, quantity: 1 },
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        }
      )

      if (res.status === 201 && res.data.msg === 'Product added to cart') {
        dispatch(addToCart({
          cartId: res.data.cartId,
          title: res.data.product.title,
          image: res.data.product.imageUrl,
          price: res.data.product.price,
          quantity: res.data.quantity
        }))
      }
    } catch (error) {
      console.error('Error adding to cart', error);
    }
  }

  // const handlePageClick = async (e) => {
  //   currentPage.current = e.selected + 1;
  //   getPaginatedProducts();
  // }

  const getPaginatedProducts = async (isNewFetch = false) => {
    try {
      // let pageNo = Math.ceil(products.length/limit) + 1;
      const res = await axios.get(`http://localhost:3000/pagination?page=${currentPage.current}&limit=${limit}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      })

      if(isNewFetch){
        setProducts(res.data.result);
      }else{
        setProducts((prev)=>[...prev,...res.data.result])
      }
     // const mergeData = [...products,...res.data.result]
      setPageCount(res.data.pageCount)
      setTotalCount(res.data.totalProducts)
     // setProducts(mergeData)
      //totalCount = res.data.totalProducts;
      //currentPage.current+=1;

    } catch (error) {
      console.error('Error fetching products', error)
    }
  }

  const fetchNextPage = () =>{
    if(products.length < totalCount){
      currentPage.current+=1;
      getPaginatedProducts();
    }
  }

  const searchHandle = async (e) => {
    let key = e.target.value;
    // setSearchQuery(key);
    if (key) {
      let result = await axios.get(`http://localhost:3000/search/${key}`);
      if (result) {
        setProducts(result.data);
      }
    } else {
      // currentPage.current = 1;
      // getPaginatedProducts(true);
    }
  }

  const filterBasedOnCategory = async (category) => {
    try {
      if (category === 'All') {
        currentPage.current = 1;   // It will take us to the first page
        getPaginatedProducts(true);
      } else {
        const result = await axios.get(`http://localhost:3000/filter-based-on-category/${category}`);
        setProducts(result.data)
      }
    } catch (error) {
      console.error("Error filtering products", error);
    }
  }

  const filterBasedOnPrice = async(filterPrice)=>{
    try {
      const result = await axios.get(`http://localhost:3000/filter-based-on-price/${filterPrice}`)
      setProducts(result.data);
      
    } catch (error) {
      console.error("Error filtering products",error);
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          onChange={searchHandle}
          className="w-full sm:w-1/2 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Main Layout */}
      <div className="flex flex-col md:flex-row gap-6">
        
      <div className='flex flex-col p-10 bg-gray-100 rounded-lg'>
        <div className="w-full md:w-1/4 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-3">Categories</h2>
          <ul className="space-y-3">
            {['Electronics', 'Accessories', 'Furniture', 'Footwear', 'Clothing', 'All'].map((category) => (
              <li key={category}>
                <button
                  onClick={() => filterBasedOnCategory(category)}
                  className="w-36 text-left px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition duration-200"
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full md:w-1/4 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-3">Filter Price</h2>
          <ul className="space-y-3">
            {['Above 100', 'Above 200','Above 500', 'Above 1000', 'Above 1500'].map((price) => (
              <li >
             
                <button
                  onClick={() => filterBasedOnPrice(price.split(' ')[1])}
                  className="w-36 text-left px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition duration-200"
                >
                  {price}
                </button>
              </li>
            ))}
          </ul>
        </div>
        </div>

        

        {/* Products Grid */}
        <div className="w-full md:w-3/4">
        <InfiniteScroll
           dataLength={products.length}
           next={fetchNextPage}
          
           hasMore={products.length<totalCount}
          loader={<h4>Loading...</h4>}
          
       >
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {products.map((product) => (
            <div key={product.productId}
              className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-gray-100">
              <img className="w-full h-48 object-contain" src={product.imageUrl} alt={product.title} />
              
              <div className="p-4 flex flex-col flex-grow">
                <Link to={`/products/${product.productId}`}>
                  <h3 className="text-lg font-semibold">{product.title}</h3>
                </Link>
                <p className="text-gray-600 text-sm flex-grow">{product.description}</p>

                <div className="mt-3 flex justify-between items-center">
                  <span className="bg-gray-800 text-white text-sm font-semibold px-3 py-1 rounded-full">
                    ${product.price}
                  </span>
                  <button
                    className="bg-yellow-600 text-white text-sm font-semibold px-3 py-1 rounded-full hover:bg-yellow-700"
                    onClick={() => addToCart(product.productId)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
          </div>
       </InfiniteScroll>
         
        </div>
        
      </div>
      

    
    </div>
  )
}

export default Home;
