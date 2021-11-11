import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import moment from "moment";

const TableOrdersItems = ({ orderItems, search }) => {
    // const [orderItems, setOrderItems] = useState([])
    // useEffect(() => {
    //     axios.get('http://localhost:8899/order-list').then((res) => {
    //         console.log(res);
    //         setOrderItems(res.data.result);
    //     })
    // }, []);
    // const orderItems = [
    //     {
    //         id: '#A580',
    //         date: 'Aug 15, 2020',
    //         product: 'Unero Black Military',
    //         payment: true,
    //         fullfillment: 'delivered',
    //         total: '$56.00',
    //     },
    //     {
    //         id: '#B260',
    //         date: 'Aug 16, 2020',
    //         product: 'Marsh Speaker',
    //         payment: false,
    //         fullfillment: 'delivered',
    //         total: '$56.00',
    //     },
    //     {
    //         id: '#A583',
    //         date: 'Aug 17, 2020',
    //         product: 'Lined Blend T-Shirt',
    //         payment: true,
    //         fullfillment: 'In Progress',
    //         total: '$516.00',
    //     },
    //     {
    //         id: '#A523',
    //         date: 'Aug 18, 2020',
    //         product: 'DJI MAcvic Quadcopter',
    //         payment: false,
    //         fullfillment: 'delivered',
    //         total: '$112.00',
    //     },
    //     {
    //         id: '#A112',
    //         date: 'Aug 19, 2020',
    //         product: 'Black T-Shirt',
    //         payment: true,
    //         fullfillment: 'Cancel',
    //         total: '$30.00',
    //     },
    // ];
    var index = 0;
    const tableItemsView = orderItems.filter((item) => {

        // let productName = item.orders[0].productModel
        // if (item.orders.length > 1) {
        //     const orders = item.orders;
        //     const exist = orders.map(({ productModel }) => {
        //         if (search === '') {
        //             return productModel;
        //         } else if (productModel.name.toLowerCase().includes(search.toLowerCase())) {
        //             return productModel;
        //         }
        //         return productModel;
        //     })
        // } else {
        if (search === '') {
            return item;
        } else if (productName.name.toLowerCase().includes(search.toLowerCase())) {
            return item;
        }
        // }
    }).map((item) => {
        console.log(item);
        let badgeView, fullfillmentView;
        // const menuView = (
        //     <Menu>
        //         <Menu.Item key={0}>
        //             <a className="dropdown-item" href="#">
        //                 Edit
        //             </a>
        //         </Menu.Item>
        //         <Menu.Item key={0}>
        //             <a className="dropdown-item" href="#">
        //                 <i className="icon-t"></i>
        //                 Delete
        //             </a>
        //         </Menu.Item>
        //     </Menu>
        // );
        if (item.status === true) {
            badgeView = <span className="ps-badge success">Paid</span>;
        } else {
            badgeView = <span className="ps-badge gray">Unpaid</span>;
        }
        switch (item.orderStatus) {
            case 'In Progress':
                fullfillmentView = (
                    <span className="ps-fullfillment warning">In Progress</span>
                );
                break;
            case 'Cancel':
                fullfillmentView = (
                    <span className="ps-fullfillment danger">Cancel</span>
                );
                break;
            case "ordered":
                fullfillmentView = (
                    <span className="ps-fullfillment success">ordered</span>
                );
                break;
            default:
                fullfillmentView = (
                    <span className="ps-fullfillment success">delivered</span>
                );
                break;
        }

        if (item.orders.length > 1) {
            const orders = item.orders;
            const product = orders.map(({ productModel, quantity }) => {
                index = index + 1;
                return (
                    <tr key={productModel.id}>
                        <td>{index}</td>
                        <td><img src={productModel.imageURL} alt={productModel.code} style={{ width: '50px' }} /> </td>
                        <td>
                            <strong> {productModel.name}</strong>
                        </td>
                        <td>{badgeView}</td>
                        <td>{fullfillmentView}</td>
                        <td>
                            {/* <Link href="/orders/order-detail"> */}
                            {/* <a> */}
                            {moment(item.orderDate).format("MMMM Do YYYY, h:mm:ss a")}
                            {/* </a> */}
                            {/* </Link> */}
                        </td>
                        <td>
                            <strong>
                                <span>x{quantity}</span>
                            </strong>{"  "}
                        </td>

                        <td className='text-center'>
                            <b>₹{quantity * productModel.price}.00</b>
                        </td>

                    </tr>)
            });
            return product;
        } else {
            index = index + 1;
            return <tr key={index}>
                <td>{index}</td>
                <td><img src={item.orders[0].productModel.imageURL} alt={item.orders[0].productModel.code} style={{ width: '50px' }} /> </td>
                <td>
                    <strong> {item.orders[0].productModel.name}</strong>
                </td>
                <td>{badgeView}</td>
                <td>{fullfillmentView}</td>
                <td>
                    {/* <Link href="/orders/order-detail"> */}
                    {/* <a> */}
                    {moment(item.orderDate).format("MMMM Do YYYY, h:mm:ss a")}
                    {/* </a> */}
                    {/* </Link> */}
                </td>
                <td>
                    <strong>
                        <span>x{item.orders[0].quantity}</span>
                    </strong>{"  "}
                </td>
                <td className='text-center'>
                    <b>₹{item.orders[0].quantity * item.orders[0].productModel.price}.00</b>
                </td>

            </tr>
        }

    });
    console.log(tableItemsView);
    return (
        <div className="table-responsive">
            <table className="table ps-table">
                <thead className='text-center'>
                    <tr>
                        <th>No</th>
                        <th>Product</th>
                        <th>ProductName</th>
                        <th>Payment</th>
                        <th>Fullfillment</th>
                        <th>Date</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        {/* <th></th> */}
                    </tr>
                </thead>
                <tbody className='text-center'>{tableItemsView}</tbody>
            </table>
        </div>
    );
};

export default TableOrdersItems;
