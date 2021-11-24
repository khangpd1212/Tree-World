import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Modal, Rate, Select, Switch, Upload } from 'antd';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { selectCatalogs } from 'redux/catalog';
import { fetchProducts } from "redux/product";
import { requests } from "utils/axios";

const { Option } = Select;
const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};

const normFile = (e) => {
    console.log(`lits`, e.fileLis)
    if (Array.isArray(e)) {
        return e;
    }

    return e && e.fileList;
};

export default function ModalAddProduct({ visible, setVisible }) {
    const { catalogList } = useSelector(selectCatalogs);
    const [imgBase64, setImgBase64] = useState("")
    const [fileList, setFileList] = useState([]);
    const dispatch = useDispatch()
    const token = localStorage.getItem("token");

    const onFinish = (values) => {
        requests.addProduct(token, values, imgBase64)
            .then(res => {
                console.log(res);
                dispatch(fetchProducts())
                setVisible(false)
                toast.success("Add new product succesfully!")
            })
    };

    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }

    const handleChange = async (info) => {
        const hash = await getBase64(info.file.originFileObj)
        setImgBase64(hash)
    };

    const FromEdit = useCallback(() => {

        return <Form
            name="validate_other"
            {...formItemLayout}
            onFinish={onFinish}
        // initialValues={{
        //     'product_name': selected.product_name,
        //     'star': selected.star,
        //     'catalog_id': selected.catalog_id,
        //     'inventory': selected.inventory ?? 0,
        //     'price': selected.price,
        //     'isHot': selected.isHot ?? false,
        //     'status': selected.status ?? false,
        //     'description': selected.description
        // }}
        >
            <Form.Item
                name="product_name"
                label="Product Name"
                hasFeedback
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="catalog_id"
                label="Catalog Name"
                hasFeedback
            >
                <Select >
                    {
                        catalogList &&
                        catalogList.filter(f => f.status)
                            .map(cata => <Option value={cata._id}>{cata.catalog_name}</Option>)
                    }
                </Select>
            </Form.Item>

            <Form.Item name="inventory" label="Iventory" valuePropName="isHot">
                <Form.Item name="inventory" noStyle>
                    <InputNumber min={1} defaultValue={0} />
                </Form.Item>
                <span className="ant-form-text"> Price:</span>
                <Form.Item name="price" noStyle>
                    <InputNumber min={1} defaultValue={0} />
                </Form.Item>
            </Form.Item>

            <Form.Item name="isHot" label="isHot" valuePropName="isHot">
                <Switch defaultChecked={true} />
            </Form.Item>

            <Form.Item name="status" label="Status" valuePropName="status">
                <Switch defaultChecked={true} />
            </Form.Item>

            <Form.Item name="star" label="Star">
                <Rate defaultValue={1} />
            </Form.Item>

            <Form.Item
                label="Image"
                valuePropName="fileList"
                getValueFromEvent={normFile}
            >
                <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onChange={handleChange}
                >
                    {fileList.length >= 1 ? null :
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>}
                </Upload>
            </Form.Item>

            <Form.Item label="Description">
                <Form.Item name="description" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                    <Input.TextArea />
                </Form.Item>
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    span: 12,
                    offset: 6,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                <Button onClick={() => setVisible(false)}>
                    Cancel
                </Button>
            </Form.Item>
        </Form>
    }, [catalogList, imgBase64])

    return <>
        <Modal
            title="Add Products"
            centered
            visible={visible}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            footer={false}
            width="50%"
            className="edit-product"
        >
            <FromEdit />
        </Modal>
    </>

}