'use client';
import React from 'react';
import Footer from '@/components/Footer';


export default function AboutPage() {
  return (

    <>
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-[#f5f5f5]  shadow-2xl text-gray-700  py-10">
        <div className="max-w-screen-xl mx-auto text-center">
          <h1 className="text-4xl font-bold">About ExploreIND</h1>
          <p className="mt-3 text-lg">
            Discover the beauty, culture, and history of India like never before.
          </p>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto py-12 px-6">
        {/* Our Mission Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-sky-800">Our Mission</h2>
          <p className="mt-4 text-lg leading-relaxed">
            At <span className="font-semibold">ExploreIND</span>, our mission is to make every traveler’s dream come true by offering easy access to the most stunning destinations, cozy stays, and authentic experiences across India. 
            We aim to connect people with places, experiences, and cultures that truly define India.
          </p>
        </section>

        {/* Why Choose Us Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-sky-800">Why Choose ExploreIND?</h2>
          <ul className="mt-4 space-y-4 text-lg">
            <li className="flex items-start gap-4">
              <span className="text-blue-500 text-2xl font-bold">✔</span>
              <p>
                <strong>Authentic Experiences:</strong> We handpick destinations and stays that provide you with an immersive experience.
              </p>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-blue-500 text-2xl font-bold">✔</span>
              <p>
                <strong>Easy Explore Process:</strong> Our platform is designed to make travel planning effortless and enjoyable.
              </p>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-blue-500 text-2xl font-bold">✔</span>
              <p>
                <strong>Sustainability Focus:</strong> We promote eco-friendly travel options to preserve the beauty of India for generations to come.
              </p>
            </li>
          </ul>
        </section>

        {/* Our Story Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-sky-800">Our Story</h2>
          <p className="mt-4 text-lg leading-relaxed">
            ExploreIND was born from a deep passion for travel and a love for India’s rich culture, history, and natural beauty. Our team, made up of avid travelers and local experts, wanted to create a platform that showcases the diversity and wonders of India while making travel seamless for everyone.
          </p>
        </section>

         {/* Developer Section */}
         <section className="mb-12">
          <h2 className="text-3xl font-bold text-sky-800">Meet the Developer</h2>
          <p className="mt-4 text-lg leading-relaxed">
            Hi, I’m <span className="font-semibold">Pradip Vasan</span>, the developer behind ExploreIND. As a passionate web developer, I created this platform to combine my love for technology with my admiration for India’s incredible heritage. My goal is to make travel planning easy, enjoyable, and accessible for everyone.
          </p>
          <p className="mt-4 text-lg leading-relaxed">
            With years of experience in web development, I’m dedicated to building user-friendly and innovative solutions that help people connect with what they love. Thank you for choosing ExploreIND for your travel adventures!
          </p>
        </section>

        {/* Call to Action Section */}
        <section className="bg-[#f5f5f5] text-sky-800 py-10 rounded-lg shadow-2xl text-center">
          <h2 className="text-3xl font-bold">Start Your Journey with ExploreIND</h2>
          <p className="mt-3 text-lg">
            Whether you're a solo traveler, a family on vacation, or an adventure seeker, we’re here to make your trip unforgettable.
          </p>
          <div className="mt-6">
            <a
              href="/"
              className="bg-white border border-sky-800 text-sky-800 font-semibold px-8 py-3 rounded-full hover:bg-gray-200 transition"
            >
              Explore Destinations /
            </a>
          </div>
        </section>
      </main>

      
      
    </div>

    <Footer />
    
    </>
  );
}
