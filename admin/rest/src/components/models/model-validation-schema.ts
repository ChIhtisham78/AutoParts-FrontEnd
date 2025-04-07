import * as yup from 'yup';

export const modelValidationSchema = yup.object().shape({
  manufacturer: yup
    .object()
    .nullable()
    .required('Manufacturer is required'),
  name: yup 
    .string()
    .required('Model name is required'),  
});
