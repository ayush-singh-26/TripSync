import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

function Home() {

    


    return (
        <div className="bg-gray-900 text-white min-h-screen flex flex-col">
            {/* Hero Section */}
            <div className="bg-image">

                <section className="flex flex-col items-center justify-center py-16 px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                        <span className="text-indigo-500">Discover Your Next Adventure</span> with AI: Personalized Itineraries at Your Fingertips
                    </h1>
                    <p className="text-lg md:text-2xl max-w-2xl mx-auto mb-8">
                        Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
                    </p>

                    <Link to={'/create-trip'}>
                        <Button variant="danger" className="px-8 py-4 rounded-full bg-red-600 hover:bg-red-700 transition duration-300">
                            Get Started - It's Free
                        </Button>
                    </Link>
                </section>

                {/* Features Section */}
                <section className="py-16 ">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-3xl font-bold text-white mb-8">Why Choose Us?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Feature 1 */}
                            <div className="bg-gray-700 p-6 rounded-xl shadow-lg">
                                <h3 className="text-2xl font-semibold text-indigo-500 mb-4">Personalized Plans</h3>
                                <p className="text-gray-300">
                                    AI-powered itineraries based on your preferences, ensuring every trip is unique to you.
                                </p>
                            </div>

                            {/* Feature 2 */}
                            <div className="bg-gray-700 p-6 rounded-xl shadow-lg">
                                <h3 className="text-2xl font-semibold text-indigo-500 mb-4">Budget Friendly</h3>
                                <p className="text-gray-300">
                                    Get the most out of your budget without compromising on experiences and quality.
                                </p>
                            </div>

                            {/* Feature 3 */}
                            <div className="bg-gray-700 p-6 rounded-xl shadow-lg">
                                <h3 className="text-2xl font-semibold text-indigo-500 mb-4">Time-saving</h3>
                                <p className="text-gray-300">
                                    Skip the hassle of planning—let AI take care of the details, so you can focus on enjoying your trip.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* How It Works Section */}
            <section className="py-16 bg-gray-900">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-white mb-8">How It Works</h2>
                    <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                        <div className="bg-gray-700 p-6 rounded-xl shadow-lg max-w-xs">
                            <h3 className="text-xl font-semibold text-indigo-500 mb-4">Step 1: Tell Us Your Preferences</h3>
                            <p className="text-gray-300">
                                Share your destination, interests, and budget, we'll tailor a trip just for you.
                            </p>
                        </div>

                        <div className="bg-gray-700 p-6 rounded-xl shadow-lg max-w-xs">
                            <h3 className="text-xl font-semibold text-indigo-500 mb-4">Step 2: AI Generates Itinerary</h3>
                            <p className="text-gray-300">
                                Our AI quickly creates an itinerary with personalized recommendations that suit your needs.
                            </p>
                        </div>

                        <div className="bg-gray-700 p-6 rounded-xl shadow-lg max-w-xs">
                            <h3 className="text-xl font-semibold text-indigo-500 mb-4">Step 3: Enjoy Your Trip</h3>
                            <p className="text-gray-300">
                                With your personalized plan in hand, all you need to do is pack your bags and enjoy!
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="py-16 bg-gray-800 text-center">
                <h2 className="text-3xl font-bold text-white mb-6">Ready to Plan Your Next Adventure?</h2>
                <p className="text-lg text-gray-400 mb-8">
                    Start your journey with a free personalized itinerary. It’s quick, easy, and tailored just for you.
                </p>
                <Link to={'/create-trip'}>
                    <Button variant="danger" className="px-8 py-4 rounded-full bg-red-600 hover:bg-red-700 transition duration-300">
                        Get Started - It's Free
                    </Button>
                </Link>
            </section>

            {/* Footer Section */}
            <footer className="bg-gray-900 text-center py-6 text-gray-400">
                <p>&copy; 2024 Itinerary AI. All Rights Reserved.</p>
            </footer>
        </div>
    );
}

export default Home;
