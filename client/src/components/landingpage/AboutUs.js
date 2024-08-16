import React from 'react';
import './styles.css';

const AboutUs = () => {
    return (
        <section className="aboutus-section">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-4">
                        <img 
                            src="https://cdn.dorik.com/66bf34110856a0001e5f2bd4/images/photo16219060673058f66b63dae88-T8X_L.jpeg" 
                            alt="About Us Image 1" 
                            className="aboutus-img"
                        />
                    </div>
                    <div className="col-md-4 text-center">
                        <p className="aboutus-description">
                            Tracking progress is crucial for Moringa School students to measure growth in their technical abilities. As students complete intensive coding projects during the program, a centralized system to store details about each project would create transparency around learning.
                        </p>
                        <h2 className="aboutus-title">We built this project tracker to empower Moringa students</h2>
                        <p className="aboutus-description">
                            With dedicated pages for each student project submission, this web app allows batches to upload links, descriptions, and notes to remember their work after graduation.
                        </p>
                        <button className="btn btn-primary">Upload projects</button>
                    </div>
                    <div className="col-md-4">
                        <img 
                            src="https://cdn.dorik.com/66bf34110856a0001e5f2bd4/images/photo150753729772524a1c029d3ca-_gf8v.jpeg" 
                            alt="About Us Image 2" 
                            className="aboutus-img"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
