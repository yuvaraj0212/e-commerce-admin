import React, { useEffect } from 'react';
import ContainerDefault from '~/components/layouts/ContainerDefault';
import Pagination from '~/components/elements/basic/Pagination';
import Login from '~/pages/login/index';
import FormSearchSimple from '~/components/shared/forms/FormSearchSimple';
import HeaderDashboard from '~/components/shared/headers/HeaderDashboard';
import { connect, useDispatch } from 'react-redux';
import { toggleDrawerMenu } from '~/store/app/action';

const LoginPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(toggleDrawerMenu(false));
    }, []);
    return (
        
            <Login />
       
    );
};
export default LoginPage;
