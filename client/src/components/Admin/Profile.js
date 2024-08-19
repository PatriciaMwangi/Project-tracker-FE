import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const user = useSelector((state) => state.user.user);

  if (!user) {
    return <p>No user is logged in.</p>;
  }

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Profile Information</h5>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          {user.profilePicture && (
            <img 
              src={user.profilePicture} 
              alt="Profile" 
              className="img-thumbnail" 
              style={{ maxWidth: '150px' }} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
