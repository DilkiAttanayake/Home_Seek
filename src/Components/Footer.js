import React from 'react'; // Importing React library
import '@fortawesome/fontawesome-free/css/all.min.css'; // Importing Font Awesome for icons

const Footer = () => {
    return (

        // Footer component with inline styles
        <footer className="footer" style={{ backgroundColor: '#e3f2fd', textDecoration: 'none', marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #90caf9' }}>
            <div className="container">
                <div className="row">

                    {/* Contact Us section */}
                    <div className="col-md-4 text-secondary">
                        <h5>Contact Us</h5>
                        <p>Email : homeseek99@gmail.com</p>
                        <p>Phone : +94 445 7561</p>
                        <p>Address: W/28, Oueens Road, Colombo 7</p>
                    </div>
                    
                    {/* Follow Us section with social media icons */}
                    <div className="col-md-4 text-center text-secondary">
                        <h5>Follow Us</h5>
                        <a href="https://facebook.com" className="me-2" style={{ fontSize: '28px', textDecoration: 'none' }}>
                            <i className="fab fa-facebook"></i>
                        </a>
                        <a href="https://twitter.com" className="me-2" style={{ fontSize: '32px', textDecoration: 'none' }}>
                            <i className="fab fa-twitter"></i> 
                        </a>
                        <a href="https://instagram.com" style={{ fontSize: '32px', textDecoration: 'none' }}>
                            <i className="fab fa-instagram"></i>
                        </a>
                    </div>

                    {/* Home link section */}
                    <div className="col-md-4 text-primary text-end">
                        <a href="/" style={{ textDecoration: 'none' }}> {/* navigate to root (home page) of the web page */}
                            <i className="fas fa-home"></i> Home
                        </a>
                    </div>

                </div>
                
                <div className="row mt-3">
                    {/* Footer copyright text */}
                    <div className="col text-center text-secondary">
                        <p>&copy; 2025 HomeSeek All Rights Reserved</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer; // Exporting Footer component
