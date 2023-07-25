import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Modal, Select, Tag, Upload } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { selectCatalogs } from 'redux/catalog';
import { fetchProducts } from 'redux/product';
import { selectUsers } from 'redux/user';
import { requests } from 'utils/axios';
import { validations } from 'utils/validation';

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
  console.log(`lits`, e.fileLis);
  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
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
  const { adminItems } = useSelector(selectUsers);
  const token = adminItems.accessToken;

  const [imgBase64, setImgBase64] = useState('');
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const onFinish = (values) => {
    if (
      !validations.checkBlankSpace(values.product_name) ||
      !validations.checkBlankSpace(values.description)
    ) {
      toast.error('You are not allowed text only white space');
    } else {
      requests.addProduct(token, values, imgBase64).then((res) => {
        if (res && res.status) {
          dispatch(fetchProducts());
          form.resetFields();
          setFileList([]);
          setVisible(false);
          toast.success('Add new product succesfully!');
          // } else {
          //   toast.error('Failed');
        }
      });
    }
  };

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    setPreviewVisible(true);

    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleChange = async (info) => {
    setFileList(info.fileList);
    const hash = await getBase64(info.file.originFileObj);
    setImgBase64(hash);
  };

  // color tag
  const tagRender = (props) => {
    const { label, value, closable, onClose } = props;

    return value === 'white' ? (
      <Tag
        style={{ color: 'black', borderColor: '#00000014', marginRight: 3 }}
        closable={closable}
        onClose={onClose}
      >
        {label}
      </Tag>
    ) : (
      <Tag color={value} closable={closable} onClose={onClose} style={{ marginRight: 3 }}>
        {label}
      </Tag>
    );
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
          initialValues={{
            inventory: 1,
            price: 1,
          }}
        >
          <Form.Item
            name="product_name"
            label="Product Name"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please input product name!',
              },
            ]}
          >
            <Input placeholder="Please input product name" />
          </Form.Item>
          <Form.Item
            name="slug"
            label="SEO"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please enter input',
              },
            ]}
          >
            <Input placeholder="Please enter input" />
          </Form.Item>
          <Form.Item
            name="catalog_id"
            label="Catalog Name"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please input catalog name!',
              },
            ]}
          >
            <Select placeholder="Please select catalog">
              {catalogList &&
                catalogList
                  .filter((f) => f.status)
                  .map((cata) => <Option key={cata._id}>{cata.catalog_name}</Option>)}
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
                  message: 'Please input inventory!',
                },
              ]}
            >
              <InputNumber min={1} defaultValue={1} />
            </Form.Item>
            <span className="ant-form-text"> Price:</span>
            <Form.Item
              hasFeedback
              name="price"
              noStyle
              rules={[
                {
                  required: true,
                  message: 'Please input price!',
                },
              ]}
            >
              <InputNumber min={1} defaultValue={0} />
            </Form.Item>
          </Form.Item>

          <Form.Item
            hasFeedback
            label="Image"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
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
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </Form.Item>
          <Form.Item
            name="color"
            label="Color"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please select product colors!',
                type: 'array',
              },
            ]}
          >
            <Select
              placeholder="Please input colors"
              mode="multiple"
              showArrow
              tagRender={tagRender}
              style={{ width: '100%' }}
            >
              <Option value="white">white</Option>
              <Option value="green">green</Option>
              <Option value="orange">orange</Option>
              <Option value="black">black</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: 'Please input description!',
              },
            ]}
          >
            <Input.TextArea placeholder="Please input description" showCount />
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
