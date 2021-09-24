import {
    ContainerOutlined, DesktopOutlined, PieChartOutlined
} from '@ant-design/icons';
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React from "react";

export default function SideComponent({ isOpen }) {

    return <Sider
        trigger={null}
        collapsible
        collapsed={isOpen}
    >
        <img src="/logo.png" alt="tree-word-logo" className="logo-desktop" />
        <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            inlineCollapsed={isOpen}
        >
            <Menu.Item key="1" icon={<PieChartOutlined />}>
                Option 1
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
                Option 2
            </Menu.Item>
            <Menu.Item key="3" icon={<ContainerOutlined />}>
                Option 3
            </Menu.Item>
        </Menu>
    </Sider>
}