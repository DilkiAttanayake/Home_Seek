import React, { useState } from "react"; // Import React and useState hook
import propertiesData from "./properties.json";
import { Button, Row, Col, Card, Alert } from "react-bootstrap"; // Import Bootstrap components
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify'; // Import DOMPurify for sanitizing HTML
import { Combobox, DateTimePicker } from 'react-widgets'; // Import React Widgets
import "react-widgets/styles.css"  // Import React Widgets CSS

const Form = ({ favoriteProperties }) => {

  // Define state for search criteria, results, and error message
  const [searchCriteria, setSearchCriteria] = useState({
    type: "",
    minPrice: "",
    maxPrice: "",
    minBedrooms: "",
    maxBedrooms: "",
    addedDate: "",
    postcode: "",
  });

  const [results, setResults] = useState([]); // State to store search results
  const [error, setError] = useState(""); // State to store error message

  // Handle input changes and sanitize the input to prevent XSS
  const handleChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = DOMPurify.sanitize(value);
    setSearchCriteria((prevState) => ({
      ...prevState,
      [name]: sanitizedValue,
    }));
  };

  const [hasSearched, setHasSearched] = useState(false); // Tracks if a search has been executed


  // Handle changes in the select dropdown
  const handleSelectChange = (value) => {
    setSearchCriteria((prevState) => ({
      ...prevState,
      type: value !== "Any" ? value : "",
    }));
  };

  // Handle the search button click
  const handleSearch = () => {
    setHasSearched(true); // Mark that a search has been performed

    // Validate the form to ensure that price and bedroom ranges are valid
    if (
      (searchCriteria.minPrice && searchCriteria.maxPrice && searchCriteria.minPrice > searchCriteria.maxPrice) ||
      (searchCriteria.minBedrooms && searchCriteria.maxBedrooms && searchCriteria.minBedrooms > searchCriteria.maxBedrooms)
    ) {
      setError("Min value should not be greater than Max value.");
      return;
    }

    // Filter the properties based on search criteria
    const filteredResults = propertiesData.properties.filter((property) => {
      const addedDate = new Date(
        `${property.added.year}-${property.added.month}-${property.added.day}`
      );

      const matchesType =
        searchCriteria.type === "" || searchCriteria.type === property.type;
      const matchesPrice =
        (searchCriteria.minPrice === "" || property.price >= searchCriteria.minPrice) &&
        (searchCriteria.maxPrice === "" || property.price <= searchCriteria.maxPrice);
      const matchesBedrooms =
        (searchCriteria.minBedrooms === "" || property.bedrooms >= searchCriteria.minBedrooms) &&
        (searchCriteria.maxBedrooms === "" || property.bedrooms <= searchCriteria.maxBedrooms);
      const matchesAddedDate =
        searchCriteria.addedDate === "" || new Date(searchCriteria.addedDate) <= addedDate;
      const matchesPostcode =
        searchCriteria.postcode === "" || property.location.startsWith(searchCriteria.postcode);

      return (
        matchesType &&
        matchesPrice &&
        matchesBedrooms &&
        matchesAddedDate &&
        matchesPostcode
      );
    });

    setResults(filteredResults); // Update the results state with filtered properties
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center">
      <div className="search-form mb-4 p-4" style={{ border: "2px solid grey", borderRadius: "5px", backgroundColor: "#A4D8E1", width: "100%" }}>
  
          <form>
          <Row className="g-3">
            <Col md={6}>
            <label htmlFor="type" className="form-label">Type</label>
                <Combobox
                  id="type"
                  value={searchCriteria.type || "Any"}
                  onChange={handleSelectChange}
                  data={["Any", "House", "Flat"]}
                  aria-label="Property Type"
                />
              </Col>

              <Col md={3}>
                <label htmlFor="minPrice" className="form-label">Min Price</label>
                <input
                  type="number"
                  className="form-control"
                  name="minPrice"
                  value={searchCriteria.minPrice}
                  onChange={handleChange}
                  aria-label="Minimum Price"
                />
              </Col>

              <Col md={3}>
                <label htmlFor="maxPrice" className="form-label">Max Price</label>
                <input
                  type="number"
                  className="form-control"
                  name="maxPrice"
                  value={searchCriteria.maxPrice}
                  onChange={handleChange}
                  aria-label="Maximum Price"
                />
              </Col>


              <Col md={3}>
                <label htmlFor="minBedrooms" className="form-label">Min Bedrooms</label>
                <input
                  type="number"
                  className="form-control"
                  name="minBedrooms"
                  value={searchCriteria.minBedrooms}
                  onChange={handleChange}
                  aria-label="Minimum Bedrooms"
                />
              </Col>


              <Col md={3}>
                <label htmlFor="maxBedrooms" className="form-label">Max Bedrooms</label>
                <input
                  type="number"
                  className="form-control"
                  name="maxBedrooms"
                  value={searchCriteria.maxBedrooms}
                  onChange={handleChange}
                  aria-label="Maximum Bedrooms"
                />
              </Col>

              <Col md={6}>
                <label htmlFor="addedDate" className="form-label">Added Date</label>
                <DateTimePicker
                  name="addedDate"
                  value={searchCriteria.addedDate}
                  onChange={date => setSearchCriteria({ ...searchCriteria, addedDate: date })}
                  aria-label="Added Date"
                />
              </Col>

              <Col md={6}>
                <label htmlFor="postcode" className="form-label">Postcode</label>
                <input
                  type="text"
                  className="form-control"
                  name="postcode"
                  value={searchCriteria.postcode}
                  onChange={handleChange}
                  aria-label="Postcode"
                />
              </Col>
            </Row>

            {error && <Alert variant="danger">{error}</Alert>} {/* Display error message if any */}

            <div className="d-flex justify-content-center mt-4">
              <Button variant="info" onClick={handleSearch} aria-label="Search Button">Search</Button> {/* Search button */}
            </div>
          </form>
        </div>
      </div>

      {/* Results */}
      {hasSearched && (
      <div className="results-box" style={{ border: "2px solid grey", borderRadius: "5px", padding: "20px", backgroundColor: "#A4D8E1" }}>

        {results.length > 0 ? (
          results.map((property) => (
            <Card className="mb-3" key={property.id}>
              <Row className="g-0">
                <Col md={4}>
                  <Card.Img
                    src={`/${Array.isArray(property.pictures) && property.pictures.length > 0 ? property.pictures[0] : 'default.webp'}`}
                    className="img-fluid rounded-start"
                    alt={property.type || 'Property Image'}
                  />
                </Col>
                <Col md={8}>
                  <Card.Body>
                    <Card.Title>{DOMPurify.sanitize(property.type)}</Card.Title>
                    <Card.Text>{DOMPurify.sanitize(property.description)}</Card.Text>
                    <Card.Text><strong>Bedrooms:</strong> {DOMPurify.sanitize(property.bedrooms)}</Card.Text>
                    <Card.Text><strong>Location:</strong> {DOMPurify.sanitize(property.location)}</Card.Text>
                    <Card.Text><strong>Added Date:</strong> {DOMPurify.sanitize(`${property.added.day}-${property.added.month}-${property.added.year}`)}</Card.Text>
                    <Link to={`/property/${property.id}`} className="btn btn-link" style={{ textDecoration: 'none', float: 'right' }}>View Details</Link>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          ))
        )  : hasSearched ?  (
          <p>No results found</p> // Display message if no results found
        ) : null} {/* Display nothing before searching */}
      </div>
      )}

      <h4 style={{ color: '#575e62', margin: '20px 20px' }}>Favorites <i className="fas fa-heart"></i> </h4>

      {favoriteProperties.length === 0 ? (
        <p style={{ margin: '20px 20px' }}><strong>No favorites yet.</strong></p> // Display message if no favorites
      ) : (
        <>
          <ul className="list-group">
            {favoriteProperties.map(fav => (
              <li
                key={fav.id}
                className="list-group-item d-flex justify-content-between align-items-center"
                style={{ height: '100px', marginBottom: '10px', backgroundColor: '#d9e6f0' }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src={`/${Array.isArray(fav.pictures) && fav.pictures.length > 0 ? fav.pictures[0] : 'default.webp'}`}
                    alt={fav.type || 'No image available'}
                    width="70"
                    height="70"
                    className="mr-2"
                  />
                  <span style={{ marginLeft: '20px' }}>{fav.type}</span>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Form;
