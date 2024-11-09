import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './index.css';
import TripResults from './components/TripResults';
import SearchPage from './pages/SearchPage';
import TripDetails from './components/TripDetails';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { setLoading, setTrips, setError, clearTrips } from './redux/tripSearchSlice';

const App: React.FC = () => {
    const dispatch = useDispatch();
    const { trips, loading } = useSelector((state: RootState) => state.tripSearch);

    const handleSearch = async (searchParams: {
        keyword: string;
        includeCanceled: boolean;
        distance?: number;
        time?: string;
    }) => {
        dispatch(setLoading());
        try {
            const response = await fetch(`http://localhost:8080/trips?keyword=${encodeURIComponent(searchParams.keyword)}&includeCanceled=${searchParams.includeCanceled}&distance=${searchParams.distance}&time=${searchParams.time}`);
            const data = await response.json();
            dispatch(setTrips(data.data));
            return data.data;
        } catch (error) {
            console.error('Error fetching trips:', error);
            dispatch(setError('Failed to fetch trips.'));
            return [];
        }
    };

    const handleBack = () => {
        dispatch(clearTrips());
    };

    return (
        <Routes>
            <Route path="/" element={<SearchPage onSearch={handleSearch} />} />
            <Route path="/results" element={<TripResults trips={trips} loading={loading} onBack={handleBack} />} />
            <Route path="/trips/:tripId" element={<TripDetails />} />
        </Routes>
    );
};

export default App;
