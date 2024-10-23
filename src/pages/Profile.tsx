import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Profile: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      {currentUser && (
        <div>
          <p><strong>Email:</strong> {currentUser.email}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;