import React from 'react';
import FormHeaderSearch from '~/components/shared/forms/FormHeaderSearch';
import Link from 'next/link';

const HeaderDashboard = ({
    title = 'Dashboard',
    description = 'Everything here',
}) => {
    const logout = () => {
        sessionStorage.clear();
        return router.push("/login");
    }
    return (
        <header className="header--dashboard">
            <div className="header__left">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
            <div className="header__center">
                {/* <FormHeaderSearch /> */}
            </div>
            <div className="header__right">
                <Link href="/login">
                    <a className="header__site-link" onClick={logout}>
                        <span>View your store</span>
                        <i className="icon-exit"></i>
                    </a>
                </Link>
            </div>
        </header>
    );
};

export default HeaderDashboard;
