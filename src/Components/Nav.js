import React, { useState } from 'react'; // Import React and useState hook for state management
import Logo from './Logo.png'; // Import the logo image

function Nav() {
  // State for search inputs - declaring state variables and their setters for each search filter
  const [searchType, setSearchType] = useState(''); // State for search type (house, flat, etc.)
  
  // Handlers for updating the state values when the user types in the input fields
  const handleSearchTypeChange = (event) => setSearchType(event.target.value); // Update search type

  
return (
    // The nav bar component, using Bootstrap classes for styling
    <nav className="navbar navbar-light" style={{ backgroundColor: '#e3f2fd', border: '2px solid #90caf9' }}>
        <div className="container-fluid">

            {/* Left side - Logo */}
            <div className="navbar-brand">
                <img src={Logo} alt="Logo" style={{ width: '100px' }} />
            </div>

            {/* Middle - Text */}
            <div className="text-center flex-grow-1 text-primary">
                <h2>Discover The Place You Dream</h2>
                <p>Search for the house you are looking for [rent or sale]</p>
            </div>

            {/* Right side - Search Section */}
            <div className="d-flex align-items-center">
                {/* Search Input */}
                <input
                    type="text"
                    className="form-control me-2"
                    placeholder="Search here"
                    value={searchType}
                    onChange={handleSearchTypeChange} // Update state on user input
                />
                {/* Search Button */}
                <button type="button" className="btn btn-info">Search</button>
            </div>
        </div>
    </nav>
);
}

export default Nav; // Export the Nav component so it can be used in other parts of the app
