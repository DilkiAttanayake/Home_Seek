# Estate Agent Client-side Web Application

## Overview

This project is a client-side web application for searching and displaying property listings. The application allows users to search properties based on various criteria such as property type, price, number of bedrooms, date added, and postcode area. The results are displayed dynamically and allow users to view individual property details, save their favorites, and more. The project was developed using **React JS** and focuses on providing a responsive, interactive, and accessible user interface.

## Features

- **Property Search**: Users can filter properties based on:
  - Type (House, Flat, Any)
  - Price (Min & Max)
  - Bedrooms (Min & Max)
  - Date Added (After specified date or between two dates)
  - Postcode area (e.g., BR1, NW1)
  
- **Results Display**: The search results are displayed with:
  - Property Image
  - Short Description
  - Price

- **Property Page**: Each property has a detailed page with:
  - Large Image
  - Thumbnail Images (6-8 pictures)
  - Short Description
  - Long Description
  - Floor Plan
  - Google Map
  
- **Favorites**: Users can add properties to their favorites list using:
  - Drag and Drop
  - Favorite Button/Icon
  - Remove from Favorites
  - Clear the Favorites List
  
- **Responsive Design**: The application is responsive on both large and small screens. Media queries are written manually to ensure a proper layout on mobile and tablet devices.

- **Aesthetics**: The application uses visual elements like headings, fonts, and images to maintain a clean, balanced, and visually appealing design.

- **Security**: Client-side security measures like CSP and HTML encoding are used to protect against potential hacking threats.

## Technologies Used

- **React JS**: For building the interactive user interface.
- **HTML5**: For the structure and form elements.
- **Bootsrap**: For responsive, mobile-first design and grid layout.
- **JavaScript**: For handling the logic and interactivity of the application.
- **Local Storage**: To store the user's favorite properties.

## Utilized Packages and Dependencies

- **React**: A JavaScript library for building user interfaces.
- **React Router**: A collection of navigational components.
- **React Bootstrap**: Bootstrap components built with React.
- **React Widgets**: A set of accessible, customizable, and localizable React components.
- **DOMPurify**: A DOM-only, super-fast, uber-tolerant XSS sanitizer for HTML, MathML, and SVG.

## Installation

To get started with the project:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/estate-agent-web-app.git
