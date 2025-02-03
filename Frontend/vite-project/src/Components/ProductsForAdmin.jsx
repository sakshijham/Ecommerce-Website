import React, { useEffect, useState } from 'react';
import AddProducts from './AddProducts';
import axios from 'axios';
import { Pencil, Trash } from 'lucide-react'; // Importing icons
import { fetch } from './Fetch/fetch';

const ProductsForAdmin = () => {
  const token = localStorage.getItem('token');
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);

  const deleteProductHandler = (productId) => {
    axios
      .delete(`http://localhost:3000/delete-product/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        console.log(res.data);
        fetchProducts();
        fetch();
      })
      .catch((err) => console.log(err));
  };

  const updateProductHandler = async (product) => {
    setEditProduct(product);
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/get-products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <AddProducts product={editProduct} />
      <div className="container mx-auto px-4 py-8">
        {/* Table Layout */}
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2 font-semibold">Image</th>
              <th className="px-4 py-2 font-semibold">Title</th>
              <th className="px-4 py-2 font-semibold">Description</th>
              <th className="px-4 py-2 font-semibold">Price</th>
              <th className="px-4 py-2 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.productId} className="border-b">
                <td className="px-4 py-2">
                  <img
                    className="w-24 h-24 object-contain mx-auto"
                    src={product.imageUrl}
                    alt={product.title}
                  />
                </td>
                <td className="px-4 py-2">{product.title}</td>
                <td className="px-4 py-2 text-sm text-gray-600 line-clamp-3">
                  {product.description}
                </td>
                <td className="px-4 py-2">${product.price}</td>
                <td className="px-4 py-2 flex space-x-2">
                  <button
                    className="bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-full hover:bg-blue-800 flex items-center gap-1"
                    onClick={() => updateProductHandler(product)}
                  >
                    <Pencil size={16} /> 
                  </button>
                  <button
                    className="bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded-full hover:bg-red-800 flex items-center gap-1"
                    onClick={() => deleteProductHandler(product.productId)}
                  >
                    <Trash size={16} /> 
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsForAdmin;
