import React from 'react';
import { Form, Input, notification, Button } from 'antd';
import { Dropdown, Menu ,} from 'antd';

const DropdownAction = (props) => {
    console.log(props);
    const editeItem=(index)=>{
        console.log(index);
    }
    const edte = (
        <Menu>
            <Menu.Item >

            </Menu.Item>
                <Input type="text" />
            <Menu.Item >
                
            </Menu.Item>

            <Menu.Item >
                
            </Menu.Item>

            <Menu.Item >
                
            </Menu.Item>

            <Menu.Item >
                
            </Menu.Item>

            <Menu.Item >
                
            </Menu.Item>

            <Menu.Item >
                
            </Menu.Item>

            <Menu.Item >
                
            </Menu.Item>
        </Menu>
    );
    const menuView = (
        <Menu>
            <Menu.Item key={0}>
                <button onClick={editeItem(props.data)}>
                <a className="dropdown-item" href="#">
                    <i className="icon-pencil mr-2"></i>
                    Edit
                </a>
                </button>
            </Menu.Item>
            <Menu.Item key={0}>
                <a className="dropdown-item" href="#">
                    <i className="icon-trash2 mr-2"></i>
                    Delete
                </a>
            </Menu.Item>
        </Menu>
    );
    return (
        <Dropdown overlay={menuView} className="ps-dropdown">
            <a
                onClick={(e) => e.preventDefault()}
                className="ps-dropdown__toggle">
                <i className="icon-ellipsis"></i>
            </a>
        </Dropdown>
    );
};

export default DropdownAction;
