import React, { Component, useEffect, useState } from 'react';
import { getUser, updateUser } from '../../api/url-helper';
import { Form, Input, Button, notification, Avatar, Upload } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import router from 'next/router';
// class FormAccountSettings extends Component {
const FormAccountSettings = () => {
    const [form] = Form.useForm();
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
    form.setFieldsValue({
        username: data.username,
        email: data.email,
        phone: data.phone,
        address: data.address
    })
    const handleSubmit = (values) => {
        values.id = data.id;
        values.password = data.password;
        console.log(values);
        try {
            updateUser(values)
                .then((res) => {
                    console.log(res);
                    console.log(res.status);
                    console.log(res.data.message);
                    if (res.status == 200) {
                        notification.success({
                            message: res.data.message,
                            description: 'This feature has been updated later!',
                        });
                        router.push('/dashboard')
                    } else {
                        notification.warn({
                            message: res.data.message,
                            description: 'This feature has been updated later!',
                        });
                    }
                })
        }
        catch (err) {
            notification.warn({
                message: err.message,
                description: 'This feature has been updated later!',
            })
        }
    }
    function beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    console.log(data);
    return (
        <div className="ps-my-account">
            <div className="container">
                <Form
                    form={form}
                    className="ps-form--account"
                    onFinish={handleSubmit}>

                    <div className="ps-tab active" id="register">
                        <div className="ps-form__content">
                            {/* <div className="form-group text-center">
                                <Form.Item
                                    name="mfile"
                                    type="file"

                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please input your mfile!',
                                        },
                                    ]}>
                                    <Upload
                                        beforeUpload={beforeUpload}
                                        listType="picture-card"
                                        className="avatar-uploader"
                                    >
                                        <Avatar size={124} icon={<UserOutlined />} />
                                    </Upload>
                                </Form.Item>
                            </div> */}
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="form-group ">
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
                                    </div></div>
                                <div className="col-sm-6">
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
                                    </div></div>
                            </div>

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

                            {/* <div className="form-group">
                                <Form.Item
                                    name="address"

                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please input your address!',
                                        },
                                    ]}>
                                    <Input.TextArea
                                        className="form-control "
                                        type="text"
                                        rows="6"
                                        placeholder="address"
                                    />
                                </Form.Item>
                            </div> */}

                            <div className="form-group submit">
                                <div className="ps-form__submit text-center">
                                    <button className="ps-btn ps-btn--gray mr-3">Cancel</button>
                                    <button className="ps-btn success">Update Profile</button>
                                </div>
                            </div>

                        </div>

                    </div>
                </Form>
            </div >
        </div >
    );
}


const mapStateToProps = state => {
    return state.auth;
};
export default FormAccountSettings;



// import React from 'react';

// const FormAccountSettings = () => {
//     return (
//         <form
//             className="ps-form--account-settings"
//             action="index.html"
//             method="get">
//             <div className="row">
//                 <div className="col-sm-6">
//                     <div className="form-group">
//                         <label>Full Name</label>
//                         <input
//                             className="form-control"
//                             type="text"
//                             placeholder=""
//                         />
//                     </div>
//                 </div>
//                 <div className="col-sm-6">
//                     <div className="form-group">
//                         <label>Display Name</label>
//                         <input
//                             className="form-control"
//                             type="text"
//                             placeholder=""
//                         />
//                     </div>
//                 </div>
//                 <div className="col-sm-12">
//                     <div className="form-group">
//                         <label>Email</label>
//                         <input
//                             className="form-control"
//                             type="text"
//                             placeholder=""
//                         />
//                     </div>
//                 </div>
//                 <div className="col-sm-6">
//                     <div className="form-group">
//                         <label>Role</label>
//                         <input
//                             className="form-control"
//                             type="text"
//                             placeholder=""
//                         />
//                     </div>
//                 </div>
//                 <div className="col-sm-6">
//                     <div className="form-group">
//                         <label>Address</label>
//                         <input
//                             className="form-control"
//                             type="text"
//                             placeholder=""
//                         />
//                     </div>
//                 </div>
//                 <div className="col-sm-12">
//                     <div className="form-group">
//                         <label>Bio</label>
//                         <textarea
//                             className="form-control"
//                             rows="6"
//                             placeholder=""></textarea>
//                     </div>
//                 </div>
//             </div>
            // <div className="ps-form__submit text-center">
            //     <button className="ps-btn ps-btn--gray mr-3">Cancel</button>
            //     <button className="ps-btn success">Update Profile</button>
            // </div>
//         </form>
//     );
// };

// export default FormAccountSettings;
