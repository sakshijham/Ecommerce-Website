import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const ResetPassword = () => {
    const {token}  = useParams();
    const [password,setPassword] = useState('');
    const [message,setMessage] = useState('');

    const submitHandler = async(e) =>{
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:3000/reset-password/${token}`,{password})
            .then((res)=>{
                // console.log('status',res.status);
                // console.log('msg',res.data.msg);

                if(res.status === 200 && res.data.msg === 'Password reset successfully'){
                    setMessage('Password reset successfully');
                }

            })
          
        } catch (error) {
            console.error(error);
            setMessage(error.res?.data?.msg || 'Something went wrong'); 
        }
    }


  return (
    <div>
        <form onSubmit={submitHandler}>
             <h1>Reset Password</h1>
             <label htmlFor="password">New Password</label>
             <input type="password"
             id='password'
             placeholder='Enter your new password'
             value={password}
             onChange={(e)=>setPassword(e.target.value)}
             className='' />

             <button type='submit' className=''>Reset Password</button>
             {message && <p className=''>{message}</p>}
        </form>
      
    </div>
  )
}

export default ResetPassword
