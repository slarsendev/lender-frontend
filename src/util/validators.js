export const validateInvoiceStatus = (invoiceStatus, action) => {
  if (action === 'purchased' && invoiceStatus !== 'approved') return false;

  if (action === 'closed' && invoiceStatus !== 'purchased') return false;

  return true;
};

export const isFileValid = formData => {
  const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  const maxSize = 9 * 1024 * 1024; // 9MB
  const file = formData.get('file');

  if (!allowedFileTypes.includes(file.type)) {
    console.error(
      'Invalid file type. Only images (JPEG/PNG) and PDFs are allowed.'
    );
    toast.error('invalid file type');
    return false;
  }
  if (file.size > maxSize) {
    toast.error('File size exceed ,Max size is 9MB');
    return false;
  }
  return true;
};
