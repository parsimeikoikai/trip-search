import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store';
import TripSearchForm from '../components/TripSearchForm';
import TripResults from '../components/TripResults';
import { resetSearchParams } from '../redux/searchSlice';

const SearchPage: React.FC<{ onSearch: (searchParams: { keyword: string; includeCanceled: boolean; distance?: number; time?: string; }) => Promise<void>; }> = ({ onSearch }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { keyword, includeCanceled, distance, time } = useSelector((state: RootState) => state.search); // Get search parameters from Redux
    const { trips, loading } = useSelector((state: RootState) => state.tripSearch);
    const searchInitiated = trips.length > 0 || loading;

    const handleSearch = async (searchParams: { keyword: string; includeCanceled: boolean; distance?: number; time?: string; }) => {
        await onSearch(searchParams);
        navigate('/results');
    };

    const handleBack = () => {
        dispatch(resetSearchParams());
        navigate('/');
    };

    return (
        <div>
            {!loading && trips.length === 0 && (
                <TripSearchForm onSearch={handleSearch} initialParams={{ keyword, includeCanceled, distance, time }} />
            )}
            {loading && <p>Loading...</p>}
            {!loading && trips.length > 0 && (
                <TripResults trips={trips} loading={loading} onBack={handleBack} />
            )}
            {!loading && searchInitiated && trips.length === 0 && <p>No trips found.</p>}
        </div>
    );
};

export default SearchPage;
