import React, { useState, useEffect } from 'react';
import propertiesData from './properties.json'; // Import the JSON file

const Items = () => {
    const [favorites, setFavorites] = useState([]);
    const [items, setItems] = useState([]);

    // Use useEffect to load the data when the component mounts
    useEffect(() => {
        // Set the items state with the properties data
        setItems(propertiesData.properties);
    }, []);

    const addToFavorites = (item) => {
        if (!favorites.some(fav => fav.id === item.id)) {
            setFavorites([...favorites, item]);
        } else {
            alert("Item already added");
        }
    };

const removeFromFavorites = (item) => {
    setFavorites(favorites.filter(fav => fav.id !== item.id));
    alert("Item removed from favourites");
};

    const clearFavorites = () => {
        setFavorites([]);
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-8">
                    <div className="box" style={{ border: '1px solid grey', padding: '10px', borderRadius: '5px', backgroundColor: '#d9e6f0' }}>
                        <h4>Available</h4>
                        <div className="row">
                            {items.map((item, index) => (
                                <div className="col-md-6" key={index}>
                                    <div className="card mb-4" style={{ border: '3px solid gray', height: '550px', width: '400px' }}>
                                        <img src={item.picture} className="card-img-top" alt={item.type} />
                                        <div className="card-body">
                                            <h5 className="card-title">{item.type}</h5>
                                            <p className="card-text"><strong>Price:</strong> Rs.{item.price}</p>
                                            <p className="card-text"><strong>Bedrooms:</strong> {item.bedrooms}</p>
                                            <p className="card-text"><strong>Location:</strong> {item.location}</p>
                                            <p className="card-text"><strong>Added Date:</strong> {`${item.added.day}-${item.added.month}-${item.added.year}`}</p>
                                            <button className="btn btn-primary" onClick={() => addToFavorites(item)}>Add to Favorites</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="col-md-4" style={{ backgroundColor: '#d9e6f0', border: '1px solid gray', borderRadius: '5px', padding: '10px' }}>
                    <h4>Favorites</h4>
                    {favorites.length === 0 ? (
                        <p>No favorites yet.</p>
                    ) : (
                        <>
                            <ul className="list-group">
                                {favorites.map(fav => (
                                    <li key={fav.id} className="list-group-item d-flex justify-content-between align-items-center" style={{ height: '100px' }}>
                                        <div>
                                            <img src={fav.picture} alt={fav.type} width="70" height="70" className="mr-2" />
                                            {fav.type}
                                        </div>
                                        <button className="btn btn-danger btn-sm" onClick={() => removeFromFavorites(fav)}>Remove</button>
                                    </li>
                                ))}
                            </ul>
                            <button className="btn btn-warning mt-3" onClick={clearFavorites}>Clear All</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Items;
