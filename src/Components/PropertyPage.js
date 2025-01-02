import React from 'react';
import { useParams, Link } from 'react-router-dom'; // Import Link component
import { Carousel } from 'react-responsive-carousel'; // For image carousel
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Required CSS for carousel

// properties data 
import propertiesData from './properties.json';

const PropertyPage = () => {
  // Get the property id from the URL
  const { propertyId } = useParams();

  // Find the property details based on the property id, id is a string so we need to convert it to a number
  const property = propertiesData.properties.find(item => item.id === propertyId);

  if (!property) {
    return <div>Property not found.</div>;
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          {/* Box to display property details */}
          <div className="card shadow-sm" style={{backgroundColor: '#c4ced6'}}>
            <div className="card-body">
              <div className="row">
                <div className="col-md-12">
                  {/* Carousel for images */}
                  <Carousel showThumbs={true} infiniteLoop useKeyboardArrows>
                    {property.pictures && property.pictures.length > 0 ? (
                      property.pictures.map((picture, index) => (
                        <div key={index}>
                          <img src={`/${picture}`} alt={`Property ${index + 1}`} className="img-fluid" />
                        </div>
                      ))
                    ) : (
                      <div>
                        <img src="/default.webp" alt="No images available" className="img-fluid"/>
                      </div>
                    )}
                  </Carousel>

                  {/* Property Details */}
                  <h2 className="mt-3">{property.type}</h2>
                  <p><strong>Price:</strong> Rs.{property.price}</p>
                  <p><strong>Location:</strong> {property.location}</p>
                  <p><strong>Description:</strong></p>
                  <p>{property.description}</p>

                  {/* Back to Home Link */}
                  <Link to="/" className="btn btn-link">Back to Home</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyPage;
