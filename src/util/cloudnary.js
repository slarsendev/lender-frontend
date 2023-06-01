import axios from 'axios';
import { toast } from 'react-toastify';
import { isFileValid } from './validators';

export const uploadImage = async formData => {
    if (!isFileValid(formData)) throw new Error('Validation Failed');
    try {
      const result = await axios.post(
        'https://api.cloudinary.com/v1_1/needbuddy/image/upload',
        formData
      );
      if (result.data.secure_url !== '')
        return result.data.secure_url;

    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
};
