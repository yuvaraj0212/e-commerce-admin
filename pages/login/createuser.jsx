import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { getToken, forgotpassword, registerUser } from "components/api/url-helper";
import { Form, Input, notification, Modal, Button } from 'antd';
import ContainerDefault from '~/components/layouts/ContainerDefault';
import HeaderDashboard from '~/components/shared/headers/HeaderDashboard';

class register extends Component {
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

        registerUser(values).then((res) => {
            console.log(res);
            console.log(res.data);
            console.log(res.data.result);
            // console.log(res.data.result.token);
            console.log(res.data.status);

            if (res.data.status === 200) {
                sessionStorage.setItem("token", JSON.stringify(res.data.result.token));
                return Router.push('/login');

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
                                            <figure className="ps-block--form-box mt-65 text-center">
                                                <figcaption>REGISTER PAGE</figcaption>
                                                <div className="ps-block__content w-md-75 container ">
                                                    <div className="form-group w-md-75">
                                                        <div className="form-group">
                                                            <Form.Item
                                                                name="email"

                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        message:
                                                                            'Please input your email!',
                                                                    },
                                                                ]}>
                                                                <Input
                                                                    className="form-control"
                                                                    type="email"
                                                                    placeholder="Email address"

                                                                />
                                                            </Form.Item>
                                                        </div>
                                                        <div className="form-group">
                                                            <Form.Item
                                                                name="username"

                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        message:
                                                                            'Please input your UserName!',
                                                                    },
                                                                ]}>
                                                                <Input
                                                                    className="form-control"
                                                                    type="text"
                                                                    placeholder="UserName"

                                                                />
                                                            </Form.Item>
                                                        </div>
                                                        <div className="form-group form-forgot">
                                                            <Form.Item
                                                                name="password"

                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        message:
                                                                            'Please input your password!',
                                                                    },{
                                                                        pattern:/^.{6,}$/,
                                                                        message: `password contains at least Six characters`
                                                                    }
                                                                ]}>
                                                                <Input
                                                                    className="form-control"
                                                                    type="password"
                                                                    placeholder="Password..."

                                                                />
                                                            </Form.Item>
                                                        </div>
                                                        <div className="form-group form-forgot">
                                                            <Form.Item
                                                                name="confirmPassword"

                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        message:
                                                                            'Please input your confirmPassword!',
                                                                    },
                                                                ]}>
                                                                <Input
                                                                    className="form-control"
                                                                    type="password"
                                                                    placeholder="confirmPassword..."

                                                                />
                                                            </Form.Item>
                                                        </div>
                                                        <div className="form-group form-forgot">
                                                            <Form.Item
                                                                name="phone"

                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        message:
                                                                            'Please input your Mobile number!',
                                                                    },
                                                                ]}>
                                                                <Input
                                                                    className="form-control"
                                                                    type="tel"
                                                                    placeholder="Mobile number..."

                                                                />
                                                            </Form.Item>
                                                        </div>
                                                        <div className="text-left">
                                                            <Link href='/login'>Already have an account?</Link>
                                                        </div>
                                                        <div className="ps-form__bottom ">
                                                           <div className=""></div>
                                                            <button className="ps-btn success text-right" htmlType="submit">Submit</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </figure>
                                        </div>
                                    </div>
                                </div>

                            </Form>
                        </section >
                    </div>

                </section>
            </>

        );
    }
}




export default register;
