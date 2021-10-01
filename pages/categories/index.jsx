// import React, { useEffect } from 'react';
// import ContainerDefault from '~/components/layouts/ContainerDefault';
// import TableCategoryItems from '~/components/shared/tables/TableCategoryItems';
// import Pagination from '~/components/elements/basic/Pagination';
// import FormCreateCategory from '~/components/shared/forms/FormCreateCategory';
// import FormSearchSimple from '~/components/shared/forms/FormSearchSimple';
// import HeaderDashboard from '~/components/shared/headers/HeaderDashboard';
// import { connect, useDispatch } from 'react-redux';
// import { toggleDrawerMenu } from '~/store/app/action';

// const CategoriesPage = () => {
//     const dispatch = useDispatch();
//     useEffect(() => {
//         dispatch(toggleDrawerMenu(false));
//     }, []);
//     return (
//         <ContainerDefault>
//             <HeaderDashboard
//                 title="Categories"
//                 description="Martfury Category Listing"
//             />
//             <section className="ps-dashboard ps-items-listing">
//                 <div className="ps-section__left">
//                     <div className="ps-section__header">
//                         <FormSearchSimple />
//                     </div>
//                     <div className="ps-section__content">
//                         <TableCategoryItems />
//                         <div className="ps-section__footer">
//                             <p>Show 5 in 30 items.</p>
//                             <Pagination />
//                         </div>
//                     </div>
//                 </div>
//                 <div className="ps-section__right">
//                     <FormCreateCategory />
//                 </div>
//             </section>
//         </ContainerDefault>
//     );
// };

// export default connect((state) => state.app)(CategoriesPage);


import React, { useEffect, useState } from "react";
import ContainerDefault from "~/components/layouts/ContainerDefault";
// import TableCategoryItems from '~/components/shared/tables/TableCategoryItems';
import Pagination from "~/components/elements/basic/Pagination";
// import FormCreateCategory from '~/components/shared/forms/FormCreateCategory';
import FormSearchSimple from "~/components/shared/forms/FormSearchSimple";
import HeaderDashboard from "~/components/shared/headers/HeaderDashboard";
import { connect, useDispatch } from "react-redux";
import { toggleDrawerMenu } from "~/store/app/action";
import {
    EditTwoTone, DeleteTwoTone, ExclamationCircleOutlined
} from '@ant-design/icons';
import Axios from "axios";
import moment from "moment";
import { Form, Input, notification, Divider, Tooltip, Modal } from 'antd';
// import TextArea from "rc-textarea";





