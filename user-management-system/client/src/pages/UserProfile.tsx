import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { fetchUserById } from '../store/slices/userSlice';

const UserProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { selectedUser, loading } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (id) {
      dispatch(fetchUserById(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!selectedUser) {
    return <div>User not found</div>;
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">{selectedUser.name}'s Profile</h2>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <p className="text-gray-700">{selectedUser.name}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <p className="text-gray-700">{selectedUser.email}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Bio
          </label>
          <p className="text-gray-700">{selectedUser.bio || 'No bio available'}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;