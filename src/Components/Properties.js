import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link component
import propertiesData from './properties.json';
import Form from './Form';

const Properties = () => {
    const [favorites, setFavorites] = useState([]);
    const [items, setItems] = useState([]);
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

    useEffect(() => {
        setItems(propertiesData.properties);
    }, []);

    const toggleAdvancedSearch = () => {
        setShowAdvancedSearch(!showAdvancedSearch);
    };

    const addToFavorites = (item) => {
        if (!favorites.some(fav => fav.id === item.id)) {
            setFavorites([...favorites, item]);
        } else {
            alert("Property already added");
        }
    };

    const removeFromFavorites = (item) => {
        setFavorites(favorites.filter(fav => fav.id !== item.id));
    };

    const clearFavorites = () => {
        setFavorites([]);
    };

    const handleDragStart = (event, item) => {
        event.dataTransfer.setData("item", JSON.stringify(item));
    };

    const handleDropToFavorites = (event) => {
        const item = JSON.parse(event.dataTransfer.getData("item"));
        addToFavorites(item);
    };

    const handleDropToItems = (event) => {
        const item = JSON.parse(event.dataTransfer.getData("item"));
        removeFromFavorites(item);
    };

    const allowDrop = (event) => {
        event.preventDefault();
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-center mb-3">
                <button 
                    className="btn btn-primary"
                    onClick={toggleAdvancedSearch}
                >
                    {showAdvancedSearch ? "Hide Advanced Search" : "Show Advanced Search"}
                </button>
            </div>

            {showAdvancedSearch ? (
                <div>
                    <Form /> 
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
                            onDragOver={allowDrop}
                            onDrop={handleDropToItems}
                        >
                            <h4 style={{color: '#575e62', margin: '20px 20px' }}>Available</h4>
                            <div className="row">
                                {items.map((item, index) => (
                                    <div
                                        className="col-md-6"
                                        key={index}
                                        draggable
                                        onDragStart={(event) => handleDragStart(event, item)}
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
                                                <h5 className="card-title">{item.type}</h5>
                                                <p className="card-text"><strong>Price:</strong> Rs.{item.price}</p>
                                                <p className="card-text"><strong>Bedrooms:</strong> {item.bedrooms}</p>
                                                <p className="card-text"><strong>Location:</strong> {item.location}</p>
                                                <p className="card-text"><strong>Added Date:</strong> {`${item.added.day}-${item.added.month}-${item.added.year}`}</p>
                                                <Link to={`/property/${item.id}`} className="btn btn-link" style={{ textDecoration: 'none', float:'right' }}>View Details</Link> {/* Link to the property page */}
                                                <button className="btn btn-primary" onClick={() => addToFavorites(item)} style={{ float: 'left'}}>Add to Favorites</button>
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
                        onDragOver={allowDrop}
                        onDrop={handleDropToFavorites}
                    >
                        <h4 style={{color: '#575e62', margin: '20px 20px'}}>Favorites <i className="fas fa-heart"></i> </h4>

                        {favorites.length === 0 ? (
                            <p style={{margin:'20px 20px'}}><strong>No favorites yet.</strong></p>
                        ) : (
                            <>
                                <ul className="list-group">
                                    {favorites.map(fav => (
                                        <li
                                            key={fav.id}
                                            className="list-group-item d-flex justify-content-between align-items-center"
                                            style={{ height: '100px', marginBottom: '10px' }}
                                            draggable
                                            onDragStart={(event) => handleDragStart(event, fav)}
                                        >
                                            <div>
                                                <img 
                                                    src={`/${Array.isArray(fav.pictures) && fav.pictures.length > 0 ? fav.pictures[0] : 'default.webp'}`} 
                                                    alt={fav.type || 'No image available'} 
                                                    width="70" 
                                                    height="70" 
                                                    className="mr-2" 
                                                />
                                                {fav.type}
                                            </div>



                                            <button className="btn btn-danger btn-sm" onClick={() => removeFromFavorites(fav)}>Remove</button>
                                        </li>
                                    ))}
                                </ul>
                                <div className="d-flex justify-content-end">
                                    <button className="btn btn-warning mt-3" onClick={clearFavorites}>Clear All</button>
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
