import React from 'react';
import { useSettings } from '../context/SettingsContext';

function Terms() {
  const { language } = useSettings();
  const es = language === 'es';

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        {es ? 'Términos y Condiciones' : 'Terms and Conditions'}
      </h1>
      <p className="text-gray-600 mb-8">
        {es
          ? 'Última actualización: septiembre 2025'
          : 'Last updated: September 2025'}
      </p>

      <section className="space-y-6 text-gray-700">
        <p>
          {es
            ? 'Estos Términos y Condiciones regulan el uso del sitio web y los servicios de Relajao. Al usar el sitio, aceptas estas condiciones.'
            : 'These Terms and Conditions govern the use of the Relajao website and services. By using the site, you agree to these terms.'}
        </p>

        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            {es ? 'Uso del sitio' : 'Use of the Site'}
          </h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>{es ? 'Debes proporcionar información veraz y actualizada.' : 'You must provide accurate and up-to-date information.'}</li>
            <li>{es ? 'No uses el sitio para fines ilegales.' : 'Do not use the site for unlawful purposes.'}</li>
            <li>{es ? 'Nos reservamos el derecho de modificar o suspender el servicio.' : 'We reserve the right to modify or suspend the service.'}</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            {es ? 'Reservas y pagos' : 'Bookings and Payments'}
          </h2>
          <p>
            {es
              ? 'Las reservas y transacciones pueden gestionarse por canales externos (p. ej., WhatsApp). Las políticas de cancelación y reembolsos se comunicarán según cada caso.'
              : 'Bookings and transactions may be handled through external channels (e.g., WhatsApp). Cancellation and refund policies will be communicated as applicable.'}
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            {es ? 'Limitación de responsabilidad' : 'Limitation of Liability'}
          </h2>
          <p>
            {es
              ? 'Relajao no será responsable por daños indirectos derivados del uso del sitio o servicios.'
              : 'Relajao shall not be liable for indirect damages arising from the use of the site or services.'}
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            {es ? 'Contacto' : 'Contact'}
          </h2>
          <p>
            {es
              ? 'Para cualquier consulta sobre estos términos, contáctanos en aptosrelajao@gmail.com o vía WhatsApp desde la página de contacto.'
              : 'For any questions about these terms, contact us at aptosrelajao@gmail.com or via WhatsApp from the contact page.'}
          </p>
        </div>
      </section>
    </div>
  );
}

export default Terms;