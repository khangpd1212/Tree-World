import { MenuFoldOutlined } from "@ant-design/icons";
import React from "react";
import { Header } from "antd/es/layout/layout";
import Profile from "./Profile";

export default function HeaderAdmin({ setIsOpen, isOpen }) {
    return <Header className="site-layout-background" style={{ padding: 0 }}>
        <MenuFoldOutlined
            className='trigger'
            onClick={() => setIsOpen(!isOpen)}
        />
        <Profile />
    </Header>
}