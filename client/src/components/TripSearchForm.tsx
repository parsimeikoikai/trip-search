import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchParams } from '../redux/searchSlice';


interface TripSearchFormProps {
    onSearch: (searchParams: {
        keyword: string;
        includeCanceled: boolean;
        distance?: number;
        time?: string;
    }) => void;
    initialParams: {
        keyword: string;
        includeCanceled: boolean;
        distance?: number;
        time?: string;
    };
}

const TripSearchForm: React.FC<TripSearchFormProps> = ({ onSearch, initialParams }) => {
    const [keyword, setKeyword] = useState('');
    const [includeCanceled, setIncludeCanceled] = useState(false);
    const [time, setTime] = useState('any');
    const [distance, setDistance] = useState('any');
    const dispatch = useDispatch();

    useEffect(() => {
        setKeyword(initialParams.keyword);
        setIncludeCanceled(initialParams.includeCanceled);
        setTime(initialParams.time ?? 'any');

        // Map numeric distance back to string representation
        switch (initialParams.distance) {
            case 1:
                setDistance('under3k');
                break;
            case 2:
                setDistance('3to5km');
                break;
            case 3:
                setDistance('5to15km');
                break;
            case 4:
                setDistance('moreThan15k');
                break;
            case 5:
            default:
                setDistance('any');
                break;
        }
    }, [initialParams]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        let distanceNumber: number;

        switch (distance) {
            case 'under3k':
                distanceNumber = 1;
                break;
            case '3to5km':
                distanceNumber = 2;
                break;
            case '5to15km':
                distanceNumber = 3;
                break;
            case 'moreThan15k':
                distanceNumber = 4;
                break;
            case 'any':
            default:
                distanceNumber = 5;
                break;
        }

        const searchParams = {
            keyword,
            includeCanceled,
            distance: distanceNumber,
            time,
        };

        dispatch(setSearchParams({
            keyword,
            includeCanceled,
            distance: distanceNumber,
            time,
        }));

        onSearch(searchParams);
    };

    const distanceOptions: { value: string; label: string }[] = [
        { value: 'any', label: 'Any' },
        { value: 'under3k', label: 'Under 3 km' },
        { value: '3to5km', label: '3 to 5 km' },
        { value: '5to15km', label: '5 to 15 km' },
        { value: 'moreThan15k', label: 'More than 15 km' },
    ];

    const timeOptions: { value: string; label: string }[] = [
        { value: 'any', label: 'Any' },
        { value: 'under5mins', label: 'Under 5 mins' },
        { value: '5to10mins', label: '5 to 10 mins' },
        { value: '10to20mins', label: '10 to 20 mins' },
        { value: 'moreThan20mins', label: 'More than 20 mins' },
    ];

    return (
        <div className="w-full flex h-svh max-h-svh">
            <div className="flex h-full flex-1 flex-col">
                <div className="flex h-full flex-col justify-between overflow-y-scroll">
                    <div className="sticky top-0 w-full">
                        <div className="b py-8 text-center">
                            <h1 className="text-3xl font-bold mb-10">Trip Search</h1>
                            <hr className="my-1 w-1/2 mx-auto border-gray-300" />
                        </div>
                        <div className="flex-grow flex items-center justify-center">
                            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                                <div className="mb-4">
                                    <label htmlFor="keyword" className="block text-sm font-medium text-gray-700">Keyword:</label>
                                    <input
                                        type="text"
                                        id="keyword"
                                        required
                                        value={keyword}
                                        onChange={(e) => setKeyword(e.target.value)}
                                        placeholder="Search by pickup, dropoff, etc."
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={includeCanceled}
                                            onChange={() => setIncludeCanceled((prev) => !prev)}
                                            className="mr-2"
                                        />
                                        Include canceled trips
                                    </label>
                                </div>

                                <div className="flex mb-4">
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700">Distance:</label>
                                        <div className="mt-1">
                                            {distanceOptions.map(({ value, label }) => (
                                                <label className="block" key={value}>
                                                    <input
                                                        type="radio"
                                                        name="distance"
                                                        value={value}
                                                        checked={distance === value}
                                                        onChange={() => setDistance(value)}
                                                        className="mr-2"
                                                    />
                                                    {label}
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex-1 ml-4">
                                        <label className="block text-sm font-medium text-gray-700">Time:</label>
                                        <div className="mt-1">
                                            {timeOptions.map(({ value, label }) => (
                                                <label className="block" key={value}>
                                                    <input
                                                        type="radio"
                                                        name="time"
                                                        value={value}
                                                        checked={time === value}
                                                        onChange={() => setTime(value)}
                                                        className="mr-2"
                                                    />
                                                    {label}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 flex items-center justify-center"
                                >
                                    Search
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TripSearchForm;
