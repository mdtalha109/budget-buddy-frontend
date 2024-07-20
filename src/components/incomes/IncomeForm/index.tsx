import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {  useMutation } from '@apollo/client';
import graphqlResponseSerializer from '../../../utils/graphqlResponseSerializer';
import { Button, Input } from '../../ui';
import toast from 'react-hot-toast';
import { ADD_INCOME } from '../../../graphql/incomes/mutation';
import { useTranslation } from 'react-i18next';




interface IncomeFormProps {
    operationSuccess: () => void;
}

const IncomeForm: React.FC<IncomeFormProps> = ({ operationSuccess }) => {
    const [addIncome] = useMutation(ADD_INCOME);

    const { t } = useTranslation();

    const formik = useFormik({
        initialValues: {
            description: '',
            amount: '',
            date: '',
            category: '',

        },
        validationSchema: Yup.object({
            description: Yup.string().required('Required'),
            amount: Yup.number().required('Required').positive('Must be positive'),
            date: Yup.date().required('Required'),
            category: Yup.string().required('Required'),

        }),
        onSubmit: async (values) => {
            try {
                let createdExpense = await addIncome({ variables: { ...values, amount: parseFloat(values.amount) } });
                const { success, message } = graphqlResponseSerializer(createdExpense, 'addIncome');
                if (success) {
                    operationSuccess()
                    toast.success(message)
                }
            } catch (err) {
                console.log("error: ", err)
            }

        },
    });

    return (
        <>
            <div className='rounded-lg border bg-card text-card-foreground shadow-sm mx-auto max-w-md'>
                <div className='p-6'>
                    <form className='space-y-4' onSubmit={formik.handleSubmit}>
                        <div>
                            <Input
                                id='description'
                                label={t("common.description")}
                                type="text"
                                {...formik.getFieldProps('description')}
                            />
                            {formik.touched.description && formik.errors.description ? (
                                <div className='text-error'>{formik.errors.description}</div>
                            ) : null}
                        </div>

                        <div>
                            <Input
                                id='amount'
                                label={t("common.amount")}
                                type="number"
                                {...formik.getFieldProps('amount')}
                            />
                            {formik.touched.amount && formik.errors.amount ? (
                                <div className='text-error'>{formik.errors.amount}</div>
                            ) : null}
                        </div>

                        <div>
                            <Input
                                id='category'
                                label={t("common.category")}
                                type="text"
                                {...formik.getFieldProps('category')}
                            />
                            {formik.touched.category && formik.errors.category ? (
                                <div className='text-error'>{formik.errors.category}</div>
                            ) : null}
                        </div>

                        <div>
                            <Input
                                id='date'
                                label='Date'
                                type="date"
                                {...formik.getFieldProps('date')}
                            />
                            {formik.touched.date && formik.errors.date ? (
                                <div className='text-error'>{formik.errors.date}</div>
                            ) : null}
                        </div>

                        <Button type="submit">{t("expense.add_income")}</Button>
                    </form>
                </div>
            </div>

        </>


    );
};

export default IncomeForm;
