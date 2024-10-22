import React, { useState } from 'react';
import axios from 'axios';

const AddProductForm = () => {
  const [product, setProduct] = useState({
    name: '',
    category: '',
    freshness: '',
    image: null,
    description: '',
    price: '',
    comment: ''
  });

  const [submitStatus, setSubmitStatus] = useState(null);
  const [preview, setPreview] = useState(null);  // For image preview

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      const file = e.target.files[0];
      setProduct(prevProduct => ({
        ...prevProduct,
        [name]: file
      }));

      if (file) {
        // Creating a Blob URL for previewing the image
        const blobUrl = URL.createObjectURL(file);
        setPreview(blobUrl);  // Set image preview
      }
    } else {
      setProduct(prevProduct => ({
        ...prevProduct,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('category', product.category);
    formData.append('freshness', product.freshness);
    formData.append('image', product.image);  // Blob (file) is sent here
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('comment', product.comment);

    try {
      await axios.post('http://localhost:5000/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSubmitStatus('success');
    } catch (error) {
      console.error('There was an error submitting the form:', error);
      setSubmitStatus('error');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Add Product</h1>
      
      {submitStatus === 'success' && <p className="text-green-600">Product added successfully!</p>}
      {submitStatus === 'error' && <p className="text-red-600">There was an error submitting the product.</p>}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <select
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select a category</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="food">Food</option>
          </select>
        </div>

        {/* Freshness */}
        <div>
          <span className="block text-sm font-medium text-gray-700">Product Freshness</span>
          <div className="mt-2 space-y-2">
            {['Brand New', 'Second Hand', 'Refurbished'].map((option) => (
              <div key={option} className="flex items-center">
                <input
                  id={option.toLowerCase().replace(' ', '_')}
                  name="freshness"
                  type="radio"
                  value={option.toLowerCase().replace(' ', '_')}
                  checked={product.freshness === option.toLowerCase().replace(' ', '_')}
                  onChange={handleChange}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                />
                <label htmlFor={option.toLowerCase().replace(' ', '_')} className="ml-3 block text-sm font-medium text-gray-700">
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Product Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            accept="image/*"
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
          {preview && <img src={preview} alt="Product Preview" className="mt-4" width="200" />}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            rows="3"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          ></textarea>
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Product Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        {/* Comment */}
        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Comment</label>
          <textarea
            id="comment"
            name="comment"
            value={product.comment}
            onChange={handleChange}
            rows="3"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          ></textarea>
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
