import React from 'react';
import { Layout } from './components';
import { InvoiceList } from './components/invoice/InvoiceList';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <>
      <Layout>
        <InvoiceList />
      </Layout>
      <ToastContainer/>
    </>
  );
};

export default App;
