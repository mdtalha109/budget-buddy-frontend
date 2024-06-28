import React from 'react';
import { Button, Input } from '../../ui';
import { Link } from 'react-router-dom';
import useRegisterForm from './hooks';

const Register: React.FC = () => {
  const { formik, loading, customError, t } = useRegisterForm();

  return (
    <div className='rounded-lg border bg-card text-card-foreground shadow-sm mx-auto max-w-md'>
      <div className='flex flex-col p-6 space-y-1'>
        <h3 className="whitespace-nowrap tracking-tight text-3xl font-bold" data-id="3">{t('auth.create_an_accout')}</h3>
        <p className="text-sm text-[#707070]" data-id="4">{t('auth.enter_your_details_to_get_started')}</p>
      </div>

      <div className='p-6'>
        <form className='space-y-4' onSubmit={formik.handleSubmit}>
          <div>
            <Input
              label={t('auth.name')}
              id='name'
              type="text"
              {...formik.getFieldProps('name')}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className='text-error'>{formik.errors.name}</div>
            ) : null}
          </div>
          <div>
            <Input
              label={t('auth.email')}
              id='email'
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
          <Button type="submit" disabled={loading}>{t('auth.register')}</Button>
          {customError && <div className='text-error'>{customError}</div>}
        </form>

        <div className='mt-4 text-center text-sm text-[#707070]'>
          {t('auth.already_have_an_account')}?
          <Link to="/auth/login" className='pl-1 font-medium text-primary hover:underline'> {" "}{t('auth.login_here')}</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
