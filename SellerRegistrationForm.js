import React, { useState } from 'react';
import './SellerRegistrationForm.css';  // Import the custom CSS file

const BusinessInfoForm = ({ formData, setFormData }) => (
  <div className="form-section">
    <label htmlFor="businessName">Business Name</label>
    <input
      type="text"
      id="businessName"
      value={formData.businessName}
      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
      placeholder="Enter your business name"
    />
    <label htmlFor="legalEntityType">Legal Entity Type</label>
    <select
      id="legalEntityType"
      value={formData.legalEntityType}
      onChange={(e) => setFormData({ ...formData, legalEntityType: e.target.value })}
    >
      <option value="Individual">Individual</option>
      <option value="LLC">LLC</option>
      <option value="Corporation">Corporation</option>
    </select>
  </div>
);

const ContactInfoForm = ({ formData, setFormData }) => (
  <div className="form-section">
    <label htmlFor="firstName">First Name</label>
    <input
      type="text"
      id="firstName"
      value={formData.firstName}
      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
      placeholder="Enter your first name"
    />
    <label htmlFor="lastName">Last Name</label>
    <input
      type="text"
      id="lastName"
      value={formData.lastName}
      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
      placeholder="Enter your last name"
    />
    <label htmlFor="email">Email</label>
    <input
      type="email"
      id="email"
      value={formData.email}
      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      placeholder="Enter your email"
    />
    <label htmlFor="phone">Phone</label>
    <input
      type="tel"
      id="phone"
      value={formData.phone}
      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
      placeholder="Enter your phone number"
    />
  </div>
);

const AddressForm = ({ formData, setFormData }) => (
  <div className="form-section">
    <label htmlFor="addressLine1">Address Line 1</label>
    <input
      type="text"
      id="addressLine1"
      value={formData.addressLine1}
      onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
      placeholder="Enter address line 1"
    />
    <label htmlFor="city">City</label>
    <input
      type="text"
      id="city"
      value={formData.city}
      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
      placeholder="Enter city"
    />
    <label htmlFor="state">State</label>
    <input
      type="text"
      id="state"
      value={formData.state}
      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
      placeholder="Enter state"
    />
    <label htmlFor="postalCode">Postal Code</label>
    <input
      type="text"
      id="postalCode"
      value={formData.postalCode}
      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
      placeholder="Enter postal code"
    />
  </div>
);

const BankInfoForm = ({ formData, setFormData }) => (
  <div className="form-section">
    <label htmlFor="bankName">Bank Name</label>
    <input
      type="text"
      id="bankName"
      value={formData.bankName}
      onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
      placeholder="Enter bank name"
    />
    <label htmlFor="accountNumber">Account Number</label>
    <input
      type="password"
      id="accountNumber"
      value={formData.accountNumber}
      onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
      placeholder="Enter account number"
    />
    <label htmlFor="routingNumber">Routing Number</label>
    <input
      type="text"
      id="routingNumber"
      value={formData.routingNumber}
      onChange={(e) => setFormData({ ...formData, routingNumber: e.target.value })}
      placeholder="Enter routing number"
    />
  </div>
);

const AgreementForm = ({ formData, setFormData }) => (
  <div className="form-section">
    <label htmlFor="agreementType">Agreement Type</label>
    <select
      id="agreementType"
      value={formData.agreementType}
      onChange={(e) => setFormData({ ...formData, agreementType: e.target.value })}
    >
      <option value="Terms of Service">Terms of Service</option>
      <option value="Fee Agreement">Fee Agreement</option>
    </select>
    <label>
      <input
        type="checkbox"
        checked={formData.acceptTerms}
        onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
      />
      I accept the terms and conditions
    </label>
  </div>
);

const SellerRegistrationForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: '',
    legalEntityType: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    addressLine1: '',
    city: '',
    state: '',
    postalCode: '',
    bankName: '',
    accountNumber: '',
    routingNumber: '',
    agreementType: '',
    acceptTerms: false,
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const renderForm = () => {
    switch (step) {
      case 1:
        return <BusinessInfoForm formData={formData} setFormData={setFormData} />;
      case 2:
        return <ContactInfoForm formData={formData} setFormData={setFormData} />;
      case 3:
        return <AddressForm formData={formData} setFormData={setFormData} />;
      case 4:
        return <BankInfoForm formData={formData} setFormData={setFormData} />;
      case 5:
        return <AgreementForm formData={formData} setFormData={setFormData} />;
      default:
        return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const progress = (step / 5) * 100;

  return (
    <div className="registration-container">
      <h1>Seller Registration - Step {step} of 5</h1>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}>
          {Math.round(progress)}%
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        {renderForm()}
        <div className="button-container">
          {step > 1 && (
            <button type="button" onClick={prevStep}>
              Previous
            </button>
          )}
          {step < 5 ? (
            <button type="button" onClick={nextStep}>
              Next
            </button>
          ) : (
            <button type="submit">
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SellerRegistrationForm;
