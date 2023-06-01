import React from 'react';
import { FilePreview } from './FilePreview';
import { updateInvoice } from '../../util/http';
import TrashIcon from '../../shared/icons/TrashIcon'

const InvoiceCard = ({
  invoiceNumber,
  amount,
  dueDate,
  status,
  file,
  handleClick = () => {},
  id,
  borrowerId,
  handleDelete = () => {}
}) => {
  const handlePurchase = async e => {
    e.stopPropagation();
    try {
      await updateInvoice({ id, status: 'purchased' });
      toast.success('Successfully Purchased!');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className='card-wrapper'
      onClick={() =>
        handleClick({
          id,
          amount,
          due_date: dueDate,
          status,
          scan: file,
          borrower_id: borrowerId
        })
      }
    >
      <div className='flex justify-between mb-4'>
        <h4 className='text-xl font-semibold text-gray-400'>{invoiceNumber}</h4>
        <span className='ml-2 px-2 py-1 bg-gray-900 text-white rounded-md text-sm'>
          {status}
        </span>
      </div>
      <div className='mb-4'>
        <p className='text-gray-600'>Amount: ${amount}</p>
        <p className='text-gray-600'>Due Date: {dueDate}</p>
      </div>
      <div className='mb-4 h-[180px] overflow-hidden'>
        <p className='text-gray-600'>File:</p>
        <FilePreview file={file} />
      </div>
      <div className='w-full flex justify-between'>
        <TrashIcon
          className='text-red-400 w-6'
          onClick={e => handleDelete(e, id)}
        />
        <button
          type='button'
          className='purchase-button'
          onClick={handlePurchase}
          disabled={status !== 'approved'}
        >
          Purchase
        </button>
      </div>
    </div>
  );
};

export default InvoiceCard;
