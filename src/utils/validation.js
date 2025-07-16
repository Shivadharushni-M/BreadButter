import * as Yup from 'yup';

export const profileValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  skills: Yup.string()
    .required('Skills are required')
    .test('skills', 'At least one skill required', (value) => {
      return value.split(',').length > 0;
    })
});