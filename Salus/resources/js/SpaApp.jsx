import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import SymptomsPage from './pages/SymptomsPage';

function SpaApp() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/symptoms" replace />} />
            <Route path="/symptoms" element={<SymptomsPage />} />
            <Route path="*" element={<Navigate to="/symptoms" replace />} />
        </Routes>
    );
}

export default SpaApp;
