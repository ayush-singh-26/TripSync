export const AI_PROMPT = `
Generate a Travel Plan for Location: {location}, for {totalDays} days, for a {traveler} with a {budget} budget.

Provide a list of Hotel options that include:
- HotelName: Name of the hotel
- HotelAddress: Complete address
- Price: Price per night
- HotelImageUrl: URL of the hotel image(unspalsh url)
- GeoCoordinates: Latitude and longitude
- Rating: User rating
- Description: A brief description of the hotel

Provide a array of Itinerary that include the following details for each day:
- PlaceName: Name of the attraction or activity
- PlaceDetails: Description of the place
- PlaceImageUrl: URL of the place image(unsplash url)
- GeoCoordinates: Latitude and longitude
- TicketPricing: Entry fee or ticket price (if applicable)
- TravelTime: Estimated time to travel to the place
- BestTimeToVisit: The ideal time of day to visit the place

Organize the itinerary into a day-by-day plan for {totalDays} days, with morning, afternoon, and evening activities for each day.

Provide the output in JSON format. Ensure all details are optimized for the specified traveler type and budget.
`;