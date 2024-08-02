import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search users..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-2 border rounded"
    />
  );
};

export default SearchBar;
