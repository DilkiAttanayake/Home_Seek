import React, { useState } from "react"; // Import React and useState hook
import propertiesData from "./properties.json"; 
import { Button, Form as BootstrapForm, Row, Col, Card, Alert } from "react-bootstrap"; // Import Bootstrap components
import Select from 'react-select'; // Import Select component for enhanced dropdowns
import { Link } from 'react-router-dom'; 
import DOMPurify from 'dompurify'; // Import DOMPurify for sanitizing HTML

const Form = () => {
  
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

  // Handle changes in the select dropdown
  const handleSelectChange = (selectedOption) => {
    setSearchCriteria((prevState) => ({
      ...prevState,
      type: selectedOption && selectedOption.value !== "Any" ? selectedOption.value : "",
    }));
  };

  // Handle the search button click
  const handleSearch = () => {
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
        <div className="search-form mb-4 p-4" style={{ border: "4px solid grey", borderRadius: "5px", width: "40%", backgroundColor: "#e3fdfd" }}>
          <BootstrapForm>
            <Row>
              <Col md={12} className="mb-3">
                <BootstrapForm.Label htmlFor="type">Type:</BootstrapForm.Label>
                <Select
                  id="type"
                  value={searchCriteria.type ? { label: searchCriteria.type, value: searchCriteria.type } : { label: "Any", value: "Any" }}
                  onChange={handleSelectChange}
                  options={[
                    { value: "Any", label: "Any" },
                    { value: "House", label: "House" },
                    { value: "Flat", label: "Flat" },
                  ]}
                  aria-label="Property Type"
                />
              </Col>

              <Col md={12} className="mb-3">
                <BootstrapForm.Label htmlFor="minPrice">Min Price:</BootstrapForm.Label>
                <BootstrapForm.Control
                  type="number"
                  name="minPrice"
                  value={searchCriteria.minPrice}
                  onChange={handleChange}
                  aria-label="Minimum Price"
                  style={{ borderColor: "grey" }}
                />
              </Col>

              <Col md={12} className="mb-3">
                <BootstrapForm.Label htmlFor="maxPrice">Max Price:</BootstrapForm.Label>
                <BootstrapForm.Control
                  type="number"
                  name="maxPrice"
                  value={searchCriteria.maxPrice}
                  onChange={handleChange}
                  aria-label="Maximum Price"
                  style={{ borderColor: "grey" }}
                />
              </Col>

              <Col md={12} className="mb-3">
                <BootstrapForm.Label htmlFor="minBedrooms">Min Bedrooms:</BootstrapForm.Label>
                <BootstrapForm.Control
                  type="number"
                  name="minBedrooms"
                  value={searchCriteria.minBedrooms}
                  onChange={handleChange}
                  aria-label="Minimum Bedrooms"
                  style={{ borderColor: "grey" }}
                />
              </Col>

              <Col md={12} className="mb-3">
                <BootstrapForm.Label htmlFor="maxBedrooms">Max Bedrooms:</BootstrapForm.Label>
                <BootstrapForm.Control
                  type="number"
                  name="maxBedrooms"
                  value={searchCriteria.maxBedrooms}
                  onChange={handleChange}
                  aria-label="Maximum Bedrooms"
                  style={{ borderColor: "grey" }}
                />
              </Col>

              <Col md={12} className="mb-3">
                <BootstrapForm.Label htmlFor="addedDate">Added Date:</BootstrapForm.Label>
                <BootstrapForm.Control
                  type="date"
                  name="addedDate"
                  value={searchCriteria.addedDate}
                  onChange={handleChange}
                  aria-label="Added Date"
                  style={{ borderColor: "grey" }}
                />
              </Col>

              <Col md={12} className="mb-3">
                <BootstrapForm.Label htmlFor="postcode">Postcode:</BootstrapForm.Label>
                <BootstrapForm.Control
                  type="text"
                  name="postcode"
                  value={searchCriteria.postcode}
                  onChange={handleChange}
                  aria-label="Postcode"
                  style={{ borderColor: "grey" }}
                />
              </Col>
            </Row>

            {error && <Alert variant="danger">{error}</Alert>} {/* Display error message if any */}

            <div className="d-flex justify-content-center">
              <Button variant="info" onClick={handleSearch} aria-label="Search Button">Search</Button> {/* Search button */}
            </div>
          </BootstrapForm>
        </div>
      </div>

      {/* Results */}
      <div className="results-box" style={{ border: "4px solid grey", borderRadius: "5px", padding: "20px", backgroundColor: "#e3fdfd" }}>
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
        ) : (
          <p><strong>No results found</strong></p> // Display message if no results found
        )}
      </div>
    </div>
  );
};

export default Form; // Export the Form component
