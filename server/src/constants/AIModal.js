import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import { AI_PROMPT } from '../models/AI.models.js';

dotenv.config();

const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
if (!apiKey) {
  console.error("API key is missing. Please set GOOGLE_GEMINI_API_KEY in your .env file.");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

const hotelItineraryJSON = `{
  "HotelOptions": [
    {
      "HotelName": "Hotel Ganges Inn",
      "HotelAddress": "D. 20/1, Bangali Tola, Varanasi, Uttar Pradesh 221001",
      "Price": "₹800",
      "HotelImageUrl": "https://example.com/gangesinn.jpg",
      "GeoCoordinates": {
        "latitude": "25.3087",
        "longitude": "83.0159"
      },
      "Rating": "4.0",
      "Description": "A budget-friendly hotel with basic amenities, located close to the ghats."
    },
    {
      "HotelName": "Suraj Paying Guest House",
      "HotelAddress": "Near Hanuman Ghat, Varanasi, Uttar Pradesh 221001",
      "Price": "₹600",
      "HotelImageUrl": "https://example.com/surajgh.jpg",
      "GeoCoordinates": {
        "latitude": "25.2965",
        "longitude": "83.0099"
      },
      "Rating": "3.8",
      "Description": "A simple guest house offering clean rooms at very affordable rates."
    },
    {
      "HotelName": "Shanti Guest House",
      "HotelAddress": "B-1/119, Assi Ghat, Varanasi, Uttar Pradesh 221005",
      "Price": "₹700",
      "HotelImageUrl": "https://example.com/shantigh.jpg",
      "GeoCoordinates": {
        "latitude": "25.2862",
        "longitude": "83.0108"
      },
      "Rating": "4.2",
      "Description": "Located near Assi Ghat, this guest house offers a comfortable stay for budget travelers."
    }
  ],
  "Itinerary": [
    {
      "Day": 1,
      "Morning": {
        "PlaceName": "Dashashwamedh Ghat",
        "PlaceDetails": "Witness the morning Ganga Aarti and the vibrant activity along the ghats.",
        "PlaceImageUrl": "https://example.com/dashashwamedh.jpg",
        "GeoCoordinates": {
          "latitude": "25.3080",
          "longitude": "83.0139"
        },
        "TicketPricing": "Free",
        "TravelTime": "15 minutes from most hotels",
        "BestTimeToVisit": "6:00 AM to 8:00 AM"
      },
      "Afternoon": {
        "PlaceName": "Kashi Vishwanath Temple",
        "PlaceDetails": "Visit one of the most sacred Hindu temples, dedicated to Lord Shiva.",
        "PlaceImageUrl": "https://example.com/vishwanath.jpg",
        "GeoCoordinates": {
          "latitude": "25.3100",
          "longitude": "83.0150"
        },
        "TicketPricing": "Free",
        "TravelTime": "5 minutes from Dashashwamedh Ghat",
        "BestTimeToVisit": "10:00 AM to 12:00 PM"
      },
      "Evening": {
        "PlaceName": "Ganga Aarti (Evening)",
        "PlaceDetails": "Experience the mesmerizing Ganga Aarti at the main ghat in the evening.",
        "PlaceImageUrl": "https://example.com/gangaarti.jpg",
        "GeoCoordinates": {
          "latitude": "25.3080",
          "longitude": "83.0139"
        },
        "TicketPricing": "Free",
        "TravelTime": "15 minutes from Kashi Vishwanath Temple",
        "BestTimeToVisit": "6:00 PM to 8:00 PM"
      }
    }
  ]
}`;

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [{ text: AI_PROMPT }]
    },
    {
      role: "model",
      parts: [{ text: hotelItineraryJSON }]
    }
  ]
});

