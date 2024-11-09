import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import TripSearchForm from '../TripSearchForm';

describe('TripSearchForm', () => {
    const mockOnSearch = jest.fn();

    beforeEach(() => {
        render(
            <Provider store={store}>
                <TripSearchForm
                    onSearch={mockOnSearch}
                    initialParams={{
                        keyword: '',
                        includeCanceled: false,
                    }}
                />
            </Provider>
        );
    });

    it('submits the form with correct values', () => {
        fireEvent.change(screen.getByLabelText(/keyword/i), {
            target: { value: 'Location A' },
        });

        fireEvent.click(screen.getByLabelText(/include canceled trips/i));

        fireEvent.click(screen.getByRole('button', { name: /search/i }));

        expect(mockOnSearch).toHaveBeenCalledWith({
            keyword: 'Location A',
            includeCanceled: true,
            distance: 5,
            time: 'any',
        });
    });

    it('initializes with provided params', () => {
        const keywordInput = screen.getByLabelText(/keyword/i) as HTMLInputElement;
        expect(keywordInput.value).toBe('');

        const includeCanceledCheckbox = screen.getByLabelText(/include canceled trips/i) as HTMLInputElement;
        expect(includeCanceledCheckbox).not.toBeChecked();
    });

    it('checks if canceled trips are included', () => {
        fireEvent.click(screen.getByLabelText(/include canceled trips/i));
        fireEvent.click(screen.getByRole('button', { name: /search/i }));

        expect(mockOnSearch).toHaveBeenCalledWith(expect.objectContaining({
            includeCanceled: true,
        }));
    });

    it('checks if canceled trips are excluded', () => {
        fireEvent.click(screen.getByRole('button', { name: /search/i }));

        expect(mockOnSearch).toHaveBeenCalledWith(expect.objectContaining({
            includeCanceled: false,
        }));
    });

    it('selects the correct distance filter', () => {
        fireEvent.click(screen.getByLabelText(/more than 15 km/i));
        fireEvent.click(screen.getByRole('button', { name: /search/i }));

        expect(mockOnSearch).toHaveBeenCalledWith(expect.objectContaining({
            distance: 4, 
        }));
    });

    it('selects the correct time filter', () => {
        fireEvent.click(screen.getByLabelText(/under 5 mins/i));
        fireEvent.click(screen.getByRole('button', { name: /search/i }));

        expect(mockOnSearch).toHaveBeenCalledWith(expect.objectContaining({
            time: 'under5mins',
        }));
    });

    it('checks the keyword search filter', () => {
        fireEvent.change(screen.getByLabelText(/keyword/i), {
            target: { value: 'Location B' },
        });
        fireEvent.click(screen.getByRole('button', { name: /search/i }));

        expect(mockOnSearch).toHaveBeenCalledWith(expect.objectContaining({
            keyword: 'Location B',
        }));
    });
});
