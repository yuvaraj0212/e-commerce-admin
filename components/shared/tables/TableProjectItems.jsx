import React, { useState, useEffect } from 'react';
import DropdownAction from '~/components/elements/basic/DropdownAction';
import moment from "moment";
import { Dropdown, Menu, notification } from 'antd';
import { useRouter } from 'next/router';
import Pagination from '~/components/elements/basic/Pagination';
import { pagination, productDelete } from '~/components/api/url-helper';
// import { withRouter } from 'react-router';
// import { useHistory } from 'react-router-dom';

const TableProjectItems = ({ products, search }) => {
    console.log(search);
    const [pageNo, setPageNo] = useState(0);
    const [total, setTotal] = useState([]);
    const [count, setCount] = useState(0);
    const [productItems, setProductItems] = useState([]);
    const router = useRouter();
    useEffect(() => {
        let counts = count + 1;
        setCount(counts)
        productList(0);
    }, [])
    const productList = (payload) => {
        pagination(payload).then(res => {
            console.log(res.data);
            const value = res.data.result.totalPages;
            if (count === 0) {
                for (let index = 0; index < value; index++) {
                    total.push(index);
                }
            }
            setPageNo(res.data.result.number);
            setProductItems(res.data.result.content)
        })
    }
    const handleNextPage = async (Num) => {
        console.log(Num);
        // let Num = pageNo + 1;
        if (pageNo > 0) {
            console.log("inside");
            productList(Num);
        }
        if (pageNo >= 0) {
            console.log("inside 2");
            productList(Num);
        }

    }
    const handlePagination = async (page) => {
        // Router.push(`/shop?page=${page}`);
        console.log(page);
        productList(page)
    }
    const deleteItem = (datas) => {
        productDelete(datas).then((res) => {
            productList(pageNo);
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
        sessionStorage.setItem("category", JSON.stringify(item.category.name));
        router.push({
            pathname: '/products/EditProduct',
            // asPath:"/products/EditProduct",
            query: { data: JSON.stringify(item) }
            // '/categories','/categories',item
        })
    }
    var tableItems;
    if (search) {
        tableItems = products.filter((item) => {
            if (search == '') {
                return item;
            } else if (item.name.toLowerCase().includes(search.toLowerCase())) {
                return item;
            }
        }).map((item, index) => {
            let badgeView;
            if (item) {
                badgeView = <span className="ps-badge success">Stock</span>;
            } else {
                badgeView = <span className="ps-badge gray">Out of stock</span>;
            }
            let deleteId = item.id;
            const menuView = (
                <Menu>
                    <Menu.Item key={item}>
                        <a className="dropdown-item" onClick={(e) => {
                            handleEdit(e, item)
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
    } else {
        tableItems = productItems.map((item, index) => {
            let badgeView;
            if (item) {
                badgeView = <span className="ps-badge success">Stock</span>;
            } else {
                badgeView = <span className="ps-badge gray">Out of stock</span>;
            }
            let deleteId = item.id;
            const menuView = (
                <Menu>
                    <Menu.Item key={item}>
                        <a className="dropdown-item" onClick={(e) => {
                            handleEdit(e, item)
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
    }
    console.log(total);
    return (
        <>
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
            <div className="ps-section__footer">
                <p>Show 10 in 30 items.</p>
                {/* <Pagination /> */}
                <ul className="pagination">
                    <li>
                        <a href="#" onClick={(e) => { let Num = pageNo - 1; handleNextPage(Num) }}>
                            <i className="icon icon-chevron-left"></i>
                        </a>
                    </li>
                    {
                        total.map((items) => {
                            let item = items + 1;
                            return <li key={item} className={pageNo === items ? 'active' : ''}>
                                <a href="#" onClick={() => handlePagination(items)}>{item}</a>
                            </li>
                        }
                        )
                    }
                    <li>
                        <a href="#" onClick={(e) => { let Num = pageNo + 1; handleNextPage(Num) }}>
                            {/* Next Page */}
                            <i className="icon-chevron-right" ></i>
                        </a>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default TableProjectItems;
