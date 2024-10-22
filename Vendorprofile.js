import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Vendorprofile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const vendorData = location.state?.vendorData || {}; // Retrieve the data passed from the form submission

  // Function to navigate to the product creation page
  const handleAddProduct = () => {
    navigate('/addproductform', { state: { email: vendorData.email } }); // Assuming vendorData has an id field
  };

  // Function to navigate to the product list page
  const handleViewProducts = () => {
    navigate('/view-products', { state: { email: vendorData.email } }); // Assuming vendorData has an id field
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto mt-12 p-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Vendor Profile</h1>

        <div className="bg-gray-800 shadow-lg rounded-lg p-8">
          {/* Header section with vendor name, Add Product, and View Products buttons */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-semibold">{vendorData.displayName || 'Vendor Name'}</h2>
            <div className="flex space-x-4">
              {/* Add Product button */}
              <button
                onClick={handleAddProduct}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-2 px-6 rounded-full shadow hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 ease-in-out"
              >
                Add Product
              </button>

              {/* View Products button */}
              <button
                onClick={handleViewProducts}
                className="bg-gradient-to-r from-green-500 to-teal-600 text-white font-bold py-2 px-6 rounded-full shadow hover:from-green-600 hover:to-teal-700 transition-all duration-300 ease-in-out"
              >
                View Products
              </button>
            </div>
          </div>

          {/* Vendor details section in a card layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-700 p-6 shadow-md rounded-lg">
              <p className="text-lg font-semibold">Legal Business Name:</p>
              <p className="text-gray-300">{vendorData.legalBusinessName || 'N/A'}</p>
            </div>
            <div className="bg-gray-700 p-6 shadow-md rounded-lg">
              <p className="text-lg font-semibold">Contact Name:</p>
              <p className="text-gray-300">{vendorData.contactFirstName} {vendorData.contactLastName}</p>
            </div>
            <div className="bg-gray-700 p-6 shadow-md rounded-lg">
              <p className="text-lg font-semibold">Email:</p>
              <p className="text-gray-300">{vendorData.email || 'N/A'}</p>
            </div>
            <div className="bg-gray-700 p-6 shadow-md rounded-lg">
              <p className="text-lg font-semibold">Phone:</p>
              <p className="text-gray-300">{vendorData.phone || 'N/A'}</p>
            </div>
            <div className="bg-gray-700 p-6 shadow-md rounded-lg">
              <p className="text-lg font-semibold">Address:</p>
              <p className="text-gray-300">
                {vendorData.streetAddress}, {vendorData.city}, {vendorData.state} - {vendorData.zipCode}, {vendorData.country}
              </p>
            </div>
            <div className="bg-gray-700 p-6 shadow-md rounded-lg">
              <p className="text-lg font-semibold">Website:</p>
              <a
                href={vendorData.website || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                {vendorData.website || 'N/A'}
              </a>
            </div>
            <div className="bg-gray-700 p-6 shadow-md rounded-lg">
              <p className="text-lg font-semibold">Business Type:</p>
              <p className="text-gray-300">{vendorData.businessType || 'N/A'}</p>
            </div>

            {vendorData.taxId && (
              <div className="bg-gray-700 p-6 shadow-md rounded-lg">
                <p className="text-lg font-semibold">Tax ID:</p>
                <p className="text-gray-300">{vendorData.taxId}</p>
              </div>
            )}
            {vendorData.vatNumber && (
              <div className="bg-gray-700 p-6 shadow-md rounded-lg">
                <p className="text-lg font-semibold">VAT Number:</p>
                <p className="text-gray-300">{vendorData.vatNumber}</p>
              </div>
            )}

            {/* Additional vendor details */}
            <div className="bg-gray-700 p-6 shadow-md rounded-lg">
              <p className="text-lg font-semibold">Bank Account Number:</p>
              <p className="text-gray-300">{vendorData.bankAccountNumber || 'N/A'}</p>
            </div>
            <div className="bg-gray-700 p-6 shadow-md rounded-lg">
              <p className="text-lg font-semibold">Bank Routing Number:</p>
              <p className="text-gray-300">{vendorData.bankRoutingNumber || 'N/A'}</p>
            </div>
            <div className="bg-gray-700 p-6 shadow-md rounded-lg">
              <p className="text-lg font-semibold">Product Categories:</p>
              <p className="text-gray-300">{vendorData.productCategories?.join(', ') || 'N/A'}</p>
            </div>
            <div className="bg-gray-700 p-6 shadow-md rounded-lg">
              <p className="text-lg font-semibold">Brand Names:</p>
              <p className="text-gray-300">{vendorData.brandNames || 'N/A'}</p>
            </div>
            <div className="bg-gray-700 p-6 shadow-md rounded-lg">
              <p className="text-lg font-semibold">UPC Codes:</p>
              <p className="text-gray-300">{vendorData.upcCodes || 'N/A'}</p>
            </div>
            <div className="bg-gray-700 p-6 shadow-md rounded-lg">
              <p className="text-lg font-semibold">Shipping Methods:</p>
              <p className="text-gray-300">{vendorData.shippingMethods?.join(', ') || 'N/A'}</p>
            </div>
            <div className="bg-gray-700 p-6 shadow-md rounded-lg">
              <p className="text-lg font-semibold">Return Policy:</p>
              <p className="text-gray-300">{vendorData.returnPolicy || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vendorprofile;



