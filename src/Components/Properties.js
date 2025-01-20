import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link component for navigation
import propertiesData from './properties.json'; // Import properties data from JSON file
import Form from './Form'; // Import Form component
import DOMPurify from 'dompurify'; // Import DOMPurify for sanitizing HTML

const Properties = () => {
    const [favorites, setFavorites] = useState([]); // State to store favorite properties
    const [items, setItems] = useState([]); // State to store available properties
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false); // State to toggle advanced search

    useEffect(() => {
        // Save favorites to localStorage whenever favorites state changes
        if (favorites.length > 0) {
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }
    }, [favorites]);

    useEffect(() => {
        // Load items from propertiesData and favorites from localStorage on component mount
        setItems(propertiesData.properties);
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));  // Parse and set the stored favorites
        }
    }, []);

    const toggleAdvancedSearch = () => {
        setShowAdvancedSearch(!showAdvancedSearch); // Toggle advanced search visibility
    };

    const addToFavorites = (item) => {
        if (!favorites.some(fav => fav.id === item.id)) { // Check if item is not already in favorites
            setFavorites([...favorites, item]); // Add item to favorites
        } else {
            alert("Property already added"); // Alert if item is already in favorites
        }
    };

    const removeFromFavorites = (item) => {
        setFavorites(favorites.filter(fav => fav.id !== item.id)); // Remove item from favorites
    };

    const clearFavorites = () => {
        setFavorites([]); // Clear all favorites
    };

    const handleDragStart = (event, item) => {
        event.dataTransfer.setData("item", JSON.stringify(item)); // Set dragged item data
    };

    const handleDropToFavorites = (event) => {
        const item = JSON.parse(event.dataTransfer.getData("item")); // Get dropped item data
        addToFavorites(item); // Add dropped item to favorites
    };

    const handleDropToItems = (event) => {
        const item = JSON.parse(event.dataTransfer.getData("item")); // Get dropped item data
        removeFromFavorites(item); // Remove dropped item from favorites
    };

    const allowDrop = (event) => {
        event.preventDefault(); // Allow drop event
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-center mb-3">
                <button 
                    className="btn btn-primary"
                    onClick={toggleAdvancedSearch} // Toggle advanced search on button click
                >
                    {showAdvancedSearch ? "Hide Advanced Search" : "Show Advanced Search"}
                </button>

            </div>

            {showAdvancedSearch ? (

                <div>
                    <Form favoriteProperties={favorites} /> {/* Pass favorites to Form component */}
                </div>
            ) : (

                <div className="row">
                    <div className="col-md-8">

                        <div
                            className="box"
                            style={{
                                border: '1px solid grey',
                                padding: '10px',
                                borderRadius: '5px',
                                backgroundColor: '#d9e6f0',
                                marginBottom: '20px'
                            }}

                            onDragOver={allowDrop} // Allow drop on available items box
                            onDrop={handleDropToItems} // Handle drop event on available items box
                        >

                            <h4 style={{color: '#575e62', margin: '20px 20px' }}>Available</h4>

                            <div className="row">
                                {items.map((item, index) => (
                                    <div
                                        className="col-md-6"
                                        key={index}
                                        draggable
                                        onDragStart={(event) => handleDragStart(event, item)} // Handle drag start event
                                    >

                                        <div
                                            className="card mb-4"
                                            style={{
                                                border: '3px solid gray',
                                                height: '520px',
                                                width: '370px',
                                                marginBottom: '20px',
                                                marginLeft: '20px',
                                                marginRight: '20px'
                                            }}
                                        >

                                            <img 
                                                src={`/${item.pictures && Array.isArray(item.pictures) && item.pictures.length > 0 ? item.pictures[0] : 'default.webp'}`} 
                                                className="card-img-top" 
                                                alt={item.type || 'No image available'} 
                                            />

                                            <div className="card-body">
                                                <h5 className="card-title">{DOMPurify.sanitize(item.type)}</h5>
                                                <p className="card-text"><strong>Price:</strong> Rs.{DOMPurify.sanitize(item.price.toString())}</p>
                                                <p className="card-text"><strong>Bedrooms:</strong> {DOMPurify.sanitize(item.bedrooms.toString())}</p>
                                                <p className="card-text"><strong>Location:</strong> {DOMPurify.sanitize(item.location)}</p>
                                                <p className="card-text"><strong>Added Date:</strong> {DOMPurify.sanitize(`${item.added.day}-${item.added.month}-${item.added.year}`)}</p>
                                                <Link to={`/property/${item.id}`} className="btn btn-link" style={{ textDecoration: 'none', float:'right' }}>View Details</Link> {/* Link to the property page */}
                                                <button className="btn btn-primary" onClick={() => addToFavorites(item)} style={{ float: 'left'}}>Add to Favorites</button> {/* Button to add item to favorites */}
                                            </div>

                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div
                        className="col-md-4"
                        style={{
                            backgroundColor: '#d9e6f0',
                            border: '1px solid gray',
                            borderRadius: '5px',
                            padding: '10px',
                            width: '27%',
                            marginLeft: '80px'
                        }}

                        onDragOver={allowDrop} // Allow drop on favorites box
                        onDrop={handleDropToFavorites} // Handle drop event on favorites box
                    >

                        <h4 style={{color: '#575e62', margin: '20px 20px'}}>Favorites <i className="fas fa-heart"></i> </h4>

                        {favorites.length === 0 ? (

                            <p style={{margin:'20px 20px'}}><strong>No favorites yet.</strong></p> // Display message if no favorites
                        ) : (

                            <>
                                <ul className="list-group">
                                    {favorites.map(fav => (
                                        <li
                                            key={fav.id}
                                            className="list-group-item d-flex justify-content-between align-items-center"
                                            style={{ height: '100px', marginBottom: '10px' }}
                                            draggable
                                            onDragStart={(event) => handleDragStart(event, fav)} // Handle drag start event
                                        >

                                            <div>
                                                <img 
                                                    src={`/${Array.isArray(fav.pictures) && fav.pictures.length > 0 ? fav.pictures[0] : 'default.webp'}`} 
                                                    alt={fav.type || 'No image available'} 
                                                    width="70" 
                                                    height="70" 
                                                    className="mr-2" 
                                                />

                                                <span style={{ marginLeft: '20px' }}>{fav.type}</span>

                                            </div>

                                            <button className="btn btn-danger btn-sm" onClick={() => removeFromFavorites(fav)}>Remove</button> {/* Button to remove item from favorites */}

                                        </li>
                                    ))}
                                </ul>

                                <div className="d-flex justify-content-end">
                                    <button className="btn btn-warning mt-3" onClick={clearFavorites}>Clear All</button> {/* Button to clear all favorites */}
                                </div>
                                
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Properties;
