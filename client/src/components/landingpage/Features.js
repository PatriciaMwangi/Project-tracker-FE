import React from 'react';
import './Features.css';

function FeatureCard({ title, description }) {
  return (
    <div className="feature-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Features() {
  const featuresData = [
    {
      title: 'Organize',
      description: 'Break down projects into actionable tasks, customize boards, set due dates, and more.'
    },
    {
      title: 'Monitor Progress',
      description: 'Track project updates with at-a-glance overviews, activity feeds, and calendar views.'
    },
    {
      title: 'Collaborate Effectively',
      description: 'Work seamlessly with your team through comments, task assignments, and real-time notifications.'
    },
    {
      title: 'Achieve Project Goals',
      description: 'Utilize task lists, due date reminders, and project reports to complete projects on time.'
    }
  ];

  return (
    <section className="features">
      {featuresData.map((feature, index) => (
        <FeatureCard key={index} title={feature.title} description={feature.description} />
      ))}
    </section>
  );
}

export default Features;
