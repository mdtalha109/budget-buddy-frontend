import React from 'react';
import { Button, Input } from '../../ui';
import { Link } from 'react-router-dom';
import useLoginForm from './hooks';

const Login: React.FC = () => {
  const { formik, loading, customError, t } = useLoginForm();

  return (
    <div className='rounded-lg border bg-card text-card-foreground shadow-sm mx-auto max-w-md'>
      <div className='flex flex-col p-6 space-y-1'>
        <h3 className="whitespace-nowrap tracking-tight text-3xl font-bold" data-id="3">{t('auth.login')}</h3>
        <p className="text-sm text-[#707070]" data-id="4">{t('auth.enter_your_credentials_to_access_your_account')}</p>
      </div>

      <div className='p-6'>
        <form className='space-y-4' onSubmit={formik.handleSubmit}>
          <div>
            <Input
              id='email'
              label={t('auth.email')}
              type="email"
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className='text-error'>{formik.errors.email}</div>
            ) : null}
          </div>
          <div>
            <Input
              label={t('auth.password')}
              id='password'
              type="password"
              {...formik.getFieldProps('password')}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className='text-error'>{formik.errors.password}</div>
            ) : null}
          </div>
          <Button type="submit" disabled={loading}>{t('auth.login')}</Button>
          {customError && <div className='text-error'>{customError}</div>}
        </form>

        <div className='mt-4 text-center text-sm text-[#707070]'>
          {t('auth.dont_have_an_accout')}?
          <Link to="/auth/register" className='pl-1 font-medium text-primary hover:underline'> {" "} {t('auth.signup_here')}</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
