import axios from 'axios';
import React, { useState } from 'react'

const ForgetPassword = () => {
  const [email,setEmail] = useState('');
  const [message,setMessage] = useState('');
   
  const submitHandler = (e) =>{
     e.preventDefault();
     
     try {
        axios.post('http://localhost:3000/forget-password',{email})
        .then((res)=>{
          //  console.log('status',res.status);
          //  console.log('msg',res.data.msg);
           
           if(res.status === 200 && res.data.msg === 'Password reset link send successfully on your gmail account'){
            setMessage('Password reset Link send successfully on your gmail account');
           }
        })
        
     } catch (error) {
       console.error(error);
       setMessage(error.res?.data?.msg || 'Something went wrong'); 
     }
  }


  return (
    <div className='flex justify-center items-center h-screen bg-gray-100'>

        <form onSubmit={submitHandler} className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
            <h1 className='text-2xl font-bold text-center mb-6'>Forget Password</h1>

            <label htmlFor='email'>Email</label>
            <input type="email"
            placeholder='Enter your email'
            id='email'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className='w-full p-3 mt-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
             />

            <button type='submit' className='w-full bg-gray-800 text-white py-3 rounded-lg mt-4 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-50'>Send Reset Link</button>
            {message && <p className='mt-4 text-center text-red-500'>{message}</p>}
        </form>
      
    </div>
  )
}

export default ForgetPassword
