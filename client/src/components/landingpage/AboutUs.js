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
                        Welcome to the Project Tracker
Our platform is designed to empower students, instructors, and administrators by providing a centralized system to track, manage, and showcase the progress of coding projects completed throughout the program.
                        </p>
                        <h2 className="aboutus-title">Our Mission </h2>
                        <p className="aboutus-description">
                      
                        We believe that hands-on projects are at the core of a student’s learning journey. However, keeping track of these projects over time can be challenging, especially when it comes to revisiting past work for reference, showcasing skills to potential employers, or collaborating with peers. Our mission is to make this process seamless by offering a user-friendly platform that ensures every project, from inception to completion, is well-documented, easily accessible, and presented professionally.
                        </p>
                        
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
