import {Layout} from 'antd';
import React, {useState} from "react";
import "styles/admin.scss";
import HeaderAdmin from "../Admin/HeaderAdmin";
import SideComponent from "../Admin/SideComponent";
import {Route} from "react-router-dom";
import ProductsAdmin from "../../pages/Admin/ProductAdmin";
import AdminHome from "../../pages/Admin";
import { useGetInitData } from 'redux/action/useGetInitData';


const {Content} = Layout;

export default function AdminLayout() {
    const [isOpen, setIsOpen] = useState(false)
    // fetch init data
    useGetInitData()

    return <div className="root-admin">
        <Layout>
            <SideComponent isOpen={isOpen}/>
            <Layout className="site-layout">
                <HeaderAdmin isOpen={isOpen} setIsOpen={setIsOpen}/>
                <Content>
                    <Route path="/admin/" exact component={AdminHome} />
                    <Route path="/admin/products" exact component={ProductsAdmin} />
                </Content>
            </Layout>
        </Layout>
    </div>
}