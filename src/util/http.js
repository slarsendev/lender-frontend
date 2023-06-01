import axios from 'axios';

export const getInvoices = async (status = 'all', page = 1) => {
  try {
    const data = await axios(`http://localhost:3000/invoices?status=${status}&page=${page}`);
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

export const getAllBorrowers = async () => {
    try {
    return await axios.get('http://localhost:3000/borrowers');
  } catch (error) {
    console.error(error.message);
  }
}

export const createInvoice = async body => {
  try {
    await axios.post('http://localhost:3000/invoices', body);
    return getInvoices();
  } catch (error) {
    console.error(error.message);
  }
};

export const updateInvoice = async ({id, ...body}) => {
  try {
    await axios.put(`http://localhost:3000/invoices/${id}`, body);
    return getInvoices();
  } catch (error) {
    console.error(error.message);
  }
};

export const createBorrower = async body => {
  try {
    return await axios.post('http://localhost:3000/borrowers', body);
  } catch (error) {
    console.error(error.message);
  }
};

export const deleteInvoice = async id => {
  try {
    await axios.delete(`http://localhost:3000/invoices/${id}`);
    return getInvoices();
  } catch (error) {
    console.error(error.message);
  }
};
