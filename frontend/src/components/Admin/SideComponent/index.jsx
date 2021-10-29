import {ContainerOutlined, DesktopOutlined, PieChartOutlined} from '@ant-design/icons';
import {Menu} from "antd";
import Sider from "antd/es/layout/Sider";
import React from "react";
import {Link} from "react-router-dom"

export default function SideComponent({isOpen}) {

    return <Sider
        trigger={null}
        collapsible
        collapsed={isOpen}
    >
        {/*<img src="/logo.png" alt="tree-world-logo" className="logo-desktop"/>*/}
        LOGO
        <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            inlineCollapsed={isOpen}
        >
            <Link to="/admin">
                <Menu.Item key="1" icon={<PieChartOutlined/>}>
                    Dashboard
                </Menu.Item>
            </Link>
            <Link to="/admin/products">
                <Menu.Item key="2" icon={<DesktopOutlined/>}>
                    Product
                </Menu.Item>
            </Link>
        </Menu>
    </Sider>
}