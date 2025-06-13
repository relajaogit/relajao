import React from 'react';

function About() {
  // Set page title when component mounts
  React.useEffect(() => {
    document.title = "About Us | Relajao";
    
    // Reset title when component unmounts
    return () => {
      document.title = "Relajao - Comfortable & Stylish Stays in Colombia";
    };
  }, []);

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
          About <span className="text-rose-600">Relajao</span>
        </h1>
        <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
          Creating memorable stays and exceptional experiences across Colombia's most beautiful destinations.
        </p>
      </div>
      
      {/* Our Story Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
        <div className="rounded-lg overflow-hidden shadow-xl h-96">
          <img
            src="/assets/images/about-story.jpg"
            alt="Relajao founding story"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1565073624420-9b9f612d4b7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80";
            }}
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <div className="prose prose-lg text-gray-600">
            <p>
              Relajao was founded in 2018 by a group of travel enthusiasts who fell in love with Colombia's diverse landscapes, rich culture, and warm hospitality.
            </p>
            <p className="mt-4">
              What began as a small collection of personally renovated apartments in Medellín has grown into a curated portfolio of exceptional properties across Colombia's most sought-after destinations.
            </p>
            <p className="mt-4">
              The name "Relajao" comes from Colombian slang for "relaxed" or "take it easy" - perfectly capturing our approach to hospitality. We believe that travel should be stress-free, allowing our guests to fully immerse themselves in the beauty and culture of Colombia.
            </p>
          </div>
        </div>
      </div>
      
      {/* Our Mission Section */}
      <div className="bg-rose-50 rounded-xl p-8 md:p-12 mb-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-xl text-gray-600">
            To provide travelers with authentic, comfortable, and thoughtfully designed accommodations that serve as the perfect base for exploring Colombia's incredible destinations.
          </p>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="rounded-full bg-rose-100 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Comfort First</h3>
              <p className="text-gray-600">We ensure every property meets our high standards of comfort, cleanliness, and amenities.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="rounded-full bg-rose-100 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Local Experiences</h3>
              <p className="text-gray-600">We provide insider recommendations to help our guests experience Colombia like a local.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="rounded-full bg-rose-100 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Seamless Stays</h3>
              <p className="text-gray-600">We handle all the details so you can focus on enjoying your Colombian adventure.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Our Team Section */}
      <div className="mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our passionate team of hospitality experts is dedicated to making your stay unforgettable.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Team Member 1 */}
          <div className="text-center">
            <div className="mb-4 rounded-full overflow-hidden w-48 h-48 mx-auto">
              <img
                src="/assets/images/team-member-1.jpg"
                alt="Alejandro Gómez"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80";
                }}
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Alejandro Gómez</h3>
            <p className="text-rose-600 mb-2">Founder & CEO</p>
            <p className="text-gray-600">
              Born in Medellín with a passion for sharing Colombia's beauty with the world.
            </p>
          </div>
          
          {/* Team Member 2 */}
          <div className="text-center">
            <div className="mb-4 rounded-full overflow-hidden w-48 h-48 mx-auto">
              <img
                src="/assets/images/team-member-2.jpg"
                alt="Catalina Restrepo"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80";
                }}
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Catalina Restrepo</h3>
            <p className="text-rose-600 mb-2">Interior Designer</p>
            <p className="text-gray-600">
              Creates the unique aesthetic and comfort that defines each Relajao property.
            </p>
          </div>
          
          {/* Team Member 3 */}
          <div className="text-center">
            <div className="mb-4 rounded-full overflow-hidden w-48 h-48 mx-auto">
              <img
                src="/assets/images/team-member-3.jpg"
                alt="Mateo Torres"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80";
                }}
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Mateo Torres</h3>
            <p className="text-rose-600 mb-2">Guest Experience Manager</p>
            <p className="text-gray-600">
              Ensures every stay exceeds expectations with personalized service and attention.
            </p>
          </div>
        </div>
      </div>
      
      {/* Our Values Section */}
      <div className="bg-gray-50 rounded-xl p-10 mb-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            <div className="flex">
              <div className="mr-4 flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-md bg-rose-500 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Colombian Hospitality</h3>
                <p className="text-gray-600">
                  We embody the warmth, friendliness and generosity that Colombia is famous for, ensuring every guest feels welcomed and valued.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-4 flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-md bg-rose-500 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Trust & Security</h3>
                <p className="text-gray-600">
                  We prioritize the safety and security of our guests, ensuring peace of mind throughout every stay.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-4 flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-md bg-rose-500 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Honesty & Transparency</h3>
                <p className="text-gray-600">
                  Our listings accurately represent our properties, and we're always upfront about fees, amenities, and services.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-4 flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-md bg-rose-500 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Local Community Support</h3>
                <p className="text-gray-600">
                  We're committed to supporting local communities by employing local staff and partnering with local businesses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="bg-rose-600 text-white rounded-xl p-10 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to experience Colombia with Relajao?</h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Browse our collection of beautiful properties and start planning your Colombian adventure today.
        </p>
        <a 
          href="/properties" 
          className="inline-block bg-white text-rose-600 hover:bg-gray-100 px-8 py-4 rounded-full font-medium text-lg transition-colors"
        >
          View Our Properties
        </a>
      </div>
    </div>
  );
}

export default About;