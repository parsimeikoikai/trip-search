import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Trip } from '../interfaces/Trips';

interface TripSearchState {
    trips: Trip[];
    loading: boolean;
    error: string | null;
}

const initialState: TripSearchState = {
    trips: [],
    loading: false,
    error: null,
};

const tripSearchSlice = createSlice({
    name: 'tripSearch',
    initialState,
    reducers: {
        setTrips: (state, action: PayloadAction<Trip[]>) => {
            state.trips = action.payload;
            state.loading = false;
            state.error = null;
        },
        setLoading: (state) => {
            state.loading = true;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        },
        clearTrips: (state) => {
            state.trips = [];
            state.loading = false;
            state.error = null;
        },
    },
});

export const { setTrips, setLoading, setError, clearTrips } = tripSearchSlice.actions;
export default tripSearchSlice.reducer;
