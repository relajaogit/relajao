import React from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import translations from '../data/translations';

function About() {
  const { language } = useSettings();
  const t = translations[language] || translations.en;

  // Set page title with i18n
  React.useEffect(() => {
    document.title = t.seo?.aboutTitle || 'About Us | Relajao';
    return () => {
      document.title = t.seo?.homeTitle || 'Relajao - Comfortable & Stylish Stays in Colombia';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  const storyParagraphs = t.about?.story?.paragraphs || [t.about?.story?.content || ''];
  const missionCards = t.about?.mission?.cards || [
    { title: 'Comfort First', content: 'We ensure every property meets our high standards of comfort, cleanliness, and amenities.' },
    { title: 'Local Experiences', content: 'We provide insider recommendations to help our guests experience Colombia like a local.' },
    { title: 'Seamless Stays', content: 'We handle all the details so you can focus on enjoying your Colombian adventure.' },
  ];
  const team = t.about?.team;
  const valuesItems = t.about?.values?.items || [];

  // Helper to keep brand highlight in title
  const fullTitle = t.about?.title || 'About Relajao';
  const parts = fullTitle.split('Relajao');

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
          {parts[0]}
          <span className="text-rose-600">Relajao</span>
          {parts[1] || ''}
        </h1>
        <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
          {t.about?.tagline || t.about?.subtitle}
        </p>
      </div>
      
      {/* Our Story Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
        <div className="rounded-lg overflow-hidden shadow-xl h-96">
          <img
            src="/images/home/Relajo.jpg"
            alt={t.about?.images?.storyAlt || 'Relajao founding story'}
            />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.about?.story?.title}</h2>
          <div className="prose prose-lg text-gray-600">
            {storyParagraphs.map((p, idx) => (
              <p key={idx} className={idx > 0 ? 'mt-4' : ''}>{p}</p>
            ))}
          </div>
        </div>
      </div>
      
      {/* Our Mission Section */}
      <div className="bg-rose-50 rounded-xl p-8 md:p-12 mb-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.about?.mission?.title}</h2>
          <p className="text-xl text-gray-600">
            {t.about?.mission?.content}
          </p>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            {missionCards.map((card, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-md">
                <div className="rounded-full bg-rose-100 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  {/* Decorative icons keep as-is */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{card.title}</h3>
                <p className="text-gray-600">{card.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Our Team Section */}
     {/* <div className="mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{team?.title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {team?.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">/*
          {team?.members?.map((m, idx) => (
            <div className="text-center" key={idx}>
              <div className="mb-4 rounded-full overflow-hidden w-48 h-48 mx-auto">
                <img
                  src={`/assets/images/team-member-${idx + 1}.jpg`}
                  alt={m.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    const fallbacks = [
                      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
                      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
                      "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
                    ];
                    e.target.src = fallbacks[idx] || fallbacks[0];
                  }}
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{m.name}</h3>
              <p className="text-rose-600 mb-2">{m.role}</p>
              <p className="text-gray-600">
                {m.bio}
              </p>
            </div>
          ))}
        </div>
      </div>*/}
      
      {/* Our Values Section */}
      {/*<div className="bg-gray-50 rounded-xl p-10 mb-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">{t.about?.values?.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {valuesItems.map((v, idx) => (
              <div className="flex" key={idx}>
                <div className="mr-4 flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-md bg-rose-500 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {idx === 0 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z" />}
                    {idx === 1 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />}
                    {idx === 2 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />}
                    {idx === 3 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />}
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">{v.title}</h3>
                  <p className="text-gray-600">{v.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>/}
      
      {/* Call to Action */}
      <div className="bg-rose-600 text-white rounded-xl p-10 text-center">
        <h2 className="text-3xl font-bold mb-4">{t.about?.cta?.title}</h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          {t.about?.cta?.subtitle}
        </p>
        <Link
          to="/properties"
          className="inline-block bg-white text-rose-600 hover:bg-gray-100 px-8 py-4 rounded-full font-medium text-lg transition-colors"
        >
          {t.about?.cta?.button}
        </Link>
      </div>
    </div>
  );
}

export default About;