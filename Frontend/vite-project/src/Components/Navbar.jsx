import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaShoppingCart, FaUser } from "react-icons/fa";
import { addToCart, resetCart } from "./Reducers/CartSlice";
import axios from "axios";

const Navbar = () => {
  const email = localStorage.getItem("email");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cart);
  const role = localStorage.getItem("role");
  const [menuOpen, setMenuOpen] = useState(false);
  // const [loading, setLoading] = useState(true); 
  const token = localStorage.getItem("token");
  


  const fetchCartItems = async () => {
    try {
      let userId = localStorage.getItem("userId");
      const res = await axios.get(
        `http://localhost:3000/get-cart-items/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data && res.data.length > 0) {
        dispatch(resetCart());
        res.data.forEach((item) => {
          dispatch(
            addToCart({
              cartId: item.cartId,
              title: item.product.title,
              image: item.product.imageUrl,
              price: item.product.price,
              quantity: item.quantity,
            })
          );
        });
      }
    } catch (error) {
      console.error("Error fetching cart items", error);
    } 
    // finally {
    //   setLoading(false); 
    // }
  };

  useEffect(() => {
    fetchCartItems();
  }, [cartItems.length]);

  const logoutHandler = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <div className="bg-gray-800 text-white p-4">
      <nav className="flex items-center justify-between container mx-auto">
        <div className="flex items-center">
          <div className="text-2xl font-bold mr-20">
            <Link>LOGO</Link>
          </div>
          <div className="hidden md:flex space-x-8">
            {email && <Link to="/" className="hover:text-gray-400">Home</Link>}
            {email && <Link to="/orders" className="hover:text-gray-400">Your Orders</Link>}
            {(role === "admin" || role === "superadmin") && email && (
              <Link to="/productforadmin">Dashboard</Link>
            )}
            {role === "superadmin" && email && <Link to="/role-assign">Assign Role</Link>}
          </div>
        </div>

        <div className="flex space-x-4 items-center">
          {email ? (
            <Link to="/login" onClick={logoutHandler}>
              Logout
            </Link>
          ) : (
            <Link to="/login" className="hover:text-gray-400">
              <FaUser />
            </Link>
          )}

          <Link to="/cart-page">
            {email && (
              <div className="relative">
                <FaShoppingCart />
                {  cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </div>
            )}
          </Link>
        </div>

        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
            <FaBars />
          </button>
        </div>

        {email && (
          <div className={`md:hidden ${menuOpen ? "block" : "hidden"} bg-gray-800 p-4`}>
            <Link to="/" className="block text-white py-2 hover:text-gray-400">
              Home
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
