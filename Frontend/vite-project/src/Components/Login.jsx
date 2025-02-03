import React, { useState ,useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux'
import { loginHandler } from './Reducers/AuthSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const token = localStorage.getItem('token')
  // const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn)
  

  const navigate = useNavigate();

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };


  // useEffect(() => {
  //   console.log('isLoggedIn changed:', isLoggedIn);
  // }, [isLoggedIn])

  const submitHandler = (e) => {
    e.preventDefault();
  
    axios
      .post('http://localhost:3000/login', { email, password },
        {
          headers:{
          
            "Content-Type":"application/json"
          },
        }
      )
      .then((res) => {
        // console.log('status', res.status);
        console.log('res data', res.data);
        // console.log('token', res.data.token);
         
        if (res.status === 200 && res.data.msg === 'Login successful') {
          localStorage.setItem('email', email);
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('userId',res.data.userId);
          localStorage.setItem('role',res.data.role);
          // alert('Login Successful');
          
          dispatch(loginHandler());
          // console.log('isLoggedIn',isLoggedIn);

          navigate('/');
        } else {
          alert(res.data.msg || 'Login failed. Please try again');
        }
      })
      .catch((err) => {
        console.error(err);
        alert(err.response?.data?.msg || 'An error occurred. Please try again');
      });

    setEmail('');
    setPassword('');
  };

  

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={submitHandler}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={emailChangeHandler}
          className="w-full p-3 mt-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={passwordChangeHandler}
          className="w-full p-3 mt-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-3 rounded-lg mt-4 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Login
        </button>

        <Link to="/forget-password" className="text-blue-500 hover:underline block mt-4">
          Forget Password?
        </Link>

        <p className="mt-4">
          Don't have an account?{' '}
           <Link to="/signup" className="text-blue-500 hover:underline">
            Signup
          </Link> 
        </p>
      </form>
    </div>
  );
};

export default Login;
