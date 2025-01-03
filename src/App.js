import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Properties from './components/Properties';
import PropertyPage from './components/PropertyPage'; // Import the PropertyPage component

function App() {
  return (
    <Router>
      <div className="App">
        <Nav /> {/* Navigation bar component */}
        
        <Routes>
          <Route path="/" element={<Properties />} /> {/* Route for properties listing */}
          <Route path="/property/:propertyId" element={<PropertyPage />} /> {/* Route for individual property page */}
          <Route path="/nav/:propertyId" element={<PropertyPage />} /> {/* Route for property page */}
          <Route path="/form/:propertyId" element={<PropertyPage />} /> {/* Route for property page */}
        </Routes>

        <Footer /> {/* Footer component */}
      </div>
    </Router>
  );
}

export default App;
