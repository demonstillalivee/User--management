import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { RootState } from '../store';
import { fetchProfile, updateProfile } from '../store/slices/userSlice';

const ProfileSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  bio: Yup.string(),
});

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
      <Formik
        initialValues={{ name: user.name, email: user.email, bio: user.bio || '' }}
        validationSchema={ProfileSchema}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(updateProfile(values));
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
              <Field as="textarea" name="bio" placeholder="Bio" className="w-full p-2 border rounded" />
              <ErrorMessage name="bio" component="div" className="text-red-500" />
            </div>
            <button type="submit" disabled={isSubmitting} className="w-full bg-blue-500 text-white p-2 rounded">
              Update Profile
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Profile;