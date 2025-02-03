import { Navigate, Outlet } from 'react-router-dom';
import React from 'react';

function ProtectedRoute(){
    const email = localStorage.getItem('email');
    return email ? <Outlet/> : <Navigate to ='/login'/>

}

export default ProtectedRoute;