import React from 'react'
import { Header } from './Header';

export const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className='flex flex-col'>{children}</div>
    </>
  );
};
