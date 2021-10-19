import React, { useEffect, useState } from 'react';
import CardRecentOrders from '~/components/shared/cards/CardRecentOrders';
import CardSaleReport from '~/components/shared/cards/CardSaleReport';
import CardEarning from '~/components/shared/cards/CardEarning';
import CardStatics from '~/components/shared/cards/CardStatics';
import ContainerDashboard from '~/components/layouts/ContainerDashboard';
import { useDispatch } from 'react-redux';
import { toggleDrawerMenu } from '~/store/app/action';
import CardTopCountries from '~/components/shared/cards/CardTopCountries';
import Router from 'next/router';
import LoginPage from './login/index';
import { getUser } from '~/components/api/url-helper';
import HeaderMobile from '~/components/shared/headers/HeaderMobile';

const Index = () => {
    const dispatch = useDispatch();
    return (
        <>
        <div className="container">
             <LoginPage />
        </div>
           
        </>

    );
};

export default Index;
