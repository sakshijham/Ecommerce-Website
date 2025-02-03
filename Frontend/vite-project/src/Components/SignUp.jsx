import React, { useState ,useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName,setFirstName] = useState('');
  const [lastName,setLastName] = useState('');


  const navigate = useNavigate();

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const firstNameChangeHandler = (e) =>{
    setFirstName(e.target.value);
  }

  const lastNameChangeHandler = (e) =>{
    setLastName(e.target.value);
  }


    const submitHandler = (e) => {
    e.preventDefault();
  
    axios
      .post('http://localhost:3000/signup', {firstName,lastName, email, password })
      .then((res) => {
        // console.log('status', res.status);
        // console.log('msg', res.data.msg);
        // console.log('token', res.data.token);
         
        if (res.status === 201 && res.data.msg === 'User registered successfully') {
        
          alert('Signup Successful');
          
       

          navigate('/login');
        } else {
          alert(res.data.msg || 'Signup failed. Please try again');
        }
      })
      .catch((err) => {
        console.error(err);
        alert(err.response?.data?.msg || 'An error occurred. Please try again');
      });
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={submitHandler}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-center mb-6">SignUp</h1>
        <label htmlFor="fname">FirstName</label>
        <input
          id="fname"
          type="text"
          placeholder="First Name"
          name="fname"
          value={firstName}
          onChange={firstNameChangeHandler}
          className="w-full p-3 mt-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
         <label htmlFor="lname">Last Name</label>
        <input
          id="lname"
          type="text"
          placeholder="Last Name"
          name="lname"
          value={lastName}
          onChange={lastNameChangeHandler}
          className="w-full p-3 mt-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

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

        

        <p className="mt-4">
          Already have an account?{' '}
           <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link> 
        </p>
      </form>
    </div>
  );
};

export default Login;

