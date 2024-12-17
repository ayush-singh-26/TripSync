import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SelectBudgetOptions, SelectTravellerList } from "../constants/Options";

function CreateTrip() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    destination: "",
    days: "",
    budget: null,
    traveller: null,
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/trip-details", { state: formData });
  };

  return (
    <section className="min-h-screen flex items-stretch text-white">
      {/* Left Section */}
      <div
        className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0"
        style={{ backgroundColor: "#161616" }}
      >
        <div className="w-full py-5 z-20">
          <h2 className="text-3xl font-bold text-white mb-4">
            Tell Us Your Travel Preferences
          </h2>
          <p className="text-lg text-gray-400 mb-8">
            Provide some basic information, and we’ll create a personalized itinerary for you.
          </p>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Destination Input */}
            <div>
              <label htmlFor="destination" className="block text-lg text-gray-300 mb-2">
                What is your destination of choice?
              </label>
              <input
                id="destination"
                type="text"
                placeholder="Enter the destination"
                value={formData.destination}
                onChange={(e) => handleChange("destination", e.target.value)}
                className="p-2 w-2/3 bg-black border-2 border-gray-600 text-white rounded-xl focus:outline-none focus:border-gray-500"
              />
            </div>

            {/* Number of Days Input */}
            <div>
              <label htmlFor="days" className="block text-lg text-gray-300 mb-2">
                How many days are you planning your trip?
              </label>
              <input
                id="days"
                type="number"
                placeholder="Number of days to plan"
                value={formData.days}
                onChange={(e) => handleChange("days", e.target.value)}
                className="p-2 w-2/3 bg-black border-2 border-gray-600 text-white rounded-xl focus:outline-none focus:border-gray-500"
              />
            </div>

            {/* Budget Options */}
            <div>
              <label className="block text-lg text-gray-300 mb-2">What is your budget?</label>
              <div className="grid grid-cols-2 gap-3">
                {SelectBudgetOptions.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleChange("budget", item.title)}
                    className={`mx-5 border-2 rounded-lg text-center cursor-pointer transition-all duration-300 
                    ${formData.budget === item.title ? "border-indigo-500 bg-indigo-50" : "border-gray-300"}`}
                  >
                    <div className="text-4xl mb-2">{item.icon}</div>
                    <h5 className="text-xl font-semibold text-gray-400">{item.title}</h5>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Traveller Options */}
            <div>
              <label className="block text-lg text-gray-300 mb-2">Who are you traveling with?</label>
              <div className="grid grid-cols-2 gap-3">
                {SelectTravellerList.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleChange("traveller", item.title)}
                    className={`mx-5 border-2 rounded-lg text-center cursor-pointer transition-all duration-300 
                    ${formData.traveller === item.title ? "border-indigo-500 bg-indigo-50" : "border-gray-300"}`}
                  >
                    <div className="text-4xl mb-2">{item.icon}</div>
                    <h5 className="text-xl font-semibold text-gray-400">{item.title}</h5>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="uppercase w-1/3 p-2 text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none"
            >
              Generate Trip
            </button>
          </form>
        </div>
      </div>

      {/* Right Section */}
      <div
        className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80)",
        }}
      >
        <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
        <div className="w-full px-24 z-10">
          <h1 className="text-5xl font-bold tracking-wide text-white">Keep it special</h1>
          <p className="text-3xl my-4 text-gray-300">
            Capture your personal memory in a unique way, anywhere.
          </p>
        </div>
      </div>
    </section>
  );
}

export default CreateTrip;
