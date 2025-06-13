import React, { useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import translations from '../data/translations';
import { formatPrice } from '../utils/currencyUtils';

function BookingForm({ propertyName, propertyPrice }) {
  const { language, currency } = useSettings();
  const t = translations[language];
  
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    name: '',
    guests: 1
  });
  const [errors, setErrors] = useState({});
  
  // Get today's date in YYYY-MM-DD format for min date validation
  const today = new Date().toISOString().split('T')[0];
  
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
    
    if (!formData.checkIn) {
      newErrors.checkIn = t.bookingForm.requiredField;
    }
    
    if (!formData.checkOut) {
      newErrors.checkOut = t.bookingForm.requiredField;
    } else if (formData.checkIn && formData.checkOut && new Date(formData.checkOut) <= new Date(formData.checkIn)) {
      newErrors.checkOut = t.bookingForm.checkOutAfterCheckIn;
    }
    
    if (!formData.name.trim()) {
      newErrors.name = t.bookingForm.requiredField;
    }
    
    if (!formData.guests || formData.guests < 1) {
      newErrors.guests = t.bookingForm.atLeastOneGuest;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Determine locale based on language
      const locale = language === 'es' ? 'es-CO' : 'en-US';
      
      const checkInDate = new Date(formData.checkIn).toLocaleDateString(locale, {
        year: 'numeric', month: 'short', day: 'numeric'
      });
      
      const checkOutDate = new Date(formData.checkOut).toLocaleDateString(locale, {
        year: 'numeric', month: 'short', day: 'numeric'
      });
      
      // Calculate number of nights
      const nights = Math.ceil(
        (new Date(formData.checkOut) - new Date(formData.checkIn)) / (1000 * 60 * 60 * 24)
      );
      
      // Calculate total price
      const totalPrice = nights * propertyPrice;
      
      // Format prices for display
      const formattedNightPrice = formatPrice(propertyPrice, currency);
      const formattedTotalPrice = formatPrice(totalPrice, currency);
      
      // Format message for WhatsApp - translated based on selected language
      const messageHeader = language === 'es' ? 
        `¡Hola! Estoy interesado en reservar "${propertyName}".` : 
        `Hello! I'm interested in booking "${propertyName}".`;
      
      const messageDetails = language === 'es' ? 
        `\nDetalles de la reserva:\n- Llegada: ${checkInDate}\n- Salida: ${checkOutDate} (${nights} noches)\n- Nombre: ${formData.name}\n- Número de huéspedes: ${formData.guests}\n- Total: ${formattedTotalPrice} (${formattedNightPrice}/noche)` : 
        `\nBooking details:\n- Check-in: ${checkInDate}\n- Check-out: ${checkOutDate} (${nights} nights)\n- Name: ${formData.name}\n- Number of guests: ${formData.guests}\n- Total: ${formattedTotalPrice} (${formattedNightPrice}/night)`;
      
      const messageClose = language === 'es' ? 
        `\n\n¿Podría confirmar la disponibilidad, por favor?` : 
        `\n\nCould you please confirm availability?`;
      
      const message = messageHeader + messageDetails + messageClose;
      
      // Encode the message for the URL
      const encodedMessage = encodeURIComponent(message);
      
      // Open WhatsApp with the message
      window.open(`https://wa.me/+573123456789?text=${encodedMessage}`, '_blank');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700 mb-1">
          {t.bookingForm.checkIn}
        </label>
        <input
          type="date"
          id="checkIn"
          name="checkIn"
          min={today}
          value={formData.checkIn}
          onChange={handleChange}
          className={`w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-rose-500 ${
            errors.checkIn ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.checkIn && <p className="text-red-500 text-xs mt-1">{errors.checkIn}</p>}
      </div>
      
      <div>
        <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700 mb-1">
          {t.bookingForm.checkOut}
        </label>
        <input
          type="date"
          id="checkOut"
          name="checkOut"
          min={formData.checkIn || today}
          value={formData.checkOut}
          onChange={handleChange}
          className={`w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-rose-500 ${
            errors.checkOut ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.checkOut && <p className="text-red-500 text-xs mt-1">{errors.checkOut}</p>}
      </div>
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          {t.bookingForm.name}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder={t.bookingForm.nameHelp}
          className={`w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-rose-500 ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>
      
      <div>
        <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
          {t.bookingForm.guests}
        </label>
        <input
          type="number"
          id="guests"
          name="guests"
          min="1"
          value={formData.guests}
          onChange={handleChange}
          className={`w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-rose-500 ${
            errors.guests ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.guests && <p className="text-red-500 text-xs mt-1">{errors.guests}</p>}
      </div>
      
      <button
        type="submit"
        className="mt-4 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors w-full"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
          <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
        </svg>
        {t.bookingForm.bookViaWhatsApp}
      </button>
    </form>
  );
}

export default BookingForm;