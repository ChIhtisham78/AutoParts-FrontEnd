import { ShippingType } from '@/types';

import * as yup from 'yup';

export const shippingValidationSchema = yup.object().shape({
  small_amount: yup.mixed().when('type', {
    is: (value: string) => value !== ShippingType.Free,
    then: () =>
      yup
        .number()
        .typeError('form:error-amount-must-number')
        .positive('form:error-amount-must-positive')
        .required('form:error-amount-required'),
  }),
  medium_amount: yup.mixed().when('type', {
    is: (value: string) => value !== ShippingType.Free,
    then: () =>
      yup
        .number()
        .typeError('form:error-amount-must-number')
        .positive('form:error-amount-must-positive')
        .required('form:error-amount-required'),
  }),
  large_amount: yup.mixed().when('type', {
    is: (value: string) => value !== ShippingType.Free,
    then: () =>
      yup
        .number()
        .typeError('form:error-amount-must-number')
        .positive('form:error-amount-must-positive')
        .required('form:error-amount-required'),
  }),
});
