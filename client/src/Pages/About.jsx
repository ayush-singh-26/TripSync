import React from "react";

function About() {
  return (
    <div className="p-6 bg-gray-100 text-gray-800">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">
        About Our Itinerary Planner
      </h1>
      <p className="text-lg text-gray-700 leading-relaxed">
        Welcome to our Itinerary Planner! Our mission is to make your travel planning
        effortless and enjoyable. Whether you're visiting the vibrant streets of Varanasi or
        exploring other destinations, our platform is designed to provide personalized and
        detailed travel plans tailored to your preferences.
      </p>
      <h2 className="text-2xl font-semibold text-blue-500 mt-6">Features</h2>
      <ul className="list-disc pl-6 text-gray-700 mt-3">
        <li>Comprehensive hotel options with pricing and ratings.</li>
        <li>Day-by-day itineraries including best places to visit.</li>
        <li>Interactive maps to explore nearby attractions.</li>
        <li>Recommendations for family-friendly activities and meals.</li>
      </ul>
      <h2 className="text-2xl font-semibold text-blue-500 mt-6">Why Choose Us?</h2>
      <p className="mt-3">
        Our platform is built with love and precision to provide you with accurate and
        up-to-date travel information. By focusing on user-friendly design and helpful
        features, we aim to make your travel experience stress-free and memorable.
      </p>
      <p className="mt-6 text-center">
        <span className="text-gray-500 italic">
          "Your journey begins here, let us guide you every step of the way."
        </span>
      </p>
    </div>
  );
}

export default About;
