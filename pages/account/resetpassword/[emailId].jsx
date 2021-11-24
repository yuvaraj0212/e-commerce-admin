import React from "react";
import Router,{useRouter} from 'next/router';
import { connect } from 'react-redux'
import Link from 'next/link';
import { Form, Input, Button, notification } from 'antd';
import { Resetps } from "~/components/api/url-helper";
const Resetpaassword = () => {
    const router=new useRouter();
    let id = router.query.emailId;
    console.log(id);
    const handleLoginSubmit = (values) => {
        console.log("values ", values);
        let data = { emailId: id, password: values.password, confirmPassword: values.confirmPassword };
        
        Resetps(data)
            .then(
                (res) => {
                    if (res.status == 200) {
                        notification.success({
                            message: res.data.message,
                            description: 'This feature has been updated later!',
                        });
                        Router.push('/login');
                    } else {
                        notification.warn({
                            message: res.data.message,
                            description: 'This feature has been updated later!',
                        });
                    }
                }
            ).catch(err => (console.log(err)));
    }

    return (
        <section className="ps-items-listing">
            <div className="ps-section__header simple">

            </div>
            <section className="ps-new-item">
                <Form
                    className="ps-form--account"
                    onFinish={handleLoginSubmit}
                >

                    <div className="ps-form__content">
                        <div className="row" >
                            <div className="offset-lg-3 col-lg-6 col-md-12 col-sm-12 col-12">
                                <figure className="ps-block--form-box mt-65 text-center">
                                    <figcaption>RESET PASSWORD</figcaption>
                                    <div className="ps-block__content w-md-75 container ">
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
                                                    placeholder="password"
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
                                                            'Please input your conformpassword!',
                                                    },
                                                ]}>
                                                <Input
                                                    className="form-control"
                                                    type="password"
                                                    placeholder="conformpassword..."
                                                />
                                            </Form.Item>
                                        </div>
                                        <div className="form-group text-right">
                                            <Link href="/login/createuser">
                                                <a>Create New Account !</a>
                                            </Link>
                                        </div>
                                        <div className="form-group submit">
                                            <button
                                                htmlType="submit"
                                                className="ps-btn success  ps-btn--fullwidth">
                                                Reset Password
                                            </button>
                                        </div>
                                    </div>
                                </figure>
                            </div>
                        </div>
                    </div>
                </Form>
            </section>
        </section>)
}


export default Resetpaassword;