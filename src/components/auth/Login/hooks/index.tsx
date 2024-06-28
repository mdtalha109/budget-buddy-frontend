import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../../../../graphql/auth/mutation';
import { setToken } from '../../../../redux/authSlice';
import { useTranslation } from 'react-i18next';
import { setUser } from '../../../../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const useLoginForm = () => {
  const dispatch = useDispatch();
  const [loginMutation, { loading }] = useMutation(LOGIN_MUTATION);
  const [customError, setCustomError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email(t('auth.invalid_email')).required(t('auth.required', { required_entity: 'Email' })),
      password: Yup.string().required(t('auth.required', { required_entity: 'Password' })),
    }),
    onSubmit: async (values) => {
      try {
        setCustomError(null);
        const { data } = await loginMutation({
          variables: { email: values.email, password: values.password },
        });
        dispatch(setToken(data.login.token));
        dispatch(setUser(data.login.user));
        navigate('/dashboard')
        
      } catch (e: any) {
        if (e.networkError) {
          setCustomError('Something went wrong. Please try again later.');
        } else if (e.graphQLErrors && e.graphQLErrors.length > 0) {
          setCustomError(e.graphQLErrors[0].message);
        } else {
          setCustomError('An unknown error occurred. Please try again.');
        }
      }
    },
  });

  return {
    formik,
    loading,
    customError,
    t,
  };
};

export default useLoginForm;
