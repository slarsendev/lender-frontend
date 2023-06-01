import React from 'react';
import { PLACEHOLDER } from '../../constants'

export const FilePreview = ({file}) => {
  return (
    <div>
      <img
        src={file ? file : PLACEHOLDER}
        alt='File Preview'
        className='max-w-full h-full rounded-md object-contain'
      />
    </div>
  );
};
