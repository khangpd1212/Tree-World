import { Layout } from 'antd';
import React, { useState } from "react";
import "styles/admin.scss";
import HeaderAdmin from "../Admin/HeaderAdmin";
import SideComponent from "../Admin/SideComponent";

const { Content } = Layout;

export default function AdminLayout() {
    const [isOpen, setIsOpen] = useState(false)

    return <div className="root-admin">
        <Layout>
            <SideComponent isOpen={isOpen} />
            <Layout className="site-layout">
                <HeaderAdmin isOpen={isOpen} setIsOpen={setIsOpen} />
                <Content>
                    <h2 className="content-title">Dashboard</h2>
                </Content>
            </Layout>
        </Layout>
    </div>
}