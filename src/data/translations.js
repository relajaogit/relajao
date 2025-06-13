// English and Spanish translations for the Relajao website
const translations = {
  en: {
    nav: {
      home: 'Home',
      properties: 'Properties',
      about: 'About Us',
      contact: 'Contact'
    },
    search: {
      placeholder: 'Search properties...',
      noResults: 'No properties found',
      filter: 'Filter',
      sort: 'Sort',
      clearFilters: 'Clear filters'
    },
    home: { 
      hero: {
        title: 'Discover Comfort in Colombia',
        subtitle: 'Stylish and comfortable vacation rentals in the most beautiful locations',
        cta: 'Find Your Stay'
      },
      featured: {
        title: 'Featured Properties',
        viewAll: 'View All Properties'
      },
      destinations: {
        title: 'Popular Destinations',
        medellin: 'Medellín',
        cartagena: 'Cartagena',
        santaMarta: 'Santa Marta',
        guatape: 'Guatapé'
      }
    },
    properties: {
      title: 'Our Properties',
      filter: {
        location: 'Location',
        price: 'Price',
        bedrooms: 'Bedrooms',
        amenities: 'Amenities'
      },
      sort: {
        priceLowToHigh: 'Price: Low to High',
        priceHighToLow: 'Price: High to Low',
        newest: 'Newest First'
      },
      viewDetails: 'View Details'
    },
    propertyDetail: {
      backToProperties: 'Back to Properties',
      guests: 'guests',
      bedrooms: 'bedrooms',
      bathrooms: 'bathrooms',
      aboutThisPlace: 'About this place',
      amenities: 'Amenities',
      location: 'Location',
      reviews: 'Reviews',
      perNight: '/ night',
      viewAllPhotos: 'View all photos'
    },
    bookingForm: {
      checkIn: 'Check-in date',
      checkOut: 'Check-out date',
      name: 'Your name',
      nameHelp: 'Enter your full name',
      guests: 'Number of guests',
      book: 'Book',
      bookViaWhatsApp: 'Book via WhatsApp',
      requiredField: 'This field is required',
      checkOutAfterCheckIn: 'Check-out date must be after check-in date',
      atLeastOneGuest: 'At least 1 guest is required',
      directBook: 'Book directly through WhatsApp for the best rate'
    },
    about: {
      title: 'About Relajao',
      subtitle: 'Comfort and Style in Colombia',
      ourStory: 'Our Story',
      ourStoryContent: 'Relajao was founded with a simple mission: to provide travelers with comfortable and stylish accommodations that feel like home while exploring the beautiful country of Colombia. What started as a single property in Medellín has now grown into a collection of carefully curated properties across Colombias most desirable destinations.',
      ourMission: 'Our Mission',
      ourMissionContent: 'Our mission is to create unforgettable experiences for our guests through exceptional hospitality and attention to detail. We believe that where you stay is just as important as where you go, and we strive to make every stay with Relajao special.',
      ourValues: 'Our Values',
      valueComfort: 'Comfort',
      valueComfortContent: 'We ensure every property provides the utmost comfort to make you feel at home.',
      valueQuality: 'Quality',
      valueQualityContent: 'From furnishings to service, we maintain high standards across all our properties.',
      valueAuthenticity: 'Authenticity',
      valueAuthenticityContent: 'We showcase the authentic culture and beauty of Colombia through our properties and experiences.',
      team: 'Meet Our Team',
      teamMember1: 'Carlos Rodriguez',
      teamMember1Role: 'Founder & CEO',
      teamMember2: 'Ana Martinez',
      teamMember2Role: 'Property Manager',
      teamMember3: 'Diego Lopez',
      teamMember3Role: 'Guest Relations'
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'Have questions? Were here to help!',
      form: {
        name: 'Your Name',
        email: 'Your Email',
        subject: 'Subject',
        message: 'Message',
        send: 'Send Message',
        success: 'Your message has been sent. Well get back to you soon',
        error: 'There was an error sending your message. Please try again.',
        required: 'Required',
        invalidEmail: 'Invalid email address'
      },
      info: {
        title: 'Contact Information',
        address: {
          title: 'Address',
          line1: 'Relajao',
          line2: 'Calle 10 #43E-31',
          line3: 'Medellín, Colombia'
        },
        phone: {
          title: 'Phone',
          number: '+57 312 345 6789'
        },
        email: {
          title: 'Email',
          address: 'info@relajao.co'
        },
        hours: {
          title: 'Hours',
          weekdays: 'Monday - Friday: 9am - 6pm',
          weekends: 'Saturday: 10am - 3pm'
        }
      }
    },
    settings: {
      language: 'Language',
      currency: 'Currency'
    },
    footer: {
      description: 'Providing comfortable and stylish stays across Colombia. Experience the perfect blend of comfort and luxury.',
      quickLinks: 'Quick Links',
      contact: 'Contact Us',
      copyright: '© 2023 Relajao. All rights reserved.'
    }
  },
  es: {
    nav: {
      home: 'Inicio',
      properties: 'Propiedades',
      about: 'Nosotros',
      contact: 'Contacto'
    },
    search: {
      placeholder: 'Buscar propiedades...',
      noResults: 'No se encontraron propiedades',
      filter: 'Filtrar',
      sort: 'Ordenar',
      clearFilters: 'Borrar filtros'
    },
    home: {
      hero: {
        title: 'Descubre Comodidad en Colombia',
        subtitle: 'Alquileres vacacionales con estilo y comodidad en las ubicaciones más hermosas',
        cta: 'Encuentra tu Estadía'
      },
      featured: {
        title: 'Propiedades Destacadas',
        viewAll: 'Ver Todas las Propiedades'
      },
      destinations: {
        title: 'Destinos Populares',
        medellin: 'Medellín',
        cartagena: 'Cartagena',
        santaMarta: 'Santa Marta',
        guatape: 'Guatapé'
      }
    },
    properties: {
      title: 'Nuestras Propiedades',
      filter: {
        location: 'Ubicación',
        price: 'Precio',
        bedrooms: 'Habitaciones',
        amenities: 'Comodidades'
      },
      sort: {
        priceLowToHigh: 'Precio: Bajo a Alto',
        priceHighToLow: 'Precio: Alto a Bajo',
        newest: 'Más Recientes'
      },
      viewDetails: 'Ver Detalles'
    },
    propertyDetail: {
      backToProperties: 'Volver a Propiedades',
      guests: 'huéspedes',
      bedrooms: 'habitaciones',
      bathrooms: 'baños',
      aboutThisPlace: 'Sobre este lugar',
      amenities: 'Comodidades',
      location: 'Ubicación',
      reviews: 'Reseñas',
      perNight: '/ noche',
      viewAllPhotos: 'Ver todas las fotos'
    },
    bookingForm: {
      checkIn: 'Fecha de llegada',
      checkOut: 'Fecha de salida',
      name: 'Tu nombre',
      nameHelp: 'Ingresa tu nombre completo',
      guests: 'Número de huéspedes',
      book: 'Reservar',
      bookViaWhatsApp: 'Reservar por WhatsApp',
      requiredField: 'Este campo es obligatorio',
      checkOutAfterCheckIn: 'La fecha de salida debe ser posterior a la fecha de llegada',
      atLeastOneGuest: 'Se requiere al menos 1 huésped',
      directBook: 'Reserva directamente por WhatsApp para obtener la mejor tarifa'
    },
    about: {
      title: 'Sobre Relajao',
      subtitle: 'Comodidad y Estilo en Colombia',
      ourStory: 'Nuestra Historia',
      ourStoryContent: 'Relajao fue fundada con una misión simple: proporcionar a los viajeros alojamientos cómodos y con estilo que se sientan como en casa mientras exploran el hermoso país de Colombia. Lo que comenzó como una sola propiedad en Medellín ahora se ha convertido en una colección de propiedades cuidadosamente seleccionadas en los destinos más deseables de Colombia.',
      ourMission: 'Nuestra Misión',
      ourMissionContent: 'Nuestra misión es crear experiencias inolvidables para nuestros huéspedes a través de una hospitalidad excepcional y atención al detalle. Creemos que donde te alojas es tan importante como a donde vas, y nos esforzamos por hacer que cada estadía con Relajao sea especial.',
      ourValues: 'Nuestros Valores',
      valueComfort: 'Comodidad',
      valueComfortContent: 'Nos aseguramos de que cada propiedad proporcione la máxima comodidad para que te sientas como en casa.',
      valueQuality: 'Calidad',
      valueQualityContent: 'Desde los muebles hasta el servicio, mantenemos altos estándares en todas nuestras propiedades.',
      valueAuthenticity: 'Autenticidad',
      valueAuthenticityContent: 'Mostramos la cultura auténtica y la belleza de Colombia a través de nuestras propiedades y experiencias.',
      team: 'Conoce a Nuestro Equipo',
      teamMember1: 'Carlos Rodríguez',
      teamMember1Role: 'Fundador y CEO',
      teamMember2: 'Ana Martínez',
      teamMember2Role: 'Administradora de Propiedades',
      teamMember3: 'Diego López',
      teamMember3Role: 'Relaciones con Huéspedes'
    },
    contact: {
      title: 'Contáctanos',
      subtitle: '¿Tienes preguntas? ¡Estamos aquí para ayudar!',
      form: {
        name: 'Tu Nombre',
        email: 'Tu Email',
        subject: 'Asunto',
        message: 'Mensaje',
        send: 'Enviar Mensaje',
        success: 'Tu mensaje ha sido enviado. ¡Nos pondremos en contacto contigo pronto!',
        error: 'Hubo un error al enviar tu mensaje. Por favor, intenta de nuevo.',
        required: 'Requerido',
        invalidEmail: 'Dirección de email inválida'
      },
      info: {
        title: 'Información de Contacto',
        address: {
          title: 'Dirección',
          line1: 'Relajao',
          line2: 'Calle 10 #43E-31',
          line3: 'Medellín, Colombia'
        },
        phone: {
          title: 'Teléfono',
          number: '+57 312 345 6789'
        },
        email: {
          title: 'Email',
          address: 'info@relajao.co'
        },
        hours: {
          title: 'Horario',
          weekdays: 'Lunes - Viernes: 9am - 6pm',
          weekends: 'Sábado: 10am - 3pm'
        }
      }
    },
    settings: {
      language: 'Idioma',
      currency: 'Moneda'
    },
    footer: {
      description: 'Ofreciendo estadías cómodas y con estilo por toda Colombia. Experimenta la perfecta combinación de comodidad y lujo.',
      quickLinks: 'Enlaces Rápidos',
      contact: 'Contáctanos',
      copyright: '© 2023 Relajao. Todos los derechos reservados.'
    }
  }
};

export default translations;