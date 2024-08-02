import React from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  bio?: string;
}

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h3 className="text-xl font-bold mb-2">{user.name}</h3>
      <p className="text-gray-700 mb-2">{user.email}</p>
      {user.bio && <p className="text-gray-600">{user.bio}</p>}
    </div>
  );
};

export default UserCard;
