import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Trip } from '../interfaces/Trips';

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const TripDetails: React.FC = () => {
    const { tripId } = useParams<{ tripId: string }>();
    const [trip, setTrip] = useState<Trip | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTripDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8080/trips/${tripId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch trip details');
                }
                const tripData: Trip = await response.json();
                setTrip(tripData);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTripDetails();
    }, [tripId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!trip) {
        return <div>No trip details available.</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center border border-slate-800 text-slate-800 py-2 px-4 rounded hover:bg-slate-800 hover:text-white transition duration-300"
                type="button"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 17l-5-5m0 0l5-5m-5 5h12"
                    />
                </svg>
                Back to Search
            </button>

            <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Trip Details</h2>

                <div className="flex items-center mb-4">
                    <img src={trip.driver_pic} alt={`${trip.driver_name}`} className="w-32 h-32 rounded-full mr-4" />
                    <div>
                        <p><strong>Driver Name:</strong> {trip.driver_name}</p>
                        <p><strong>Rating:</strong> {trip.driver_rating}</p>
                    </div>
                </div>

                <p><strong>Pickup Location:</strong> {trip.pickup_location}</p>
                <p><strong>Dropoff Location:</strong> {trip.dropoff_location}</p>
                <p><strong>Request Date/Time:</strong> {new Date(trip.request_date).toLocaleString()}</p>
                <p><strong>Trip Start Time:</strong> {new Date(trip.pickup_date).toLocaleString()}</p>
                <p><strong>Trip End Time:</strong> {trip.dropoff_date}</p>
                <p><strong>Trip Distance:</strong> {trip.distance} {trip.distance_unit}</p>
                <p><strong>Trip Duration:</strong> {trip.duration} {trip.duration_unit}</p>
                <p><strong>Trip Final Price:</strong> {trip.cost} {trip.cost_unit}</p>
                <p><strong>Driver's Car Make & Model:</strong> {trip.car_make} {trip.car_model}</p>
                <img src={trip.car_pic} alt={`${trip.car_make} ${trip.car_model}`} className="w-64 h-40 rounded mb-4 mt-4" />
            </div>
            <div className="mt-4 mb-8">
                <h3 className="text-xl font-semibold">Map of the Trip</h3>
                <MapContainer
                    center={[trip.pickup_lat, trip.pickup_lng]}
                    zoom={8}
                    className="w-full h-80"
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />

                    <Marker position={[trip.pickup_lat, trip.pickup_lng]}>
                        <Popup>Pickup Location</Popup>
                    </Marker>

                    <Marker position={[trip.dropoff_lat, trip.dropoff_lng]} icon={new L.Icon({ iconUrl: require('leaflet/dist/images/marker-icon.png') })}>
                        <Popup>Dropoff Location</Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
    );
};

export default TripDetails;