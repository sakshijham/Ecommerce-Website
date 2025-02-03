import axios from 'axios';
import React, { useEffect, useState } from 'react'

const RoleAssignments = () => {
    const [users,setUsers] = useState([]);
    const [selectedUser,setSelectedUser] = useState("");
    const [selectedRole,setSelectedRole]=useState("user")
    const [message,setMessage] = useState('')
    
    const fetchUsers = async()=>{
        const res = await axios.get('http://localhost:3000/get-users');
        console.log(res.data);
        setUsers(res.data)

    }


    const AssignRole = async()=>{

      console.log('selectedUser',selectedUser)
       console.log('selectedRole',selectedRole);
      if (!selectedUser || !selectedRole) {
        setMessage("Please select a user and role.");
        return;
      }
  
     
      setMessage("");
  
      try {
        const response = await axios.put(`http://localhost:3000/assign-role/${selectedUser}`,
          
          { role: selectedRole },
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } } 
        );
  
        // setMessage(response.data.msg); 
      } catch (error) {
        console.error("Error assigning role:", error);
        setMessage("Failed to assign role. Please try again.");
      } 
    }

    useEffect(()=>{
        fetchUsers();
    },[])
  return (
    <div className='container mx-auto p-4 space-y-4 border mt-20 p-20 ml-90 max-w-sm'>
       
     
        <h1 className='text-3xl font-semibold text-gray-600'>Assign Roles</h1>
        <div className='flex flex-col gap-4'>

        <div>
        <label htmlFor="user" className='block text-lg font-medium  text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 '>Select User:</label>
        <select 
        name="user" 
        id="user"
        value={selectedUser}
        onChange={(e)=>setSelectedUser(e.target.value)}
        className='mt-2 block w-full px-4 py-2 bg-white border rounded-md w-64'>
            <option value="">-- Select User --</option>
            {
              users.map((user)=>{
                return <option key={user.id} value={user.id}>
                  {user.firstName} {user.lastName}
                </option>
              })
            }
        </select>
        </div>
        
        <div >
        <label htmlFor="role" className='block text-lg font-medium text-gray-600 shoadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 '>Select Role : </label>
        <select
        name='role'
        id="role"
        value={selectedRole}
        onChange={(e)=>setSelectedRole(e.target.value)}
        className='mt-2 block w-full px-4 py-2 bg-white border rounded-md w-64'
        >
        <option value="user">User</option>
        <option value="admin">Admin</option>
        </select>
        </div>


        <button
          className="mt-4 w-full py-2 px-4 bg-gray-600 text-white font-semibold rounded-md shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
         onClick={AssignRole}>Assign Role</button>
        </div>
    </div>
  )
}

export default RoleAssignments





















// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const RoleAssignment = () => {
//   const [users, setUsers] = useState([]); // List of users
//   const [selectedUser, setSelectedUser] = useState(""); // Selected user ID
//   const [selectedRole, setSelectedRole] = useState("user"); // Selected role
//   const [loading, setLoading] = useState(false); // Loading state
//   const [message, setMessage] = useState(""); // Feedback message

//   // Fetch all users
//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get("/api/users"); // Replace with your endpoint to get users
//       setUsers(response.data);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   // Assign role to the user
//   const assignRole = async () => {
//     if (!selectedUser || !selectedRole) {
//       setMessage("Please select a user and role.");
//       return;
//     }

//     setLoading(true);
//     setMessage("");

//     try {
//       const response = await axios.put(
//         `/assign-role/${selectedUser}`,
//         { role: selectedRole },
//         { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } } // Include token if needed
//       );

//       setMessage(response.data.msg); // Show success message
//     } catch (error) {
//       console.error("Error assigning role:", error);
//       setMessage("Failed to assign role. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch users on component mount
//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   return (
//     <div>
//       <h2>Assign Role</h2>
//       {/* User Dropdown */}
//       <label htmlFor="user">Select User:</label>
//       <select
//         id="user"
//         value={selectedUser}
//         onChange={(e) => setSelectedUser(e.target.value)}
//       >
//         <option value="">-- Select User --</option>
//         {users.map((user) => (
//           <option key={user.id} value={user.id}>
//             {user.firstName} {user.lastName} ({user.email})
//           </option>
//         ))}
//       </select>

//       {/* Role Dropdown */}
//       <label htmlFor="role">Select Role:</label>
//       <select
//         id="role"
//         value={selectedRole}
//         onChange={(e) => setSelectedRole(e.target.value)}
//       >
//         <option value="user">User</option>
//         <option value="admin">Admin</option>
//       </select>

//       {/* Submit Button */}
//       <button onClick={assignRole} disabled={loading}>
//         {loading ? "Assigning..." : "Assign Role"}
//       </button>

//       {/* Feedback Message */}
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default RoleAssignment;