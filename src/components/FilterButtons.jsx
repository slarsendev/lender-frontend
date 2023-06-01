import React from 'react';
import { STATUSES } from '../constants';

const FilterButtons = ({ activeStatus, handleStatus }) => {
  return (
    <div className='flex space-x-4 justify-end p-5 bg-gray-900  text-white items-center w-full'>
      <span className=''>Filters</span>
      {STATUSES.map(status => (
        <button
          key={status}
          className={`px-4 py-2 rounded-full  ${
            status === activeStatus
              ? 'bg-blue-500 text-white hover:bg-blue-500'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          onClick={() => handleStatus(status)}
        >
          {status}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
