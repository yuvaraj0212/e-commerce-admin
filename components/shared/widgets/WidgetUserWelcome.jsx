import React, { useState, useEffect } from 'react';
import { getUser } from '~/components/api/url-helper';
import Router, { withRouter } from 'next/router';
import Link from 'next/link';
import router from 'next/router';
const WidgetUserWelcome = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        let data = JSON.parse(sessionStorage.getItem('token'))
        console.log(data);

        const config = {
            headers: {
                Authorization: `Bearer ${data}`
            }
        };
        getUser(config).then(
            res => {
                setData(res.data.result);
            }
        )
    }, []);
    const logout = () => {
        sessionStorage.clear();
        return router.push("/login");
    }
    return (data ? (
        <div className="ps-block--user-wellcome">
            <div className="ps-block__left">
                <img src="/img/user/admin.jpg" alt="" />
            </div>
            <div className="ps-block__right">
                <p>
                    HELLO<a href="">{data.username}</a>
                </p>
            </div>
            <div className="ps-block__action">
                <Link href="/login">
                    <a onClick={logout}>
                        <i className="icon-exit"></i>
                    </a>
                </Link>

            </div>
        </div>) : (<div className="ps-block--user-wellcome">
            <div className="ps-block__left">
                <img src="/img/user/admin.jpg" alt="" />
            </div>
            <div className="ps-block__right">
                <p>
                    Hello,<Link href="/login">Soho Store</Link>
                </p>
            </div>
            <div className="ps-block__action">
                <a href="#">
                    <i className="icon-exit"></i>
                </a>
            </div>
        </div>)
    );
};

export default WidgetUserWelcome;
