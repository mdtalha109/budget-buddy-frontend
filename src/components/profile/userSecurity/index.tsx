import React from 'react';
import { Card, CardContent, CardFooter } from '../../ui/Card';
import { Button, Input } from '../../ui';
import { useFormik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import useUserSecurity from './hooks/useUserSecurity';

interface FormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const UserSecurity: React.FC = () => {
  const { t, handleUpdatePassword, loading, error } = useUserSecurity();

  const formik = useFormik<FormValues>({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string()
        .required(t('profile.security.current_password_required')),
      newPassword: Yup.string()
        .required(t('profile.security.new_password_required')),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], t('profile.security.passwords_do_not_match'))
        .required(t('profile.security.confirm_password_required'))
    }),
    onSubmit: (values, { resetForm }: FormikHelpers<FormValues>) => {
      handleUpdatePassword(values, resetForm);
    }
  });

  return (
    <div className="grid gap-6">
      <div className="grid gap-2">
        <h2 className="text-2xl font-bold">{t('profile.security.title')}</h2>
        <p className="text-muted-foreground">{t('profile.security.description')}</p>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <Card>
          <CardContent className="grid gap-6">
            <div className="space-y-2">
              <Input
                name="currentPassword"
                label={t('profile.security.current_password')}
                id="current-password"
                type="password"
                value={formik.values.currentPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.currentPassword && formik.errors.currentPassword && (
                <p className="text-red-500">{formik.errors.currentPassword}</p>
              )}
            </div>

            <div className="space-y-2">
              <Input
                name="newPassword"
                label={t('profile.security.new_password')}
                id="new-password"
                type="password"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.newPassword && formik.errors.newPassword && (
                <p className="text-red-500">{formik.errors.newPassword}</p>
              )}
            </div>

            <div className="space-y-2">
              <Input
                name="confirmPassword"
                label={t('profile.security.confirm_password')}
                id="confirm-password"
                type="password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <p className="text-red-500">{formik.errors.confirmPassword}</p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex justify-end gap-4">
            <Button variant="danger-outline" type="button">
              {t('common.cancel')}
            </Button>
            <Button type="submit" disabled={loading}>
              {t('profile.security.update_password')}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default UserSecurity;
