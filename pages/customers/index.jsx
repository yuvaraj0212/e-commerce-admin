import React, { useEffect, useState } from 'react';
import ContainerDefault from '~/components/layouts/ContainerDefault';
import Pagination from '~/components/elements/basic/Pagination';
import TableCustomerItems from '~/components/shared/tables/TableCustomerItems';
import FormSearchSimple from '~/components/shared/forms/FormSearchSimple';
import HeaderDashboard from '~/components/shared/headers/HeaderDashboard';
import { connect, useDispatch } from 'react-redux';
import { toggleDrawerMenu } from '~/store/app/action';
import { getListuser } from '~/components/api/url-helper';

const CustomersPage = () => {
    const [searchTerm, setsearchTerm] = useState('');
    const [customer, setcustomer] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(toggleDrawerMenu(false));
        getListuser().then(res=>{
            console.log(res.data);
            setcustomer(res.data.result)
    })
    },[])
    return (
        <ContainerDefault title="Customers">
            <HeaderDashboard
                title="Customers"
                description="Martfury Customer Listing"
            />
            <section className="ps-items-listing">
                <div className="ps-section__header simple">
                    <div className="ps-section__filter">
                        <form
                            className="ps-form--search-simple"
                            action="index.html"
                            method="get">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Search..."
                                onChange={e => setsearchTerm(e.target.value)}
                            />
                            <button>
                                <i className="icon icon-magnifier"></i>
                            </button>
                        </form>
                        {/* <FormSearchSimple /> */}
                    </div>
                    {/* <div className="ps-section__actions">
                        <a className="ps-btn success" href="#">
                            <i className="icon icon-plus mr-2"></i>Add Customer
                        </a>
                    </div> */}
                </div>
                <div className="ps-section__content">
                    <TableCustomerItems customers={customer} search={searchTerm}/>
                </div>
                <div className="ps-section__footer">
                    <p>Show 10 in 30 items.</p>
                    <Pagination />
                </div>
            </section>
        </ContainerDefault>
    );
};
export default connect((state) => state.app)(CustomersPage);
