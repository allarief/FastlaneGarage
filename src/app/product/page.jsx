'use client';

import React, { useState } from 'react';
import { FaUserCog } from 'react-icons/fa'; // Pastikan Anda memiliki react-icons terinstal

const initialProducts = [
  { id: 1, name: 'Product 1', price: '$10', image: '/images/product1.jpg', description: 'This is a great product.', rating: 4 },
  { id: 2, name: 'Product 2', price: '$20', image: '/images/product2.jpg', description: 'This product is amazing.', rating: 5 },
  { id: 3, name: 'Product 3', price: '$30', image: '/images/product3.jpg', description: 'You will love this product.', rating: 3 },
  // Add more products as needed
];

const ProductPage = () => {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const [newProduct, setNewProduct] = useState({ name: '', price: '', image: '', description: '', rating: 0 });
  const [isDeveloper, setIsDeveloper] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginCredentials, setLoginCredentials] = useState({ username: '', password: '' });

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOption === 'price-asc') {
      return parseFloat(a.price.substring(1)) - parseFloat(b.price.substring(1));
    } else if (sortOption === 'price-desc') {
      return parseFloat(b.price.substring(1)) - parseFloat(a.price.substring(1));
    } else if (sortOption === 'rating') {
      return b.rating - a.rating;
    }
    return 0;
  });

  const handleAddProduct = () => {
    setProducts([...products, { ...newProduct, id: products.length + 1 }]);
    setNewProduct({ name: '', price: '', image: '', description: '', rating: 0 });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewProduct({ ...newProduct, image: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleLogin = () => {
    // Implement your login logic here
    if (loginCredentials.username === 'admin' && loginCredentials.password === 'fastlanegarage') {
      setIsLoggedIn(true);
      setIsDeveloper(true);
      setShowLoginModal(false);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsDeveloper(false);
  };

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginCredentials({ ...loginCredentials, [name]: value });
  };

  return (
    <div className="container mx-auto p-4 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold text-gray-800">Our Products</h1>
        <button onClick={() => setShowLoginModal(true)} className="text-gray-800">
          <FaUserCog className="h-6 w-6" />
        </button>
      </div>
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search products..."
          className="border p-2 rounded w-full max-w-xs"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <select
          className="border p-2 rounded ml-4"
          value={sortOption}
          onChange={e => setSortOption(e.target.value)}
        >
          <option value="default">Sort by</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {sortedProducts.map(product => (
          <div key={product.id} className="border p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 bg-white hover:bg-gray-100">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded" />
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">{product.name}</h2>
            <p className="text-lg text-gray-600 mb-2">{product.price}</p>
            <p className="text-gray-500 mb-4">{product.description}</p>
            <div className="flex items-center mb-4">
              {[...Array(5)].map((star, index) => (
                <svg
                  key={index}
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 ${index < product.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.392 2.46a1 1 0 00-.364 1.118l1.286 3.97c.3.921-.755 1.688-1.54 1.118l-3.392-2.46a1 1 0 00-1.175 0l-3.392 2.46c-.784.57-1.838-.197-1.54-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.34 9.397c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z" />
                </svg>
              ))}
            </div>
            <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-full hover:from-blue-600 hover:to-blue-800">Add to Cart</button>
          </div>
        ))}
      </div>
      {isDeveloper && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              className="border p-2 rounded"
              value={newProduct.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="price"
              placeholder="Product Price"
              className="border p-2 rounded"
              value={newProduct.price}
              onChange={handleInputChange}
            />
            <input
              type="file"
              name="image"
              className="border p-2 rounded"
              onChange={handleImageUpload}
            />
            <input
              type="text"
              name="description"
              placeholder="Product Description"
              className="border p-2 rounded"
              value={newProduct.description}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="rating"
              placeholder="Product Rating"
              className="border p-2 rounded"
              value={newProduct.rating}
              onChange={handleInputChange}
            />
            <button
              className="bg-gradient-to-r from-green-500 to-green-700 text-white px-4 py-2 rounded-full hover:from-green-600 hover:to-green-800"
              onClick={handleAddProduct}
            >
              Add Product
            </button>
          </div>
        </div>
      )}
      {showLoginModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Developer Login</h2>
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="border p-2 rounded mb-4 w-full"
              value={loginCredentials.username}
              onChange={handleLoginInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="border p-2 rounded mb-4 w-full"
              value={loginCredentials.password}
              onChange={handleLoginInputChange}
            />
            <div className="flex justify-end">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => setShowLoginModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductPage;
