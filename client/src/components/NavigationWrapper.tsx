import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../App';

const NavigationWrapper: React.FC = () => {
    return (
        <Router>
            <App />
        </Router>
    );
};

export default NavigationWrapper;
