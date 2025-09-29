import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import properties from '../data/properties';
import PropertyCard from '../components/PropertyCard';
import { useSettings } from '../context/SettingsContext';
import translations from '../data/translations';

function Home() {
  const { language } = useSettings();
  const t = translations[language];
  const [featuredProperties, setFeaturedProperties] = useState([]);

  // Standardized hero and about images under public/images/home (use absolute paths without "public")
  const heroUrl = '/images/home/hero.jpg';
  const abou1 = '/images/home/lonova.jpg';
  const abou2 = '/images/home/miravalle.jpg';
  const abou3 = '/images/home/living.webp';

  useEffect(() => {
    // Set page title
    document.title = t.seo.homeTitle;

    // Filter featured properties (support both featured and isFeatured flags)
    const featured = properties.filter(
      (property) => property.featured === true || property.isFeatured === true
    );

    // Fallback: if none featured, take first 4 available
    if (featured.length === 0) {
      setFeaturedProperties(properties.slice(0, 4));
    } else {
      setFeaturedProperties(featured);
    }

    return () => {
      document.title = 'Relajao - Comfortable & Stylish Stays in Colombia';
    };
  }, [language]);

  return (
    <><div className="scale-90 origin-top">
      {/* Hero Section */}
      <section
        className="relative h-[70vh] bg-cover bg-center flex items-center"
        style={{ backgroundImage: `url(${heroUrl})` }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-lg">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t.home.hero.title}
            </h1>
            <p className="text-xl text-white mb-8">
              {t.home.hero.subtitle}
            </p>
            <Link
              to="/properties"
              className="px-8 py-3 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-lg transition-colors duration-300"
            >
              {t.home.hero.exploreButton}
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">{t.home.featured.title}</h2>
            <Link to="/properties" className="text-rose-600 hover:text-rose-800 font-medium flex items-center">
              {t.home.featured.viewAll}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.home.about.title}</h2>
              <p className="text-lg text-gray-600 mb-8">{t.home.about.content}</p>
              <Link
                to="/about"
                className="px-6 py-3 border border-rose-600 text-rose-600 hover:bg-rose-600 hover:text-white font-semibold rounded-lg transition-colors duration-300"
              >
                {t.home.about.learnMore}
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src={abou1} alt="Colombian beach" className="rounded-lg h-64 w-full object-cover" />
              <img src={abou2} alt="Mountain view" className="rounded-lg h-64 w-full object-cover" />
              <img src={abou3} alt="City apartment" className="rounded-lg h-64 w-full object-cover" />
              <img src={heroUrl} alt="Coffee farm" className="rounded-lg h-64 w-full object-cover" />
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}

export default Home;