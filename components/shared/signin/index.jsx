import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { getToken, forgotpassword } from "components/api/url-helper";
import { Form, Input, notification, Modal, Button } from 'antd';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal2Visible: false,
        };
    }

    static getDerivedStateFromProps(props) {
        if (props.isLoggedIn === true) {

        }
        return false;
    }

    handleFeatureWillUpdate(e) {
        e.preventDefault();
        notification.open({
            message: 'Opp! Something went wrong.',
            description: 'This feature has been updated later!',
            duration: 500,
        });
    }

    handelsubmit = (values) => {

        getToken(values).then((res) => {
            console.log(res);
            console.log(res.data);
            console.log(res.data.result);
            // console.log(res.data.result.token);
            console.log(res.data.status);

            if (res.data.status === 200) {
                sessionStorage.setItem("token", JSON.stringify(res.data.result.token));
                return Router.push('/dashboard');

            } else {
                notification.warn({
                    message: res.data.message,
                    description: 'This feature has been updated later!',
                })
            }
        })

    };
    Visible = (modal2Visible) => {
        this.setState({ modal2Visible });
    }
    forgetpassword = (value) => {
        console.log(value);
        try {
            forgotpassword(value).then((res) => {
                console.log(res);

                if (res.status == 200) {
                    notification.success({
                        message: res.data.message
                    });
                } else {
                    notification.warn({
                        message: res.data.message
                    });
                }
                this.Visible(false);
            })
        } catch (error) {
            notification.error({
                message: error
            });
        }

    }
    render() {



        return (
            <>
                <section className="ps-items-listing">
                    <div className="ps-section__header simple">

                    </div>
                    <div className="ps-section__content">
                        <section className="ps-new-item">
                            <Form
                                className="ps-form ps-form--new-product"
                                onFinish={this.handelsubmit}
                            >
                                <div className="ps-form__content">
                                    <div className="row">
                                        <div className="offset-lg-3 col-lg-6 col-md-12 col-sm-12 col-12">
                                            <figure className="ps-block--form-box text-center">
                                                <figcaption>LOGIN PAGE</figcaption>
                                                <div className="ps-block__content w-md-75 container ">
                                                    <div className="form-group w-md-75">
                                                        <Form.Item
                                                            name="username"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message:
                                                                        'Please input your Email!',
                                                                },
                                                            ]}>
                                                            <Input
                                                                className="form-control  w-md-75"
                                                                type="text"
                                                                placeholder="enter your email"

                                                            />
                                                        </Form.Item>
                                                    </div>

                                                    <div className="form-group">
                                                        <Form.Item
                                                            name="password"

                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message:
                                                                        'Please input your password!',
                                                                },
                                                            ]}>
                                                            <Input
                                                                className="form-control"
                                                                type="text"
                                                                placeholder="enter your password"

                                                            />
                                                        </Form.Item>
                                                    </div>
                                                    <div className="text-left">
                                                        <Link href='/login/createuser'>Create New Account !</Link>
                                                    </div>
                                                    <div className="ps-form__bottom mb-lg-5">
                                                        <div></div>
                                                        <button className="ps-btn success  " htmlType="submit">Submit</button>
                                                    </div>
                                                </div>

                                            </figure>
                                        </div>
                                    </div>
                                </div>

                            </Form>
                        </section >
                    </div>
                </section >
            </>
        );
    }
}




export default Login;
