import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Switch,
  Upload,
} from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { selectCatalogs } from "redux/catalog";
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


function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default function ModalAddProduct({ visible, setVisible }) {
  const { catalogList } = useSelector(selectCatalogs);
  const dispatch = useDispatch();

  const [imgBase64, setImgBase64] = useState("");
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const userItem = JSON.parse(localStorage.getItem("userItems"));
  const token = userItem ? userItem.accessToken : null;

  const onFinish = (values) => {
    requests.addProduct(token, values, imgBase64).then((res) => {
      if (res.status) {
        dispatch(fetchProducts());
        form.resetFields();
        setFileList([]);
        setVisible(false);
        toast.success("Add new product succesfully!");
      } else {
        toast.error("Failed");
      }
    });
  };

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    setPreviewVisible(true);

    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = async (info) => {
    setFileList(info.fileList);
    const hash = await getBase64(info.file.originFileObj);
    setImgBase64(hash);
  };

  const [form] = Form.useForm();

  return (
    <>
      <Modal
        title="Add Product"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        footer={false}
        width="50%"
        className="edit-product"
      >
        <Form
          form={form}
          name="validate_other"
          {...formItemLayout}
          onFinish={onFinish}
        >
          <Form.Item
            name="product_name"
            label="Product Name"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please input product name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="catalog_id"
            label="Catalog Name"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please input catalog name!",
              },
            ]}
          >
            <Select>
              {catalogList &&
                catalogList
                  .filter((f) => f.status)
                  .map((cata) => (
                    <Option key={cata._id}>{cata.catalog_name}</Option>
                  ))}
            </Select>
          </Form.Item>

          <Form.Item label="Iventory">
            <Form.Item
              hasFeedback
              name="inventory"
              noStyle
              rules={[
                {
                  required: true,
                  message: "Please input inventory!",
                },
              ]}
            >
              <InputNumber min={1} initialvalues={0} />
            </Form.Item>
            <span className="ant-form-text"> Price:</span>
            <Form.Item
              hasFeedback
              name="price"
              noStyle
              rules={[
                {
                  required: true,
                  message: "Please input price!",
                },
              ]}
            >
              <InputNumber min={1} initialvalues={0} />
            </Form.Item>
          </Form.Item>

          <Form.Item hasFeedback label="Image" valuePropName="fileList">
            <Upload
              name="logo"
              listType="picture"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}
              onChange={handleChange}
              onPreview={handlePreview}
            >
              {fileList.length >= 1 ? null : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
            <Modal
              visible={previewVisible}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
          </Form.Item>
          <Form.Item
            name="color"
            label="Color"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please input color!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input description!",
              },
            ]}
          >
            <Input.TextArea showCount />
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
            <Button onClick={() => setVisible(false)}>Cancel</Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
