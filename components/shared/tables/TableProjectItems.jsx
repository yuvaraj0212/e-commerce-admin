import React, { useState, useEffect } from 'react';
import DropdownAction from '~/components/elements/basic/DropdownAction';
import axios from "axios";
import moment from "moment";
import { Dropdown, Menu, notification } from 'antd';
import { useRouter } from 'next/router';
// import { withRouter } from 'react-router';
// import { useHistory } from 'react-router-dom';

const TableProjectItems = () => {
    const [productItems, setProductItems] = useState([]);
    const router = useRouter();
    useEffect(() => {
        productList();
    }, [])
    const productList = () => {
        axios.get("http://localhost:8899/product/product-list").then(res => {
            console.log(res.data);
            setProductItems(res.data.result)
        })
    }
    const deleteItem = (datas) => {
        axios({
            method: 'delete',
            url: ' http://localhost:8899/product/delete-product?productId=' + datas,
        }).then((res) => {
            console.log(res);
            console.log(res.status);
            productList();
            if (res.data.status === 200) {
                notification.success({
                    message: res.data.message,
                    description: 'This feature has been updated later!',
                });
            } else {
                console.log(res.data.message);
                notification.warn({
                    message: res.data.message,
                })
            }
        })
    }

    const handleEdit = (event, item) => {
        sessionStorage.setItem("category",JSON.stringify(item.category.name));
        router.push({
            pathname:'/products/EditProduct',
            // asPath:"/products/EditProduct",
            query:{data:JSON.stringify(item)}
            // '/categories','/categories',item
        })
    }
    const tableItems = productItems.map((item, index) => {
        let badgeView;
        if (item) {
            badgeView = <span className="ps-badge success">Stock</span>;
        } else {
            badgeView = <span className="ps-badge gray">Out of stock</span>;
        }
        let deleteId = item.id;
        console.log("Id ", deleteId);
        console.log("item ", item);
        console.log("data ", item.data);
        const menuView = (
            <Menu>
                <Menu.Item key={item}>
                    <a className="dropdown-item" onClick={(e) => {
                        handleEdit(e,item)
                    }}>
                        <i className="icon-pencil mr-2"></i>
                        Edit
                    </a>
                </Menu.Item>
                <Menu.Item key={deleteId}>
                    <a className="dropdown-item" onClick={() => {
                        console.log("delete ", deleteId);
                        deleteItem(deleteId);
                    }}>
                        <i className="icon-trash2 mr-2"></i>
                        Delete
                    </a>
                </Menu.Item>
            </Menu>
        );
        return (
            <tr key={index}>
                <td>{index + 1}</td>
                <td><img src={item.imageURL} style={{ width: '50px' }} /></td>
                <td>
                    <a href="#">
                        <strong>{item.name}</strong>
                    </a>
                </td>
                <td>{item.details}</td>
                <td>{item.filename}</td>
                <td>
                    <strong>{item.price}</strong>
                </td>
                <td>
                    {item.category.name}
                </td>
                <td>{moment(item.createDate).format("MMMM Do YYYY, h:mm:ss a")}</td>
                <td>
                    {/* <DropdownAction data={item}/> */}

                    <Dropdown overlay={menuView} className="ps-dropdown">
                        <a
                            onClick={(e) => e.preventDefault()}
                            className="ps-dropdown__toggle">
                            <i className="icon-ellipsis"></i>
                        </a>
                    </Dropdown>
                </td>
            </tr>
        );
    });
    return (
        <div className="table-responsive">
            <table className="table ps-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Product Image</th>
                        <th>Product Name</th>
                        <th>description</th>
                        <th>Filename</th>
                        <th>Price</th>
                        <th>Categories</th>
                        <th>Date</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{tableItems}</tbody>
            </table>
        </div>
    );
};

export default TableProjectItems;
