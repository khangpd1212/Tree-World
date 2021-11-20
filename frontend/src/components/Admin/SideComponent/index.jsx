import {
    ContainerOutlined, UserOutlined, DashboardOutlined, InboxOutlined, ReadOutlined, TagsOutlined, PrinterOutlined
} from '@ant-design/icons';
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React from "react";
import { Link } from 'react-router-dom';
import "styles/sideAdmin.scss";
export default function SideComponent({ isOpen }) {

    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={isOpen}
        >
            {
                isOpen ?
                    <Link to="/admin" className="icon-admin">
                        <img srcSet="../../icon.png" alt="icon-logo" />
                    </Link> :
                    <Link to="/admin" className="logo-admin">
                        <img srcSet="../../logo.png" alt="logo" />
                    </Link>
            }
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                inlineCollapsed={isOpen}
            >
                <Menu.Item key="1" icon={<DashboardOutlined />}>
                    <Link to={"/admin"}>Dashboard</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<InboxOutlined />}>
                    <Link to={"/admin/product"}>Product</Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<ReadOutlined />} >
                    <Link to={"/admin/category"}>Category</Link>
                </Menu.Item>
                <Menu.Item key="4" icon={<TagsOutlined />} >
                    <Link to={"/admin/voucher"}>Voucher</Link>
                </Menu.Item>
                <Menu.Item key="5" icon={<ContainerOutlined />}>
                    <Link to={"/admin/new"}>News</Link>
                </Menu.Item>
                <Menu.Item key="6" icon={<PrinterOutlined />}>
                    <Link to={"/admin/order"}>Order</Link>
                </Menu.Item>
                <Menu.Item key="7" icon={<UserOutlined />}>
                    <Link to={"/admin/users"}>User</Link>
                </Menu.Item>
            </Menu>
        </Sider>
    )
}