import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { UPDATE_USER_PASSWORD_MUTATION } from '../../../../graphql/user/mutation';
import { FormikHelpers } from 'formik';
import toast from 'react-hot-toast';

interface FormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface UseUserSecurityReturn {
  t: (key: string) => string;
  handleUpdatePassword: (
    values: FormValues,
    resetForm: (nextState?: Partial<FormikHelpers<FormValues>['resetForm']>) => void
  ) => Promise<void>;
  loading: boolean;
  error: Error | undefined;
}

const useUserSecurity = (): UseUserSecurityReturn => {
  const { t } = useTranslation();

  const [updatePassword, { loading, error }] = useMutation(UPDATE_USER_PASSWORD_MUTATION);

  const handleUpdatePassword = async (
    { currentPassword, newPassword }: FormValues,
    resetForm: (nextState?: Partial<FormikHelpers<FormValues>['resetForm']>) => void
  ) => {
    try {
      await updatePassword({ variables: { currentPassword, newPassword } });
      toast.success(t('profile.security.password_updated_successfully'));
      resetForm();
    } catch (e: any) {
      if (e.networkError) {
        toast.error('Something went wrong. Please try again later.');
      } else if (e.graphQLErrors && e.graphQLErrors.length > 0) {
        toast.error(e.graphQLErrors[0].message);
      } else {
        toast.error('An unknown error occurred. Please try again.');
      }
    }
  };

  return {
    t,
    handleUpdatePassword,
    loading,
    error: error as Error | undefined
  };
};

export default useUserSecurity;
