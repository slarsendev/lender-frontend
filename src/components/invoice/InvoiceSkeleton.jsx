import React from 'react'

export const InvoiceSkeleton = () => {
  return (
    <div className='bg-white shadow-md rounded-md p-4 animate-pulse max-w-lg w-72 h-96 m-4'>
      <div className='animate-pulse flex items-center mb-4'>
        <div className='w-16 h-6 bg-gray-300 rounded'></div>
        <div className='ml-2 w-20 h-6 bg-gray-300 rounded'></div>
      </div>
      <div className='mb-4'>
        <div className='w-20 h-4 bg-gray-300 rounded'></div>
        <div className='mt-2 w-24 h-4 bg-gray-300 rounded'></div>
      </div>
      <div className='w-full h-48 bg-gray-300 rounded mb-4'></div>
      <div className='w-full flex justify-between'>
        <div className='w-16 h-6 bg-gray-300 rounded'></div>
        <div className='w-16 h-6 bg-gray-300 rounded'></div>
      </div>
    </div>
  );
}
