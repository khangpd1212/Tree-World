import React from 'react'
import {Avatar, Badge} from 'antd';
import {UserOutlined} from '@ant-design/icons';

export default function Profile() {
    return (
        <div className="profile">
            <span className="avatar-item">
                <Badge count={1}>
                    <Avatar shape="square" size={45} icon={<UserOutlined/>}/>
                </Badge>
            </span>
        </div>
    )
}
