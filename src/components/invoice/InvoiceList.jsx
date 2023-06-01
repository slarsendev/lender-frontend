import React, { useEffect, useRef, useState } from 'react';
import { InvoiceSkeleton } from './InvoiceSkeleton';
import { deleteInvoice, getInvoices, updateInvoice } from '../../util/http';
import Modal from '../../shared/Modal';
import CreateInvoice from '../Form/CreateInvoice';
import FilterButtons from '../FilterButtons';
import { toast } from 'react-toastify';
import { uploadImage } from '../../util/cloudnary';
import { validateInvoiceStatus } from '../../util/validators';
const LazyLoadedCard = React.lazy(() => import('./InvoiceCard'));

export const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('All');
  const formRef = useRef(null);

  useEffect(() => {
    setIsLoading(true);
    let timer;
    getInvoices(status.toLowerCase())
      .then(result => {
        setInvoices(result.data.data);
        timer = setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      })
      .catch(e => {
        setIsLoading(false);
        console.error(e);
      });

    return () => clearTimeout(timer);
  }, [status]);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleCardClick = data => {
    handleToggle();
    setData(data);
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    const result = await deleteInvoice(id);
    setInvoices(result.data.data);
    toast.success('Invoice delete!');
  };

  const handleUpdate = () => {
    formRef.current.requestSubmit();
  };

  const handleSubmit = async (e, body) => {
    e.preventDefault();
    const invoice = invoices.find(invoice => invoice.id == body.id);

    if (!validateInvoiceStatus(invoice.attributes.status, body.status))
      return toast.error("you can't perform this action");

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

    const result = await updateInvoice(body);
    setInvoices(result.data.data);
    toast.success('Invoice updated!');
    handleToggle();
  };

  const handleStatus = activeStatus => {
    setStatus(activeStatus);
  };

  return (
    <>
      <Modal
        modalTitle='Edit Invoice'
        handleToggle={handleToggle}
        isOpen={isOpen}
        handleAction={handleUpdate}
        buttonTitle={'update'}
      >
        <CreateInvoice
          initialValues={data}
          ref={formRef}
          handleSubmit={handleSubmit}
        />
      </Modal>
      <FilterButtons handleStatus={handleStatus} activeStatus={status} />
      <div className='flex flex-wrap'>
        {isLoading
          ? Array(10)
              .fill(0)
              .map((_, index) => <InvoiceSkeleton key={index} />)
          : invoices?.map(val => (
              <LazyLoadedCard
                key={val.id}
                amount={val.attributes.amount}
                dueDate={val.attributes.due_date}
                invoiceNumber={val.attributes.number}
                status={val.attributes.status}
                file={val.attributes.scan}
                id={val.id}
                borrowerId={val.attributes.borrower.id}
                handleClick={handleCardClick}
                handleDelete={handleDelete}
              />
            ))}
      </div>
    </>
  );
};
