import axios from 'axios';


interface Trip {
  id: number;
  status: string;
  request_date: string;
  pickup_lat: number;
  pickup_lng: number;
  pickup_location: string;
  dropoff_lat: number;
  dropoff_lng: number;
  dropoff_location: string;
  pickup_date: string;
  dropoff_date: string | null; // Assuming this can be null
  type: string;
  driver_id: number;
  driver_name: string;
  driver_rating: number;
  driver_pic: string;
  car_make: string;
  car_model: string;
  car_number: string;
  car_year: number;
  car_pic: string;
  duration: number;
  duration_unit: string;
  distance: number;
  distance_unit: string;
  cost: number;
  cost_unit: string; 
}
export const getAllTrips = async (): Promise<Trip[]> => {
  try {
    const response = await axios.get("https://rapidtechinsights.github.io/hr-assignment/recent.json");
    return response.data.trips; 
  } catch (error) {
    console.error("Error fetching trips:", error);
    throw error; 
  }
};

export const searchTrips = async (
  keyword: string,
  includeCanceled: boolean = false,
  distance?: number,  
  time?: string,     
): Promise<Trip[]> => {
  const trips: Trip[] = await getAllTrips(); 

  return trips.filter(trip => {

    const keywordMatch = !keyword || Object.values(trip).some(field => {
      return field !== null && field.toString().toLowerCase().includes(keyword.toLowerCase());
    });

    
    const statusMatch = includeCanceled || trip.status === 'COMPLETED';

   
    let distanceMatch = true;
    if (distance !== undefined) {
      const tripDistance = trip.distance; // Assume trip.distance is in km
      switch (distance) {
        case 1: // under3k
          distanceMatch = tripDistance < 3;
          break;
        case 2: // 3to5km
          distanceMatch = tripDistance >= 3 && tripDistance <= 5;
          break;
        case 3: // 5to15km
          distanceMatch = tripDistance > 5 && tripDistance <= 15;
          break;
        case 4: // moreThan15k
          distanceMatch = tripDistance > 15;
          break;
        case 5: // any
        default:
          distanceMatch = true; // "any" distance should match all
          break;
      }
    }
        // 4. Time match
    let timeMatch = true; // Default to true for "any" time
    if (time) {
      const tripDuration = trip.duration; // Assuming trip.duration is in minutes
      switch (time) {
        case 'under5mins':
          timeMatch = tripDuration < 5; // Less than 5 minutes
          break;
        case '5to10mins':
          timeMatch = tripDuration >= 5 && tripDuration <= 10; // Between 5 and 10 minutes
          break;
        case '10to20mins':
          timeMatch = tripDuration > 10 && tripDuration <= 20; // Between 10 and 20 minutes
          break;
        case 'moreThan20mins':
          timeMatch = tripDuration > 20; // More than 20 minutes
          break;
        default:
          timeMatch = true; // "any" time matches all
      }
    }

    return keywordMatch && statusMatch && distanceMatch && timeMatch;
  });
};

export const getTripById = async (id: string): Promise<Trip | null> => {
  const trips = await getAllTrips();
  return trips.find(trip => trip.id === Number(id)) || null;
};