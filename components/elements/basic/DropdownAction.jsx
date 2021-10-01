// import React from 'react';
// import axios from 'axios';
// import { Dropdown, Menu,notification } from 'antd';
// import Router from 'next/router';

// const DropdownAction = (props) => {
//     console.log(props);
//     let deleteId = props.data.id;
//     const deleteItem = (datas) => {
//         const loginFormData = new FormData();
//         loginFormData.append("productId", datas);
//         axios({
//             method: 'delete',
//             url: ' http://localhost:8899/product/delete-product',
//             data: loginFormData,
//             headers: { 'Content-Type': 'multipart/form-data' }
//         }).then((res) => {
//             console.log(res);
//             console.log(res.status);
//             if (res.data.status === 200) {
//                 notification.success({
//                     message: res.data.message,
//                     description: 'This feature has been updated later!',
//                 });
//                 return Router.push('/products');
                
//             } 
//         }).catch((err) => {
//             console.log(err);

//             notification.warn({
//                 message: "delete unseccusfull",
//                 description: 'This feature has been updated later!',
//             })
//         }
//         )
//     }
//     const menuView = (
//         <Menu>
//             <Menu.Item key={props.data}>
//                 <a className="dropdown-item" onClick={() => {
//                     console.log("wor  ", props.data);
//                     let data = JSON.stringify(props.data);
//                     sessionStorage.setItem("edite", data);
//                     Router.push(`/products/EditeProduct`);
//                 }}>
//                     <i className="icon-pencil mr-2"></i>
//                     Edit
//                 </a>
//             </Menu.Item>
//             <Menu.Item key={deleteId}>
//                 <a className="dropdown-item" onClick={() => {
//                     console.log("delete ", deleteId);
//                     deleteItem(deleteId);
//                     // let data =JSON.stringify( props.data.id);
//                     // sessionStorage.setItem("delete",data)
//                     // router.push(`/products/EditeProduct`)
//                 }}>
//                     <i className="icon-trash2 mr-2"></i>
//                     Delete
//                 </a>
//             </Menu.Item>
//         </Menu>
//     );
//     return (
//         <Dropdown overlay={menuView} className="ps-dropdown">
//             <a
//                 onClick={(e) => e.preventDefault()}
//                 className="ps-dropdown__toggle">
//                 <i className="icon-ellipsis"></i>
//             </a>
//         </Dropdown>
//     );
// };

// export default DropdownAction;
