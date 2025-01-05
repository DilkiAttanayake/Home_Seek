import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import DOMPurify from 'dompurify'; // Import DOMPurify for sanitizing HTML

const PropertyDetails = ({ property }) => {
  return (
    
    <Tabs>

      <TabList>
        <Tab><strong>Description</strong></Tab>
        <Tab><strong>Floor Plan</strong></Tab>
        <Tab><strong>Map</strong></Tab>
      </TabList>

      <TabPanel>
        {/* Display property description */}
        <p>{property.card}</p>
      </TabPanel>

      <TabPanel>
        {/* Display floor plan image */}
        <h4 style={{ color: '#575e62' }}>Floor Plan</h4>
        <img 
          src={`/${property.floorPlan}`} 
          alt="Floor Plan" 
          style={{ width: '100%', height: '550px' }} 
        />
      </TabPanel>
      
      <TabPanel>
        {/* Display Google Map with sanitized location */}
        <h4 style={{ color: '#575e62' }}>Google Map</h4>
        <iframe
          src={`https://www.google.com/maps?q=${DOMPurify.sanitize(property.location)}&output=embed`}
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Google Map"
        ></iframe>
      </TabPanel>

    </Tabs>
    
  );
};

export default PropertyDetails;