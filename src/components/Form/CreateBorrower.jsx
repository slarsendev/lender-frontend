import React from 'react';

const CreateBorrower = React.forwardRef(({ handleSubmit }, ref) => {
  return (
    <div className='grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2'>
      <div className='sm:col-span-2'>
        <form onSubmit={handleSubmit} ref={ref}>
          <label
            htmlFor='phone-number'
            className='block text-sm font-semibold leading-6 text-gray-900'
          >
            Name
          </label>
          <div className='mt-2.5'>
            <input
              type='text'
              name='name'
              placeholder='john'
              className='form-input'
            />
          </div>
        </form>
      </div>
    </div>
  );
});

export default CreateBorrower;
