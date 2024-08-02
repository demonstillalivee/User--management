import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/authSlice';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Login: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(login(values));
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <Field type="email" name="email" placeholder="Email" className="w-full p-2 border rounded" />
              <ErrorMessage name="email" component="div" className="text-red-500" />
            </div>
            <div>
              <Field type="password" name="password" placeholder="Password" className="w-full p-2 border rounded" />
              <ErrorMessage name="password" component="div" className="text-red-500" />
            </div>
            <button type="submit" disabled={isSubmitting} className="w-full bg-blue-500 text-white p-2 rounded">
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;