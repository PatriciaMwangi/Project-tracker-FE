import React from 'react';
import './AboutUs.css';

function AboutUsSection() {
  return (
    <section className="about-us">
      <div className="container">
        <img src="https://cdn.dorik.com/66ace0e425863b0011ade333/images/photo-1543269865-cbf427effbad-km4Q9.jpeg" alt="About Us" />
        <h2>Our vision is to make work inspiring and fulfilling</h2>
        <p>
          Over time, students at Moringa School work on numerous projects that
          often get forgotten due to the lack of a tracking system. To address this, I
          am developing a comprehensive system to keep track of all projects done
          over time. This system aims to create a project bank for future reference
          and foster a network of students interested in collaboration and idea
          exchange.
        </p>
      </div>
    </section>
  );
}

export default AboutUsSection;
