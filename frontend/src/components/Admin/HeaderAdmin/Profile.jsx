import React from 'react'
import { Avatar, Badge, Menu, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';

export default function Profile() {
    const menu = (
        <Menu>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    1st menu item
                </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    2nd menu item
                </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                    3rd menu item
                </a>
            </Menu.Item>
        </Menu>
    );
    return (
        <div className="profile">
            <span className="avatar-item">
               <div className="avatar-item__text">
                    <p>Viet Hoang</p>
                    <span>Admin Profile</span>
               </div>
               <Dropdown overlay={menu} placement="bottomLeft">
                    <Badge count={1}>
                        <Avatar style={{ backgroundColor: '#87d068', width: "40px", height: "40px", lineHeight:"40px"}} 
                        icon={<UserOutlined style={{fontSize: "20px"}}/>} />
                    </Badge>
                </Dropdown>
            </span>
        </div>
    )
}
