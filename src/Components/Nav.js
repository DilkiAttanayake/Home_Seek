import React, { useState } from 'react';
import propertiesData from './properties.json'; // Import the properties data
import Logo from './Logo.png'; // Import the logo image

function Nav() {
    const [searchType, setSearchType] = useState(''); // State for search type (e.g., House, Flat)
    const [filteredResults, setFilteredResults] = useState([]); // State for filtered search results
    const [hasSearched, setHasSearched] = useState(false); // State to track if a search has been performed
    const [showResults, setShowResults] = useState(true); // State to track if results should be shown

    // Handler for updating the search type
    const handleSearchTypeChange = (event) => setSearchType(event.target.value);

    // Handler for performing the search
    const handleSearch = () => {
        setHasSearched(true); // Mark that a search has been performed
        setShowResults(true); // Show results when a new search is performed
        const results = propertiesData.properties.filter(property =>
            property.type.toLowerCase().includes(searchType.toLowerCase())
        );
        setFilteredResults(results);
    };

    // Handler for hiding the search results
    const handleHideResults = () => {
        setShowResults(false);
        setHasSearched(false); // Reset hasSearched to false
        setSearchType(''); // Clear the search input field
    };

    return (
        <div>
            {/* Navbar */}
            <nav className="navbar navbar-light" style={{ backgroundColor: '#e3f2fd', border: '2px solid #90caf9' }}>
                <div className="container-fluid">
                    {/* Left side - Logo */}
                    <div className="navbar-brand">
                        <img src={Logo} alt="Logo" style={{ width: '100px' }} />
                    </div>

                    {/* Middle - Text */}
                    <div className="text-center flex-grow-1 text-primary">
                        <h2>Discover The Place You Dream</h2>
                        <p>Search for the house you are looking for [for sale]</p>
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
                        <button type="button" className="btn btn-info" onClick={handleSearch}>Search</button>
                    </div>
                </div>
            </nav>

            {/* Search Results */}
            <div className="container mt-4">
                {showResults && filteredResults.length > 0 ? (
                    <div style={{ border: '1px solid grey)', padding: '20px', borderRadius: '5px', backgroundColor: '#c5d2dc' }}>
                        <h4>Search Results:</h4>
                        <div className="row">
                            {filteredResults.map((property, index) => (
                                <div className="col-md-3" key={property.id}>
                                    <div className="card mb-4 mt-3" style={{ height: '100%' }}>
                                        <img src={`/${property.picture}`} className="card-img-top" alt={property.type} style={{ height: '200px', objectFit: 'cover' }} />
                                        <div className="card-body d-flex flex-column">
                                            <h5 className="card-title">{property.type} - Rs.{property.price}</h5>
                                            <p className="card-text">{property.description.slice(0, 100)}...</p>
                                            <p className="card-text"><strong>Location:</strong> {property.location}</p>
                                            <a href={property.url} className="btn btn-primary mt-auto">View Details</a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="d-flex justify-content-end mt-3">
                        <button type="button" className="btn btn-secondary" onClick={handleHideResults} style={{ marginTop: '40px', marginLeft: '15px' }}>Hide Search Results</button>
                    </div>
                    </div>
                ) : (
                    // Show "No results" message only if a search has been performed
                    hasSearched && (
                        <p className="text-center text-muted">No results found. Try searching with a different type.</p>
                    )
                )}
            </div>
        </div>
    );
}

export default Nav;
