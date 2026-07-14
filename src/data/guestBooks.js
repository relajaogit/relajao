// src/data/guestBooks.js

export const guestBooksData = {
  miravalle: {
    whatsapp: "573001234567",
    hostName: "Javier López",
    addressUrl: "https://maps.google.com/?q=Edificio+Miravalle+Popayan",
    
    // TEXTOS TRADUCIDOS
    es: {
      title: "Miravalle",
      address: "Barrio Modelo, Popayán",
      wifiSection: "Conexión Wi-Fi",
      wifiLabelNet: "Nombre de Red",
      wifiLabelPass: "Contraseña",
      hostSection: "Tu Anfitrión",
      hostSub: "Soporte y asistencia Relajao",
      hostBtn: "Contactar por WhatsApp",
      amenitiesSection: "Instrucciones del Alojamiento",
      amenitiesSub: "Toca cualquier elemento para ver el manual de uso.",
      amenityViewBtn: "Ver manual 📖",
      tipsSection: "Lugares Cercanos Recomendados",
      tipsBtn: "Ver en mapa →",
      modalTitle: "Manual de Uso",
      modalBtn: "Entendido, gracias",
      amenities: [
        {
          icon: "🚿",
          name: "Agua caliente",
          instructions: "El calentador es automático. Al abrir la llave de la ducha, gírala completamente hacia el lado izquierdo (rojo) y espera unos 15 segundos a que el flujo de agua caliente se regule por completo."
        },
        {
          icon: "📺",
          name: "Smart TV con Netflix",
          instructions: "Enciende el televisor con el control remoto negro. Ya encuentras una sesión activa de Netflix bajo el perfil 'Relajao'. Por favor, evita cerrar la sesión de la cuenta corporativa."
        }
      ],
      tips: [
        { name: "Restaurante Mora de Castilla", desc: "Excelente opción para probar empanadas de pipián tradicionales.", mapsUrl: "https://maps.google.com/?q=Mora+de+Castilla+Popayan" }
      ]
    },
    en: {
      title: "Miravalle",
      address: "Barrio Modelo, Popayan",
      wifiSection: "Wi-Fi Connection",
      wifiLabelNet: "Network Name",
      wifiLabelPass: "Password",
      hostSection: "Your Host",
      hostSub: "Relajao support and assistance",
      hostBtn: "Contact via WhatsApp",
      amenitiesSection: "Accommodation Instructions",
      amenitiesSub: "Tap any item to view its user manual.",
      amenityViewBtn: "View manual 📖",
      tipsSection: "Recommended Nearby Places",
      tipsBtn: "View on map →",
      modalTitle: "User Guide",
      modalBtn: "Got it, thanks",
      amenities: [
        {
          icon: "🚿",
          name: "Hot water",
          instructions: "The water heater is automatic. When turning on the shower, rotate the handle completely to the left (red) and wait about 15 seconds for the hot water flow to fully regulate."
        },
        {
          icon: "📺",
          name: "Smart TV with Netflix",
          instructions: "Turn on the TV using the black remote control. You will find an active Netflix session under the profile 'Relajao'. Please avoid logging out of the corporate account."
        }
      ],
      tips: [
        { name: "Mora de Castilla Restaurant", desc: "Excellent choice to try traditional local empanadas de pipián.", mapsUrl: "https://maps.google.com/?q=Mora+de+Castilla+Popayan" }
      ]
    }
  },
  lonova: {
    whatsapp: "573001234567",
    hostName: "Javier López",
    addressUrl: "https://maps.google.com/?q=Edificio+Lonova+Popayan",
    es: {
      title: "Edificio Lonova",
      address: "Barrio Caldas, Popayán",
      wifiSection: "Conexión Wi-Fi",
      wifiLabelNet: "Nombre de Red",
      wifiLabelPass: "Contraseña",
      hostSection: "Tu Anfitrión",
      hostSub: "Soporte y asistencia Relajao",
      hostBtn: "Contactar por WhatsApp",
      amenitiesSection: "Instrucciones del Alojamiento",
      amenitiesSub: "Toca cualquier elemento para ver el manual de uso.",
      amenityViewBtn: "Ver manual 📖",
      tipsSection: "Lugares Cercanos Recomendados",
      tipsBtn: "Ver en mapa →",
      modalTitle: "Manual de Uso",
      modalBtn: "Entendido, gracias",
      amenities: [
        {
          icon: "🚪",
          name: "Acceso inteligente",
          instructions: "Digita en el teclado de la puerta el código de 4 dígitos enviado a tu WhatsApp seguido de la tecla #. La puerta se asegurará sola automáticamente 5 segundos después de cerrarse."
        }
      ],
      tips: [
        { name: "Centro Comercial Campanario", desc: "Cajeros automáticos, supermercado y restaurantes cercanos.", mapsUrl: "https://maps.google.com/?q=Centro+Comercial+Campanario+Popayan" }
      ]
    },
    en: {
      title: "Lonova Building",
      address: "Barrio Caldas, Popayan",
      wifiSection: "Wi-Fi Connection",
      wifiLabelNet: "Network Name",
      wifiLabelPass: "Password",
      hostSection: "Your Host",
      hostSub: "Relajao support and assistance",
      hostBtn: "Contact via WhatsApp",
      amenitiesSection: "Accommodation Instructions",
      amenitiesSub: "Tap any item to view its user manual.",
      amenityViewBtn: "View manual 📖",
      tipsSection: "Recommended Nearby Places",
      tipsBtn: "View on map →",
      modalTitle: "User Guide",
      modalBtn: "Got it, thanks",
      amenities: [
        {
          icon: "🚪",
          name: "Smart Lock",
          instructions: "Enter the 4-digit code sent to your WhatsApp on the keypad followed by the # key. The door will automatically lock itself 5 seconds after closing."
        }
      ],
      tips: [
        { name: "Campanario Shopping Mall", desc: "ATMs, supermarket, and multiple dining choices nearby.", mapsUrl: "https://maps.google.com/?q=Centro+Comercial+Campanario+Popayan" }
      ]
    }
  }
};