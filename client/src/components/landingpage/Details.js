import React from 'react';
import './styles.css';

const Details = () => {
    return (
        <section className="details-section">
            <div className="container">
                <h2 className="section-title">Track projects and contribute</h2>
                <p className="section-subtitle">
                    The projecttracker app enables students to efficiently track their project workflow. Features allow adding projects, collaborators, and project details like descriptions and GitHub links.
                </p>
                <div className="details-cards">
                    <div className="details-card">
                        <img src="https://cdn.dorik.com/66bf34110856a0001e5f2bd4/images/photo1430080369629afa4c2ae5121-SMRRq.jpeg" alt="Detailed Project Views" className="details-card-img" />
                        <h3 className="details-card-title">Detailed Project Views</h3>
                        <p className="details-card-description">
                            Once projects are added, students can view all details in an organized project dashboard. Things like collaborators, project descriptions, and GitHub repo links allow students to coordinate effectively.
                        </p>
                    </div>
                    <div className="details-card">
                        <img src="https://cdn.dorik.com/66bf34110856a0001e5f2bd4/images/photo15172929877190369a794ec0f-J3hMx.jpeg" alt="Admin Dashboard Access" className="details-card-img" />
                        <h3 className="details-card-title">Admin Dashboard Access</h3>
                        <p className="details-card-description">
                            For administrators and teachers, the projecttracker app includes an admin dashboard to manage student cohorts. Administrators can view or remove existing student projects.
                        </p>
                    </div>
                    <div className="details-card">
                        <img src="https://cdn.dorik.com/66ace0e425863b0011ade333/images/photo-1543269865-cbf427effbad-km4Q9.jpeg" alt="Another Feature" className="details-card-img" />
                        <h3 className="details-card-title">Class & Cohort Insights</h3>
                        <p className="details-card-description">
                        Filter through projects based on different cohorts, classes, or technologies. This makes it easy for both students and instructors to find relevant projects, compare outcomes, and gain insights into learning progress.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Details;
