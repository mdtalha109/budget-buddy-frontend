import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { REGISTER_MUTATION } from '../../../../graphql/auth/mutation';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const useRegisterForm = () => {
  const [registerMutation, { loading }] = useMutation(REGISTER_MUTATION);
  const [customError, setCustomError] = useState<string | null>(null);
  const { t } = useTranslation();
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required(t('auth.required', { required_entity: 'Name' })),
      email: Yup.string().email(t('auth.invalid_email')).required(t('auth.required', { required_entity: 'Email' })),
      password: Yup.string().required(t('auth.required', { required_entity: 'Password' })),
    }),
    onSubmit: async (values) => {
      try {
        setCustomError(null);
        await registerMutation({
          variables: { name: values.name, email: values.email, password: values.password },
        });
        navigate('/auth/login');
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

export default useRegisterForm;
