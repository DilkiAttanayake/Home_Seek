import React from 'react';
import Nav from './components/Nav'; // import the navigation bar component
import Footer from './components/Footer'; // import the footer component
import Search from './components/Search';
import Items from './components/Items'; // import the Items component to display properties


// the main app component of the React application
function App() {
  return (
    <div className="App">
      {/* Render the navigation bar */}
      <Nav />

      {/* Render the Search component */}
      <Search/>

      {/* Render the Items component to display the list of properties */}
      <Items />

      {/* Render the footer */}
      <Footer />
    </div>
  );
}

// export the App component so it can be used in other parts of the application
export default App;
