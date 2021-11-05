import {
    ContainerOutlined, DesktopOutlined, PieChartOutlined
} from '@ant-design/icons';
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React from "react";
import { Link } from 'react-router-dom';
import "styles/sideAdmin.scss";
export default function SideComponent({ isOpen }) {

    return <Sider
        trigger={null}
        collapsible
        collapsed={isOpen}
    >
        <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            inlineCollapsed={isOpen}
        >
            <Menu.Item key="1" icon={<PieChartOutlined />}> 
                <Link to={"/admin/product"}>Product</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />} >
            <Link to={"/admin/category"}>Category</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<ContainerOutlined />}>
            <Link to={"/admin/news"}>News</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<ContainerOutlined />}>
            <Link to={"/admin/"}></Link>
            </Menu.Item>
        </Menu>
    </Sider>
}