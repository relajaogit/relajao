import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { guestBooksData } from '../data/guestBooks';

export default function WelcomeBook() {
  const { id } = useParams();
  const apto = guestBooksData[id];
  
  // NUEVO ESTADO: Idioma seleccionado ('es' o 'en')
  const [idioma, setIdioma] = useState('es');
  
  const [copiado, setCopiado] = useState(false);
  const [selectedAmenity, setSelectedAmenity] = useState(null);

  if (!apto) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Guía no encontrada / Guide not found</h1>
        <a href="/" className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium shadow">Ir al inicio</a>
      </div>
    );
  }

  // Accedemos a los textos correspondientes al idioma seleccionado
  const t = apto[idioma];

  const copiarAlPortapapeles = (texto) => {
    navigator.clipboard.writeText(texto);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-16 antialiased relative">
      
      {/* BOTÓN FLOTANTE SELECCIÓN DE IDIOMA */}
      <div className="absolute top-4 right-4 z-40">
        <button
          onClick={() => setIdioma(idioma === 'es' ? 'en' : 'es')}
          className="bg-white/10 border border-white/20 text-white hover:bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
        >
          {idioma === 'es' ? '🇺🇸 English' : '🇨🇴 Español'}
        </button>
      </div>
      
      {/* ================= SECCIÓN 1: BIENVENIDA ================= */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-800 text-white px-6 pt-14 pb-8 text-center shadow-md rounded-b-[2rem]">
        <span className="text-[10px] uppercase tracking-widest font-bold bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full border border-indigo-500/30">
          {idioma === 'es' ? 'Guía Digital del Huésped' : 'Digital Guest Guide'}
        </span>
        <h1 className="text-3xl font-extrabold mt-4 tracking-tight">
          {idioma === 'es' ? '¡Bienvenido a' : 'Welcome to'} {t.title}!
        </h1>
        
        <div className="mt-3 flex flex-col items-center gap-2">
          <p className="text-sm text-slate-300">📍 {t.address}</p>
          {apto.addressUrl && (
            <a href={apto.addressUrl} target="_blank" rel="noopener noreferrer" className="mt-1 text-xs font-semibold bg-white/10 hover:bg-white/20 px-4 py-1.5 rounded-full border border-white/10 flex items-center gap-1 transition-all">
              🗺️ {idioma === 'es' ? 'Ver ubicación en Google Maps' : 'View location on Google Maps'}
            </a>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6 max-w-sm mx-auto bg-white/5 p-3 rounded-2xl border border-white/10 backdrop-blur-sm">
          <div className="text-center border-r border-white/10">
            <p className="text-xs text-slate-400 font-medium">📥 Check-In</p>
            <p className="text-sm font-bold mt-0.5">{apto.checkIn || '3:00 PM'}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-slate-400 font-medium">📤 Check-Out</p>
            <p className="text-sm font-bold mt-0.5">{apto.checkOut || '11:00 AM'}</p>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 mt-6 space-y-6">

        {/* ================= SECCIÓN 2: WI-FI ================= */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 relative">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-3">📶 {t.wifiSection}</h2>
          <div className="space-y-2.5 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{t.wifiLabelNet}</p>
              <p className="text-base font-mono font-medium text-slate-800">{apto.wifiName}</p>
            </div>
            <div className="border-t border-slate-200/60 pt-2.5 flex justify-between items-center">
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{t.wifiLabelPass}</p>
                <p className="text-base font-mono font-bold text-slate-800">{apto.wifiPass}</p>
              </div>
              <button onClick={() => copiarAlPortapapeles(apto.wifiPass)} className="bg-indigo-50 hover:bg-indigo-100 text-indigo-600 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors">
                📋 {idioma === 'es' ? 'Copiar' : 'Copy'}
              </button>
            </div>
          </div>
          {copiado && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-xs py-1 px-3 rounded-full font-medium shadow-md">
              {idioma === 'es' ? '¡Contraseña copiada! 👍' : 'Password copied! 👍'}
            </div>
          )}
        </div>

        {/* ================= SECCIÓN 3: CONTACTO ================= */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-3">👤 {t.hostSection}</h2>
          <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100 mb-3">
            <div>
              <p className="text-sm font-bold text-slate-800">{apto.hostName}</p>
              <p className="text-xs text-slate-400">{(t.hostSub)}</p>
            </div>
            <span className="text-2xl">🛎️</span>
          </div>
          <a href={`https://wa.me/${apto.whatsapp}?text=Hola,%20necesito%20ayuda%20en%20el%20apto%20${t.title}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-sm text-sm text-center transition-colors">
            💬 {t.hostBtn}
          </a>
        </div>

        {/* ================= SECCIÓN 4: AMENIDADES INTERACTIVAS ================= */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-1">
            ✨ {t.amenitiesSection}
          </h2>
          <p className="text-xs text-slate-400 mb-4">{t.amenitiesSub}</p>
          
          <div className="grid grid-cols-1 gap-2.5">
            {t.amenities && t.amenities.map((amenity, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedAmenity(amenity)}
                className="flex items-center justify-between text-left text-sm text-slate-700 bg-slate-50 hover:bg-indigo-50/50 p-3 rounded-xl border border-slate-100/80 active:scale-[0.99] transition-all group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg bg-white p-1.5 rounded-lg shadow-sm border border-slate-100">{amenity.icon}</span>
                  <span className="font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">{amenity.name}</span>
                </div>
                <span className="text-xs text-slate-400 group-hover:text-indigo-500 font-bold">{t.amenityViewBtn}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ================= SECCIÓN 5: LUGARES CERCANOS ================= */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-3">🗺️ {t.tipsSection}</h2>
          <div className="space-y-3.5">
            {t.tips.map((tip, idx) => (
              <div key={idx} className="border-l-2 border-indigo-500 pl-3.5 py-0.5 flex flex-col justify-between gap-1.5">
                <div>
                  <h3 className="font-bold text-sm text-slate-800">{tip.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{tip.desc}</p>
                </div>
                {tip.mapsUrl && (
                  <a href={tip.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs font-bold text-indigo-600 hover:text-indigo-800 w-fit gap-0.5">
                    📍 {t.tipsBtn}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ================= MODAL / POP-OUT FLOTANTE ================= */}
      {selectedAmenity && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 z-50">
          <div className="absolute inset-0" onClick={() => setSelectedAmenity(null)}></div>
          
          <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl relative z-10 max-h-[85vh] overflow-y-auto">
            <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-4 sm:hidden" onClick={() => setSelectedAmenity(null)}></div>
            
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <span className="text-3xl bg-slate-50 p-2 rounded-xl border border-slate-100">{selectedAmenity.icon}</span>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{t.modalTitle}</p>
                <h3 className="text-xl font-extrabold text-slate-900">{selectedAmenity.name}</h3>
              </div>
            </div>

            <div className="py-5">
              <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                {selectedAmenity.instructions}
              </p>
            </div>

            <button
              onClick={() => setSelectedAmenity(null)}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-center text-sm shadow-sm transition-colors"
            >
              {t.modalBtn}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}