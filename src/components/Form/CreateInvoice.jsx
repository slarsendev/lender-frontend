import React, { useEffect, useState } from 'react';
import { getAllBorrowers } from '../../util/http';

const CreateInvoice = React.forwardRef(
  ({ initialValues, handleSubmit }, ref) => {
    const [values, setValues] = useState(initialValues);
    const [borrowerList, setBorrowerList] = useState([]);

    const handleChange = event => {
      const { name, value } = event.target;
      setValues(prevValues => ({
        ...prevValues,
        [name]: value
      }));
    };

    const handleFileChange = e => {
      setValues(prevValues => ({ ...prevValues, scan: e.target.files[0] }));
    };

    useEffect(()=> {
      (async () => {
        const result = await getAllBorrowers();
        setBorrowerList(result.data.data);
      })()
    },[])

    return (
      <form
        action='#'
        method='POST'
        className='mx-auto mt-8 max-w-2xl sm:mt-8'
        onSubmit={e => {
          handleSubmit(e, values);
        }}
        ref={ref}
      >
        <div className='grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2'>
          <div>
            <label
              htmlFor='first-name'
              className='block text-sm font-semibold leading-6 text-gray-900'
            >
              Amount *
            </label>
            <div className='mt-2.5'>
              <input
                type='number'
                name='amount'
                placeholder='22'
                className='form-input'
                value={values.amount}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor='due_date'
              className='block text-sm font-semibold leading-6 text-gray-900'
            >
              Due Date *
            </label>
            <div className='mt-2.5'>
              <input
                type='date'
                name='due_date'
                className='form-input'
                value={values.due_date}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='sm:col-span-2'>
            <label
              htmlFor='phone-number'
              className='block text-sm font-semibold leading-6 text-gray-900'
            >
              Status *
            </label>
            <div className='mt-2.5'>
              <select
                name='status'
                className='form-input'
                value={values.status}
                onChange={handleChange}
              >
                <option value='created'>Created</option>
                <option value='rejected'>Rejected</option>
                <option value='approved'>Approved</option>
                <option value='purchased'>Purchased</option>
                <option value='closed'>Closed</option>
              </select>
            </div>
          </div>
          <div className='sm:col-span-2'>
            <label
              htmlFor='phone-number'
              className='block text-sm font-semibold leading-6 text-gray-900'
            >
              Borrower Id *
            </label>
            <div className='mt-2.5'>
              <select
                name='borrower_id'
                className='form-input'
                value={values.borrower_id}
                onChange={handleChange}
              >
                {borrowerList?.map(borrower => (
                  <option key={borrower.id} value={borrower.id}>
                    {borrower.attributes.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className='sm:col-span-2'>
            <label className='block text-sm font-semibold leading-6 text-gray-900'>
              Upload File
            </label>
            <input
              className='form-file-input'
              type='file'
              id='formFile'
              onChange={handleFileChange}
            />
            <p
              className='mt-1 text-sm text-gray-500 dark:text-gray-300'
              id='file_input_help'
            >
              PDF, PNG, JPG (MAX. 9MB).
            </p>
          </div>
        </div>
      </form>
    );
  }
);

export default CreateInvoice;
