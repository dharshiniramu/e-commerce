import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VendorRegistrationForm = () => {
 const [formData, setFormData] = useState({
 legalBusinessName: '',
 displayName: '',
 contactFirstName: '',
 contactLastName: '',
 email: '',
 phone: '',
 streetAddress: '',
 city: '',
 state: '',
 zipCode: '',
 country: '',
 website: '',
 businessType: '',
 taxId: '',
 vatNumber: '',
 bankAccountNumber: '',
 bankRoutingNumber: '',
 productCategories: [],
 brandNames: '',
 upcCodes: '',
 shippingMethods: [],
 returnPolicy: '',
 agreeToTerms: false,
 ssn: '',
 dateOfBirth: '',
 llcFormationDate: '',
 llcMemberNames: '',
 incorporationDate: '',
 stateOfIncorporation: '',
 boardMembers: '',
 stockInformation: '',
 partnershipType: '',
 partnerNames: '',
 partnershipAgreement: null,
 });
 const [submitStatus, setSubmitStatus] = useState(null);
 const navigate = useNavigate();
 const [step, setStep] = useState(1);

 const handleChange = (e) => {
 const { name, value, type, checked, files } = e.target;
 setFormData((prevData) => ({
 ...prevData,
 [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
 }));
 };

 const handleSelectChange = (name, value) => {
 setFormData((prevData) => ({
 ...prevData,
 [name]: value,
 }));
 };

 const handleMultiSelectChange = (e, name) => {
 setFormData((prevData) => ({
 ...prevData,
 [name]: Array.from(e.target.selectedOptions, (option) => option.value),
 }));
 };

 const handleSubmit = async (e) => {
 e.preventDefault();

 try {
 await axios.post('http://localhost:5000/api/vendors/register', formData);
 setSubmitStatus('success');
 // Navigate to the profile page with the vendor data
 navigate('/vendorprofile', { state: { vendorData: formData } });
 } catch (error) {
 console.error('There was an error submitting the form:', error);
 setSubmitStatus('error');
 }
 };

 const nextStep = () => setStep((prev) => prev + 1);
 const prevStep = () => setStep((prev) => prev - 1);

 const renderBusinessSpecificFields = () => {
 switch(formData.businessType) {
 case 'individual':
 return (
 <>
 <div className="mb-4">
 <label htmlFor="ssn" className="block text-sm font-medium text-gray-700">Aadhaar Number</label>
 <input id="ssn" name="ssn" value={formData.ssn} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded w-full" />
 </div>
 <div className="mb-4">
 <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
 <input id="dateOfBirth" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded w-full" />
 </div>
 </>
 );
 case 'llc':
 return (
 <>
 <div className="mb-4">
 <label htmlFor="llcFormationDate" className="block text-sm font-medium text-gray-700">LLC Formation Date</label>
 <input id="llcFormationDate" name="llcFormationDate" type="date" value={formData.llcFormationDate} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded w-full" />
 </div>
 <div className="mb-4">
 <label htmlFor="llcMemberNames" className="block text-sm font-medium text-gray-700">LLC Member Names</label>
 <textarea id="llcMemberNames" name="llcMemberNames" value={formData.llcMemberNames} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded w-full" />
 </div>
 </>
 );
 case 'corporation':
 return (
 <>
 <div className="mb-4">
 <label htmlFor="incorporationDate" className="block text-sm font-medium text-gray-700">Incorporation Date</label>
 <input id="incorporationDate" name="incorporationDate" type="date" value={formData.incorporationDate} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded w-full" />
 </div>
 <div className="mb-4">
 <label htmlFor="stateOfIncorporation" className="block text-sm font-medium text-gray-700">State of Incorporation</label>
 <input id="stateOfIncorporation" name="stateOfIncorporation" value={formData.stateOfIncorporation} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded w-full" />
 </div>
 <div className="mb-4">
 <label htmlFor="boardMembers" className="block text-sm font-medium text-gray-700">Board Members</label>
 <textarea id="boardMembers" name="boardMembers" value={formData.boardMembers} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded w-full" />
 </div>
 <div className="mb-4">
 <label htmlFor="stockInformation" className="block text-sm font-medium text-gray-700">Stock Information</label>
 <textarea id="stockInformation" name="stockInformation" value={formData.stockInformation} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded w-full" />
 </div>
 </>
 );
 case 'partnership':
 return (
 <>
 <div className="mb-4">
 <label htmlFor="partnershipType" className="block text-sm font-medium text-gray-700">Partnership Type</label>
 <select name="partnershipType" onChange={(e) => handleSelectChange('partnershipType', e.target.value)} required className="mt-1 p-2 border border-gray-300 rounded w-full">
 <option value="">Select partnership type</option>
 <option value="general">General Partnership</option>
 <option value="limited">Limited Partnership</option>
 <option value="llp">Limited Liability Partnership (LLP)</option>
 </select>
 </div>
 <div className="mb-4">
 <label htmlFor="partnerNames" className="block text-sm font-medium text-gray-700">Partner Names</label>
 <textarea id="partnerNames" name="partnerNames" value={formData.partnerNames} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded w-full" />
 </div>
 <div className="mb-4">
 <label htmlFor="partnershipAgreement" className="block text-sm font-medium text-gray-700">Partnership Agreement (PDF)</label>
 <input id="partnershipAgreement" name="partnershipAgreement" type="file" accept=".pdf" onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded w-full" />
 </div>
 </>
 );
 default:
 return null;
 }
 };

 const renderStepContent = () => {
 switch(step) {
 case 1:
 return (
 <>
 <div className="mb-4">
 <label htmlFor="legalBusinessName" className="block text-sm font-medium text-gray-700">Legal Business Name</label>
 <input id="legalBusinessName" name="legalBusinessName" value={formData.legalBusinessName} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded w-full" />
 </div>
 <div className="mb-4">
 <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">Display Name</label>
 <input id="displayName" name="displayName" value={formData.displayName} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded w-full" />
 </div>
 <div className="mb-4">
 <label htmlFor="contactFirstName" className="block text-sm font-medium text-gray-700">Contact First Name</label>
 <input id="contactFirstName" name="contactFirstName" value={formData.contactFirstName} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded w-full" />
 </div>
 <div className="mb-4">
 <label htmlFor="contactLastName" className="block text-sm font-medium text-gray-700">Contact Last Name</label>
 <input id="contactLastName" name="contactLastName" value={formData.contactLastName} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded w-full" />
 </div>
 <div className="mb-4">
 <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
 <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded w-full" />
 </div>
 <div className="mb-4">
 <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
 <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded w-full" />
 </div>
 <div className="mb-4">
 <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700">Street Address</label>
 <input id="streetAddress" name="streetAddress" value={formData.streetAddress} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded w-full" />
 </div>
 <div className="mb-4">
 <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
 <input id="city" name="city" value={formData.city} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded w-full" />
 </div>
 <div className="mb-4">
 <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
 <input id="state" name="state" value={formData.state} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded w-full" />
 </div>
 <div className="mb-4">
 <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">Zip Code</label>
 <input id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded w-full" />
 </div>
 <div className="mb-4">
 <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
 <input id="country" name="country" value={formData.country} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded w-full" />
 </div>
 <div className="mb-4">
 <label htmlFor="website" className="block text-sm font-medium text-gray-700">Website</label>
 <input id="website" name="website" type="url" value={formData.website} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded w-full" />
 </div>
 </>
 );
 case 2:
 return (
 <>
 <div className="mb-4">
 <label htmlFor="businessType" className="block text-sm font-medium text-gray-700">Business Type</label>
 <select name="businessType" onChange={(e) => handleSelectChange('businessType', e.target.value)} required className="mt-1 p-2 border border-gray-300 rounded w-full">
 <option value="">Select business type</option>
 <option value="individual">Individual</option>
 <option value="llc">LLC</option>
 <option value="corporation">Corporation</option>
 <option value="partnership">Partnership</option>
 </select>
 </div>
 {renderBusinessSpecificFields()}
 <div className="mb-4">
 <label htmlFor="taxId" className="block text-sm font-medium text-gray-700">Tax ID</label>
 <input id="taxId" name="taxId" value={formData.taxId} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded w-full" />
 </div>
 <div className="mb-4">
 <label htmlFor="vatNumber" className="block text-sm font-medium text-gray-700">VAT Number</label>
 <input id="vatNumber" name="vatNumber" value={formData.vatNumber} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded w-full" />
 </div>
 <div className="mb-4">
 <label htmlFor="bankAccountNumber" className="block text-sm font-medium text-gray-700">Bank Account Number</label>
 <input id="bankAccountNumber" name="bankAccountNumber" value={formData.bankAccountNumber} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded w-full" />
 </div>
 <div className="mb-4">
 <label htmlFor="bankRoutingNumber" className="block text-sm font-medium text-gray-700">Bank Routing Number</label>
 <input id="bankRoutingNumber" name="bankRoutingNumber" value={formData.bankRoutingNumber} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded w-full" />
 </div>
 </>
 );
 case 3:
 return (
 <>
 <div className="mb-4">
 <label htmlFor="productCategories" className="block text-sm font-medium text-gray-700">Product Categories</label>
 <select multiple name="productCategories" value={formData.productCategories} onChange={(e) => handleMultiSelectChange(e, 'productCategories')} required className="mt-1 p-2 border border-gray-300 rounded w-full">
 <option value="electronics">Electronics</option>
 <option value="fashion">Fashion</option>
 <option value="homeGoods">Home Goods</option>
 <option value="beauty">Beauty</option>
 <option value="sports">Sports</option>
 </select>
 </div>
 <div className="mb-4">
 <label htmlFor="brandNames" className="block text-sm font-medium text-gray-700">Brand Names</label>
 <textarea id="brandNames" name="brandNames" value={formData.brandNames} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded w-full" />
 </div>
 <div className="mb-4">
 <label htmlFor="upcCodes" className="block text-sm font-medium text-gray-700">UPC Codes</label>
 <textarea id="upcCodes" name="upcCodes" value={formData.upcCodes} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded w-full" />
 </div>
 <div className="mb-4">
 <label htmlFor="shippingMethods" className="block text-sm font-medium text-gray-700">Shipping Methods</label>
 <select multiple name="shippingMethods" value={formData.shippingMethods} onChange={(e) => handleMultiSelectChange(e, 'shippingMethods')} required className="mt-1 p-2 border border-gray-300 rounded w-full">
 <option value="fedex">FedEx</option>
 <option value="ups">UPS</option>
 <option value="dhl">DHL</option>
 <option value="usps">USPS</option>
 </select>
 </div>
 <div className="mb-4">
 <label htmlFor="returnPolicy" className="block text-sm font-medium text-gray-700">Return Policy</label>
 <textarea id="returnPolicy" name="returnPolicy" value={formData.returnPolicy} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded w-full" />
 </div>
 <div className="mb-4">
 <label htmlFor="agreeToTerms" className="flex items-center">
 <input id="agreeToTerms" name="agreeToTerms" type="checkbox" checked={formData.agreeToTerms} onChange={handleChange} className="mr-2" required />
 I agree to the terms and conditions
 </label>
 </div>
 </>
 );
 default:
 return null;
 }
 };

 return (
 <div className="max-w-md mx-auto mt-10">
 <h1 className="text-2xl font-bold mb-5"><center>Vendor Registration</center></h1>
 <form onSubmit={handleSubmit}>
 {renderStepContent()}
 <div className="flex justify-between mt-6">
 {step > 1 && <button type="button" onClick={prevStep} className="bg-gray-300 text-gray-700 p-2 rounded">Previous</button>}
 {step < 3 ? (
 <button type="button" onClick={nextStep} className="bg-blue-500 text-white p-2 rounded">Next</button>
 ) : (
 <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
 )}
 </div>
 </form>
 {submitStatus && <div className={`mt-4 text-${submitStatus === 'success' ? 'green' : 'red'}-500`}>{submitStatus === 'success' ? 'Form submitted successfully!' : 'There was an error submitting the form.'}</div>}
 </div>
 );
};

export default VendorRegistrationForm;