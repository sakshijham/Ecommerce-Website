import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import { Provider } from 'react-redux';
import { store } from './Components/Reducers/store';
import ForgetPassword from './Components/ForgetPassword';
import ResetPassword from './Components/ResetPassword';
import axios from 'axios';
import CartPage from './Components/CartPage';
import ProductDetail from './Components/ProductDetail';
// import CartPage from './Components/CartPage';
import PaymentSuccess from './Components/PaymentSuccess';
import OrderNow from './Components/OrderNow';
import Orders from './Components/Orders';
import ProductsForAdmin from './Components/ProductsForAdmin';
import RoleAssignments from './Components/RoleAssignments';
import ProtectedRoute from './Components/ProtectedRoute';


const App = () => {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem('token')
  // const email = localStorage.getItem('email');
  const role = localStorage.getItem('role');

  useEffect(() => {
    const fetch = async () => {
      try {

        const res = await axios.get('http://localhost:3000/get-products',
          {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            },
          }
        );
        console.log('Post', res.data);
        setProducts(res.data);

      } catch (error) {
        console.error('Error fetching products', error);
      }


    }
    fetch();
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>

          {/* unauthorized routes */}

        
                <Route path='/login' element={<Login/>} />
                <Route path='/signup' element={<SignUp/>} />
                <Route path='/forget-password' element={<ForgetPassword/>} />
                <Route path='/reset-password/:token' element={<ResetPassword />} />
             




          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            {/* {
            email && (
              <>
                     <Route path='/login' element={<Navigate to='/'/>} />
                     <Route path='/signup' element={<Navigate to='/'/>}/>
              </>
            )
          } */}

            {
              role === 'superadmin' && (
                <>
                  <Route path='/' element={<Home products={products} />} />

                  <Route path='/orders' element={<Orders products={products} />} />
                  <Route path='/about' element={<About/>} />
                  {/* <Route path='/forget-password' element={<ForgetPassword/>} /> */}
                  <Route path='/reset-password/:token' element={<ResetPassword />} />
                  <Route path='/cart-page' element={<CartPage />} />
                  <Route path='/products/:productId' element={<ProductDetail products={products} />} />
                  <Route path='/paymentsuccess/' element={<PaymentSuccess/>} />
                  <Route path='/order-now' element={<OrderNow />} />
                  <Route path='/productforadmin' element={<ProductsForAdmin />} />
                  <Route path='/role-assign' element={<RoleAssignments/>} />
                </>
              )



            }

            {
              role === 'admin' && (
                <>
                  <Route path='/' element={<Home products={products} />} />

                  <Route path='/orders' element={<Orders products={products} />} />
                  <Route path='/about' element={<About />} />
                  {/* <Route path='/forget-password' element={<ForgetPassword/>} /> */}
                  <Route path='/reset-password/:token' element={<ResetPassword />} />
                  <Route path='/cart-page' element={<CartPage />} />
                  <Route path='/products/:productId' element={<ProductDetail products={products} />} />
                  <Route path='/paymentsuccess/' element={<PaymentSuccess />} />
                  <Route path='/order-now' element={<OrderNow />} />
                  <Route path='/productforadmin' element={<ProductsForAdmin/>} />
                  <Route path='/role-assign' element={<Navigate to='/' />} />
                </>

              )
            }

            {
              role === 'user' && (
                <>
                  <Route path='/' element={<Home products={products} />} />

                  <Route path='/orders' element={<Orders products={products} />} />
                  <Route path='/about' element={<About />} />
                  {/* <Route path='/forget-password' element={<ForgetPassword />} /> */}
                  <Route path='/reset-password/:token' element={<ResetPassword />} />
                  <Route path='/cart-page' element={<CartPage />} />
                  <Route path='/products/:productId' element={<ProductDetail products={products} />} />
                  <Route path='/paymentsuccess/' element={<PaymentSuccess />} />
                  <Route path='/order-now' element={<OrderNow />} />
                  <Route path='/productforadmin' element={<Navigate to='/' />} />
                  <Route path='/role-assign' element={<Navigate to='/' />} />

                </>
              )
            }


          </Route>

        </Routes>

      </Router>
    </Provider>
  )
}

export default App

