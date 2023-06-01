import React, { useRef, useState } from 'react';
import CreateInvoice from './Form/CreateInvoice';
import Modal from '../shared/Modal';
import CreateBorrower from './Form/CreateBorrower';
import { INTIAL_VALUES } from '../constants';
import { createBorrower, createInvoice } from '../util/http';
import { toast } from 'react-toastify';
import { uploadImage } from '../util/cloudnary';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBorrowerActive, setIsBorrowerActive] = useState(false);
  const formRef = useRef(null);

  const handleToggle = active => {
    setIsBorrowerActive(active);
    setIsOpen(!isOpen);
  };

  const handleCreate = () => {
    formRef.current.requestSubmit();
  };

  const handleCreateBorrower = async e => {
    e.preventDefault();
    if (!e.target[0].value) return toast.error('name is required!');
    try {
      await createBorrower({ name: e.target[0].value });
      handleToggle();
      toast.success('Borrower created!');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleCreateInvoice = async (e, body) => {
    e.preventDefault();
    if (body.scan) {
      const formData = new FormData();
      formData.append('file', body.scan);
      formData.append('upload_preset', 'yigjczww');
      try {
        const imageUrl = await uploadImage(formData);
        body.scan = imageUrl;
      } catch (error) {
        return;
      }
    }
    if (!body.amount || !body.due_date || !body.status)
      return toast.error('Fill the (*) required fields');
    createInvoice(body);
    toast.success('Invoice created');
    handleToggle();
  };

  return (
    <header className='text-gray-600 body-font'>
      <div className='mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between'>
        <a className='flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            className='w-10 h-10 text-white p-2 bg-gray-900 rounded-full'
            viewBox='0 0 24 24'
          >
            <path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'></path>
          </svg>
          <span className='ml-3 text-xl'>Lender</span>
        </a>
        <div>
          <button
            onClick={() => handleToggle(true)}
            className='header-button'
          >
            Create Borrower
          </button>
          <button
            onClick={() => handleToggle(false)}
            className='header-button'
          >
            Create Invoice
          </button>
        </div>
      </div>
      <Modal
        modalTitle={isBorrowerActive ? 'Create Borrower' : 'Create Invoice'}
        handleToggle={handleToggle}
        isOpen={isOpen}
        handleAction={handleCreate}
        buttonTitle='Create'
      >
        {isBorrowerActive ? (
          <CreateBorrower ref={formRef} handleSubmit={handleCreateBorrower} />
        ) : (
          <CreateInvoice
            initialValues={INTIAL_VALUES}
            ref={formRef}
            handleSubmit={handleCreateInvoice}
          />
        )}
      </Modal>
    </header>
  );
};
