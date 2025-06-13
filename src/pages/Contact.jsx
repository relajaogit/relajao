import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import translations from '../data/translations';

function Contact() {
  const { language } = useSettings();
  const t = translations[language];
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = t.contact.form.required;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = t.contact.form.required;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = t.contact.form.validEmail;
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = t.contact.form.required;
    }
    
    if (!formData.message.trim()) {
      newErrors.message = t.contact.form.required;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real application, this would be an API call to send the message
      // For demo purposes, we'll simulate a successful submission after a short delay
      setSubmitStatus('sending');
      
      setTimeout(() => {
        setSubmitStatus('success');
        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }, 1500);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page title */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{t.contact.title}</h1>
        <p className="text-xl text-gray-600">{t.contact.subtitle}</p>
      </div>
      
      {/* Contact content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Contact form */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                {t.contact.form.name}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-rose-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                {t.contact.form.email}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-rose-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                {t.contact.form.subject}
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={`w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-rose-500 ${
                  errors.subject ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                {t.contact.form.message}
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className={`w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-rose-500 ${
                  errors.message ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
            </div>
            
            <button
              type="submit"
              disabled={submitStatus === 'sending'}
              className={`w-full bg-rose-600 text-white font-medium py-2 px-4 rounded-md hover:bg-rose-700 transition-colors ${
                submitStatus === 'sending' ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {submitStatus === 'sending' ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t.contact.form.send}
                </span>
              ) : (
                t.contact.form.send
              )}
            </button>
            
            {submitStatus === 'success' && (
              <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md">
                {t.contact.form.success}
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
                {t.contact.form.error}
              </div>
            )}
          </form>
        </div>
        
        {/* Contact information */}
        <div className="bg-gray-50 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6">{t.contact.info.title}</h2>
          
          <div className="space-y-8">
            {/* Address */}
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-rose-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-gray-900">{t.contact.info.address.title}</h3>
                <address className="mt-2 not-italic text-gray-600">
                  <p>{t.contact.info.address.line1}</p>
                  <p>{t.contact.info.address.line2}</p>
                  <p>{t.contact.info.address.line3}</p>
                </address>
              </div>
            </div>
            
            {/* Phone */}
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-rose-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-gray-900">{t.contact.info.phone.title}</h3>
                <p className="mt-2 text-gray-600">
                  <a href="tel:+573123456789" className="hover:text-rose-600">
                    {t.contact.info.phone.number}
                  </a>
                </p>
              </div>
            </div>
            
            {/* Email */}
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-rose-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-gray-900">{t.contact.info.email.title}</h3>
                <p className="mt-2 text-gray-600">
                  <a href="mailto:info@relajao.com" className="hover:text-rose-600">
                    {t.contact.info.email.address}
                  </a>
                </p>
              </div>
            </div>
            
            {/* Hours */}
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-rose-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-gray-900">{t.contact.info.hours.title}</h3>
                <p className="mt-2 text-gray-600">{t.contact.info.hours.schedule}</p>
                <p className="text-gray-600">{t.contact.info.hours.weekend}</p>
              </div>
            </div>
          </div>
          
          {/* Map placeholder */}
          <div className="mt-8 bg-gray-200 rounded-lg h-64 flex items-center justify-center">
            <p className="text-gray-500">Interactive map would be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;