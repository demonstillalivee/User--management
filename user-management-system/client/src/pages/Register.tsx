import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { register } from '../store/slices/authSlice';

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const Register: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <Formik
        initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
        validationSchema={RegisterSchema}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(register(values));
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <Field type="text" name="name" placeholder="Name" className="w-full p-2 border rounded" />
              <ErrorMessage name="name" component="div" className="text-red-500" />
            </div>
            <div>
              <Field type="email" name="email" placeholder="Email" className="w-full p-2 border rounded" />
              <ErrorMessage name="email" component="div" className="text-red-500" />
            </div>
            <div>
              <Field type="password" name="password" placeholder="Password" className="w-full p-2 border rounded" />
              <ErrorMessage name="password" component="div" className="text-red-500" />
            </div>
            <div>
              <Field type="password" name="confirmPassword" placeholder="Confirm Password" className="w-full p-2 border rounded" />
              <ErrorMessage name="confirmPassword" component="div" className="text-red-500" />
            </div>
            <button type="submit" disabled={isSubmitting} className="w-full bg-blue-500 text-white p-2 rounded">
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;