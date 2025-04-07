import * as yup from 'yup';

export const engineValidationSchema = yup.object().shape({
  manufacturer: yup
    .object()
    .nullable()
    .required('Manufacturer is required'),

  categories: yup
    .object()
    .nullable()
    .required('Category is required'),

  subcategory: yup
    .object()
    .nullable()
    .required('SubCategory is required'),

  model: yup
    .object()
    .nullable()
    .required('Model is required'),

  year: yup
    .string()
    .required('Year is required'),

  engine1: yup
    .string()
    .required('Engine is required'),  
});
