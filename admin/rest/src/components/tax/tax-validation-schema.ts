import * as yup from 'yup';

export const taxValidationSchema = yup.object().shape({
  name: yup.string().required('form:error-name-required'),
  rate: yup
    .number()
    .typeError('form:error-rate-must-number')
    .positive('form:error-rate-must-positive')
    .required('form:error-rate-required'),
});