const CategoriesPage = () => {
   
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [create, setCreate] = useState(true);
    const [edit, setEdit] = useState(false);
    const [editData, setEditdata] = useState({});
    const { confirm } = Modal;


    
    useEffect(() => {
        dispatch(toggleDrawerMenu(false));
        getCourseAllContent();
    }, []);

    const getCourseAllContent = async () => {
        Axios.get("http://localhost:8899/category/category-list", {
            //   headers: {
            //     'Authorization': baseurl.AuthToken,
            //   }
        }).then((res) => {
            // this.setState({
            //   data: res.data.result,
            // });
            setData(res.data.result);
        });
    };

    const handleCreateCategory = (value) => {
        console.log("new cat  ",value);
        Axios.post("http://localhost:8899/category/create-category", value).then(
            (res) => {

                console.log(res.data.status)
                if (res.data.status === 200) {
                    // setCategoryName('')
                    // setDescription('')
                    notification.success({
                        message: res.data.message,
                        description: 'This feature has been updated later!',
                    });
                    cancelCourse();
                    getCourseAllContent()
                }
                if (res.data.status === 400) {
                    notification.error({
                        message: res.data.message,
                        description: 'This feature has been updated later!',
                    });
                }



            }
        );
    };

    const cancelCourse = (event) => {
        document.getElementById("create-course-form").reset();
    }

    const handleRowClick = (event, data) => {
        setCreate(false)
        setEdit(true)
        setEditdata(data)
        console.log(data.id);
    };

    const handleEditCategory = (value) => {
        value.id=editData.id;
        console.log("edite cate  ",value);
        Axios.post("http://localhost:8899/category/update-category",value).then(
            (res) => {
                console.log(res);
                if (res.data.status === 200) {
                    setDescription('')
                    setCategoryName('')
                    setCreate(true)
                    setEdit(false)
                    getCourseAllContent();
                    notification.success({
                        message: res.data.message,
                        description: 'This feature has been updated later!',
                    });

                } else {
                    notification.error({
                        message: res.data.message,
                        description: 'This feature has been updated later!',
                    });
                }
            }
        );
    };

    const showDeleteConfirm = (event, id) => {
        confirm({
            title: 'Are you sure delete this category?',
            icon: <ExclamationCircleOutlined />,
            content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                Axios.delete("http://localhost:8899/category/delete-category?categoryId=" + id, {

                }).then((res) => {
                    if (res.data.status === 200) {
                        getCourseAllContent();
                        notification.success({
                            message: res.data.message,
                            description: 'This feature has been updated later!',
                        });

                    } else {
                        notification.error({
                            message: res.data.message,
                            description: 'This feature has been updated later!',
                        })
                    }

                })
            },
            onCancel() {
                console.log('Cancel');
            },

        });
    }

    
    return (
        <ContainerDefault>
            <HeaderDashboard
                title="Categories"
                description="Martfury Category Listing"
            />
            <section className="ps-dashboard ps-items-listing">
                <div className="ps-section__left">
                    <div className="ps-section__header">
                        <FormSearchSimple />
                    </div>
                    <div className="ps-section__content">
                        {/* <TableCategoryItems /> */}
                        <div className="table-responsive">
                            <table className="table ps-table">
                                <thead>
                                    <tr>
                                        <th>Category name</th>
                                        <th>Description</th>
                                        <th>Created at</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((data, index) => {
                                        return (
                                            <tr>
                                                <td>
                                                    <strong>{data.name}</strong>
                                                </td>
                                                <td>{data.desc}</td>
                                                <td>
                                                    {moment(data.createdDate).format(
                                                        "MMM Do YYYY, h:mm:ss "
                                                    )}
                                                </td>
                                                <td>
                                                    <Tooltip title="edit category">
                                                        <EditTwoTone onClick={(event) =>
                                                            handleRowClick(event, data)
                                                        } />
                                                    </Tooltip>

                                                    <Divider type="vertical" />
                                                    <Tooltip title="Delete category">
                                                        <DeleteTwoTone onClick={(e) => showDeleteConfirm(e, data.id)} />
                                                    </Tooltip>

                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="ps-section__footer">
                            <p>Show 5 in 30 items.</p>
                            <Pagination />
                        </div>
                    </div>
                </div>
                <div className="ps-section__right">
                    {create && (
                        <Form
                            className="ps-form ps-form--new"
                            id="create-course-form"
                            onFinish={handleCreateCategory}
                        >
                            <div className="ps-form__content">
                                <h4> Create category</h4>
                                <Form.Item
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Category must not to be empty",
                                        },
                                    ]}
                                >
                                    <Input
                                        className="form-control  w-md-75"
                                        type="text"
                                        placeholder="category name"
                                        // onChange={(e) => handleName(e)}
                                    />
                                </Form.Item>
                                <div className="form-group">
                                    <Form.Item
                                        name="desc"
                                        rules={[
                                            {
                                                required: true,
                                                message: "description must not to be empty",
                                            },
                                        ]}
                                    >
                                        <Input.TextArea
                                            className="form-control  w-md-75"
                                            type="text"
                                            rows="6"
                                            placeholder="description"
                                            // onChange={(e) => handleDesc(e)}
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="ps-form__bottom">
                                <button className="ps-btn ps-btn--gray" onClick={e => cancelCourse(e)}>Reset</button>
                                <button className="ps-btn ps-btn--sumbit success" htmlType="submit"
                                //  onClick={e => handleCreateCategory(e)}
                                 >
                                    Add new
                                </button>
                            </div>
                        </Form>
                    )}
                    {edit && (
                        <Form
                            className="ps-form ps-form--new"
                            id="create-course-form"
                            onFinish={handleEditCategory}
                        >
                            <div className="ps-form__content">

                                <div className="form-group">
                                    <h4>  Edit Category</h4>
                                    <Form.Item
                                        name="name"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Category must not to be empty",
                                            },
                                        ]}
                                    >
                                        <Input
                                            defaultValue={editData.name}
                                            className="form-control  w-md-75"
                                            type="text"
                                            placeholder="category name"
                                        />
                                    </Form.Item>
                                </div>
                            
                                <div className="form-group">
                        
                                    <Form.Item
                                        name="desc"
                                        rules={[
                                            {
                                                required: true,
                                                message: "description must not to be empty",
                                            },
                                        ]}
                                    >
                                        <Input.TextArea
                                            defaultValue={editData.desc}
                                            className="form-control  w-md-75"
                                            type="text"
                                            rows="6"
                                            placeholder="description"
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="ps-form__bottom">
                                <button className="ps-btn ps-btn--gray" onClick={e => cancelCourse(e)}>Reset</button>
                                <button className="ps-btn ps-btn--sumbit success" htmlType="submit">
                                    Update
                                </button>
                            </div>
                        </Form>
                    )}
                </div>
            </section>
        </ContainerDefault>
    );
}


export default (CategoriesPage);
