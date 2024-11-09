import React from 'react';
import { Trip } from '../interfaces/Trips';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';

interface TripResultsProps {
    trips: Trip[];
    loading: boolean;
    onBack: () => void;
}

const TripResults: React.FC<TripResultsProps> = ({ onBack }) => {
    const navigate = useNavigate();
    const { trips, loading } = useSelector((state: RootState) => state.tripSearch);

    if (loading) {
        return <div>Loading...</div>; 
    }
    if (trips.length === 0) {
        return <div>No trips found.</div>;
    }

    const handleTripDetails = (tripId: number) => {
        navigate(`/trips/${tripId}`);
    };

    const handleBack = () => {
        onBack();
        navigate('/');
    };

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <div className="flex justify-between w-full max-w-6xl mb-4">
                <h2 className="text-2xl font-bold">Trip Results</h2>
                <button
                
                className="rounded-md border border-slate-800 py-2 px-4 mt-6 text-slate-800 text-sm 
                transition-all shadow-md hover:bg-slate-800 hover:text-white focus:bg-slate-700
                 focus:text-white active:bg-slate-700 disabled:pointer-events-none disabled:opacity-50"
                onClick={handleBack}>Back</button>

            </div>

            <p className="mb-4 font-bold">Total Trips Found: {trips.length}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl">
                {trips.map((trip) => (
                    <div key={trip.id} className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
                        <div className="p-4">
                            <h5 className={`mb-2 text-xl font-semibold ${trip.status === 'CANCELED' ? 'text-red-600' : 'text-green-600'}`}>
                                {trip.driver_name} - {trip.status}
                            </h5>

                            <p className="text-slate-600 leading-normal font-light">
                                <strong>Pickup:</strong> {trip.pickup_location}<br />
                                <strong>Dropoff:</strong> {trip.dropoff_location}<br />
                                <strong>Cost:</strong> {trip.cost} {trip.cost_unit}<br />
                                <strong>Rating:</strong> {trip.driver_rating} ⭐<br />
                                <strong>Start Time:</strong> {new Date(trip.pickup_date).toLocaleString()}
                            </p>
                            <button
                                onClick={() => handleTripDetails(trip.id)}
                                className="rounded-md border border-slate-800 py-2 px-4 mt-6 text-slate-800 text-sm 
                        transition-all shadow-md hover:bg-slate-800 hover:text-white focus:bg-slate-700
                         focus:text-white active:bg-slate-700 disabled:pointer-events-none disabled:opacity-50"
                                type="button"
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TripResults;
