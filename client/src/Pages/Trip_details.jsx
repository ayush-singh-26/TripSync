import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { useLocation } from "react-router-dom";

const TripDetails = () => {
  const [tripDetails, setTripDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const formData = location.state;

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        const response = await axios.post("http://localhost:8000/api/v1/place/generate-trip", {
          destination: formData.destination,
          days: formData.days,
          budget: formData.budget,
          traveller: formData.traveller,
        });

        const tripData = JSON.parse(response.data.data.result.text);
        setTripDetails(tripData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching trip details:", error);
      }
    };

    fetchTripDetails();
  }, []);

  useEffect(() => {
    if (tripDetails) {
      const fetchImagesForTrip = async () => {
        const hotelPromises = tripDetails.HotelOptions.map((hotel) =>
          fetchImage(`${hotel.HotelName} ${formData.destination}`)
        );

        const hotelImages = await Promise.all(hotelPromises);
        tripDetails.HotelOptions.forEach((hotel, index) => {
          hotel.HotelImageUrl = hotelImages[index];
        });

        const itineraryPromises = [];
        tripDetails.Itinerary.forEach((day) => {
          Object.keys(day).forEach((timeSlot) => {
            if (timeSlot !== "Day") {
              const place = day[timeSlot];
              itineraryPromises.push(fetchImage(`${place.PlaceName} ${place.PlaceType}`));
            }
          });
        });

        const itineraryImages = await Promise.all(itineraryPromises);

        let imageIndex = 0;
        tripDetails.Itinerary.forEach((day) => {
          Object.keys(day).forEach((timeSlot) => {
            if (timeSlot !== "Day") {
              const place = day[timeSlot];
              place.PlaceImageUrl = itineraryImages[imageIndex];
              imageIndex++;
            }
          });
        });

        setTripDetails({ ...tripDetails });
      };

      fetchImagesForTrip();
    }
  }, [tripDetails]);

  const fetchImage = async (query) => {
    try {
      const response = await axios.get("https://api.unsplash.com/search/photos", {
        params: { query, per_page: 1 },
        headers: { Authorization: `Client-ID IzKQZ5tRt5YANLV0okWMh1JAa-egiaV7UwCdOe12vwA` },
      });
      return response.data.results[0]?.urls?.small || "https://via.placeholder.com/150";
    } catch (error) {
      console.error(`Error fetching image for ${query}:`, error);
      return "https://via.placeholder.com/150";
    }
  };

  const viewOnMap = (geoCoordinates) => {
    const { latitude, longitude } = geoCoordinates;
    const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(mapUrl, "_blank");
  };

  if (loading) {
    return <Spinner />;
  }

  if (!tripDetails) {
    return <div className="text-center py-6">Failed to load trip details.</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Travel Plan for {formData.destination}</h1>
        <p className="text-lg text-gray-600">Plan tailored for {formData.traveller} with a budget of {formData.budget}.</p>
      </header>

      {/* Hotel Options Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Hotel Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tripDetails.HotelOptions.map((hotel, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
              <img
                src={hotel.HotelImageUrl}
                alt={hotel.HotelName}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">{hotel.HotelName}</h3>
              <p className="text-gray-600">{hotel.HotelAddress}</p>
              <p className="text-gray-800 font-semibold">Price: {hotel.Price}</p>
              <p className="text-gray-800 font-semibold">Rating: {hotel.Rating}</p>
              <p className="text-gray-600 mt-2">{hotel.Description}</p>
              <button
                onClick={() => viewOnMap(hotel.GeoCoordinates)}
                className="mt-4 bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600"
              >
                View on Map
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Itinerary Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Daily Itinerary</h2>
        {tripDetails.Itinerary.map((day, index) => (
          <div key={index} className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Day {index + 1}</h3>
            <div className="flex gap-2">

            {Object.keys(day).map((timeSlot) => {
              if (timeSlot === "Day") return null;
              const place = day[timeSlot];
              return (
                <div
                key={timeSlot}
                className="w-1/3 bg-white p-4 rounded-lg shadow hover:shadow-lg transition mt-4"
                >
                  <h4 className="text-lg font-semibold text-gray-800">
                    {timeSlot} - {place.PlaceName}
                  </h4>
                  <img
                    src={place.PlaceImageUrl}
                    alt={place.PlaceName}
                    className="w-full h-96 object-cover rounded-md mb-4"
                    />
                  <p className="text-gray-600">{place.PlaceDetails}</p>
                  <p className="text-gray-800 font-semibold">Ticket Pricing: {place.TicketPricing}</p>
                  <p className="text-gray-800 font-semibold">Travel Time: {place.TravelTime}</p>
                  <p className="text-gray-800 font-semibold">Best Time to Visit: {place.BestTimeToVisit}</p>
                  <button
                    onClick={() => viewOnMap(place.GeoCoordinates)}
                    className="mt-4 bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600"
                    >
                    View on Map
                  </button>
                </div>
              );
            })}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default TripDetails;
