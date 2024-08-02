import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../store';
import { fetchUsers } from '../store/slices/userSlice';
import SearchBar from '../components/SearchBar';
import UserCard from '../components/UserCard';

const UserDirectory: React.FC = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state: RootState) => state.user);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">User Directory</h2>
      <SearchBar value={searchTerm} onChange={setSearchTerm} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filteredUsers.map(user => (
          <Link to={`/users/${user.id}`} key={user.id}>
            <UserCard user={user} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserDirectory;