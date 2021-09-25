import React,{useState, useEffect } from 'react';
import DropdownAction from '~/components/elements/basic/DropdownAction';
import axios from "axios";

const TableCustomerItems = () => {
    const [customers, setcustomers] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8899/user-list").then(res=>{
            console.log(res.data);
            setcustomers(res.data.result)
    })
    })
    const tableItemsView = customers.map((item, index) => {
        let badgeView;

        if (item) {
            badgeView = <span className="ps-badge success">active</span>;
        } else {
            badgeView = <span className="ps-badge gray">deactive</span>;
        }

        return (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>
                    <strong>{item.username}</strong>
                </td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.roles[0].rolename}</td>
                <td>
                    <DropdownAction />
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
                        <th>Name</th>
                        <th>Email Id</th>
                        <th>Phone Number</th>
                        <th>Role</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{tableItemsView}</tbody>
            </table>
        </div>
    );
};

export default TableCustomerItems;
