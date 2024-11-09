export interface Trip {
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
    dropoff_date: string | null;
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