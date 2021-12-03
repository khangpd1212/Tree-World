import { Button, Form, Input, Modal, Select } from 'antd';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchCatalogs, selectCatalogs } from 'redux/catalog';
import { requests } from 'utils/axios';

const { Option } = Select;
const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};

export default function ModalEdit({ visible, setVisible, selected, setSelected }) {
    const { catalogList } = useSelector(selectCatalogs);

    const dispatch = useDispatch()
    const token = JSON.parse(localStorage.getItem("token"));
    console.log(selected)
    const onFinish = (values) => {
        requests
            .editCatalog(token, values, selected._id)
            .then((res) => {
                console.log(res);
                if (res.updatedCatalog.status) {
                    dispatch(fetchCatalogs());
                    setVisible(false);
                    toast.success(`Update successfully!`);
                } else {
                    toast.error("Failed");
                }
            });
    };


    const FromEdit = useCallback(() => {
        return <Form
            name="validate_other"
            {...formItemLayout}
            onFinish={onFinish}
            initialValues={{
                'catalog_name': selected.catalog_name,
                'status': selected.status ?? false,
            }}
        >
            <Form.Item
                name="catalog_name"
                label="Catalog"
                hasFeedback
                placeholder="Catalog"
            >
                <Input defaultValue={selected.catalog_name}/>
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
    }, [selected, setVisible])

    return <>
        <Modal
            title="Edit Category"
            centered
            visible={visible}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            footer={false}
            width="50%"
            className="edit-category"
        >
            <FromEdit />
        </Modal>
    </>

}