import React from 'react'; // import the React library to use JSX and React features
import Nav from './Components/Nav'; // import the navigation bar component

// the main app component of the React application
function App() {
  return (

    <div className="App">

        {/* Render the navigation bar */}
      <Nav />
    </div>
  );
}

// export the App component so it can be used in other parts of the application
export default App;


//This is the main component that renders the Nav component.