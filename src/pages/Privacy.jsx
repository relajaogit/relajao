import React from 'react';
import { useSettings } from '../context/SettingsContext';

function Privacy() {
  const { language } = useSettings();
  const es = language === 'es';

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        {es ? 'Política de Privacidad' : 'Privacy Policy'}
      </h1>
      <p className="text-gray-600 mb-8">
        {es
          ? 'Última actualización: septiembre 2025'
          : 'Last updated: September 2025'}
      </p>

      <section className="space-y-6 text-gray-700">
        <p>
          {es
            ? 'En Relajao, valoramos tu privacidad y nos comprometemos a proteger tu información personal. Esta política explica qué datos recopilamos, cómo los usamos y tus derechos.'
            : 'At Relajao, we value your privacy and are committed to protecting your personal information. This policy explains what data we collect, how we use it, and your rights.'}
        </p>

        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            {es ? 'Datos que recopilamos' : 'Information We Collect'}
          </h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>{es ? 'Datos de contacto (nombre, email, teléfono).' : 'Contact details (name, email, phone).'}</li>
            <li>{es ? 'Información de reservas y preferencias.' : 'Booking information and preferences.'}</li>
            <li>{es ? 'Datos técnicos básicos (p. ej., cookies, IP) para mejorar la experiencia.' : 'Basic technical data (e.g., cookies, IP) to improve the experience.'}</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            {es ? 'Cómo usamos tus datos' : 'How We Use Your Information'}
          </h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>{es ? 'Para gestionar reservas y responder consultas.' : 'To manage bookings and respond to inquiries.'}</li>
            <li>{es ? 'Para mejorar nuestros servicios y la experiencia del usuario.' : 'To improve our services and user experience.'}</li>
            <li>{es ? 'Para fines legales y de seguridad cuando sea necesario.' : 'For legal and security purposes when necessary.'}</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            {es ? 'Tus derechos' : 'Your Rights'}
          </h2>
          <p>
            {es
              ? 'Puedes solicitar acceso, corrección o eliminación de tus datos personales. Para ejercer estos derechos, contáctanos a través de nuestro formulario o por WhatsApp.'
              : 'You may request access, correction, or deletion of your personal data. To exercise these rights, contact us via our form or WhatsApp.'}
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            {es ? 'Contacto' : 'Contact'}
          </h2>
          <p>
            {es
              ? 'Si tienes preguntas sobre esta política, escríbenos a aptosrelajao@gmail.com o contáctanos por WhatsApp desde la página de contacto.'
              : 'If you have questions about this policy, email us at aptosrelajao@gmail.com or reach us on WhatsApp from the contact page.'}
          </p>
        </div>
      </section>
    </div>
  );
}

export default Privacy;