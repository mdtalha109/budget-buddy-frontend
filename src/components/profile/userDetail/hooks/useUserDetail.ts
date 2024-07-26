import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useAuth from '../../../../hooks/useAuth';
import { AppDispatch } from '../../../../redux/store';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../../../redux/userSlice';
import toast from 'react-hot-toast';

const useUserDetail = () => {
    const { user } = useAuth();
    const { t } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();

    const [formData, setFormData] = useState({
        name: '',
        email: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const updateUserDetail = () => {
        dispatch(updateUser({ id: user.id, username: formData.name }))
            .unwrap()
            .then((res) => toast.success(res.message))
            .catch((err) => {
                if (err.graphQLErrors && err.graphQLErrors.length > 0) {
                    toast.error(err.graphQLErrors[0].message);
                } else {
                    toast.error('Something went wrong. Please try again later.');
                }
            });
    };

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || ''
            });
        }
    }, [user]);

    return {t, formData, handleInputChange, updateUserDetail} 
};

export default useUserDetail;
