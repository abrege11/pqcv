import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BuilderScreen from './screens/Builder.screen';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/builder" replace />} />
        <Route path="/builder" element={<BuilderScreen />} />
      </Routes>
    </Router>
  );
}
