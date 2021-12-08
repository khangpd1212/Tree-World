import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Upload,
  InputNumber,
  Image,
} from "antd";
import React, { useState } from "react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { selectCatalogs } from "redux/catalog";
import { fetchProducts } from "redux/product";
import { requests } from "utils/axios";
import { validations } from "utils/validation";

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

export default function ModalEdit({
  visible,
  setVisible,
  selected,
  setSelected,
}) {
  const { catalogList } = useSelector(selectCatalogs);
  const [imgBase64, setImgBase64] = useState("");
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  let catalogSeleted =
    catalogList &&
    selected &&
    catalogList.find((f) => f._id === selected.catalog_id);
  const dispatch = useDispatch();

  const onFinish = (values) => {
    if (
      !validations.checkBlankSpace(values.product_name) ||
      !validations.checkBlankSpace(values.description) ||
      !validations.checkBlankSpace(values.color)
    ) {
      toast.error("You are not allowed text only white space");
    } else {
      if (imgBase64 !== "") {
        requests
          .editProduct({ ...values, image: imgBase64 }, selected._id)
          .then((res) => {
            console.log(res);
            if (res.updatedProduct) {
              dispatch(fetchProducts());
              setVisible(false);
              toast.success("Update product success");
            } else {
              toast.error("Fail!!");
            }
          })
          .catch((err) => toast.warning(err));
      } else {
        requests
          .editProduct(values, selected._id)
          .then((res) => {
            if (res.updatedProduct) {
              dispatch(fetchProducts());
              setVisible(false);
              toast.success("Update product success");
            }
          })
          .catch((err) => toast.warning(err));
      }
    }
  };

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleCancel = () => setPreviewVisible(false);
  const handlePreview = useCallback(async (file) => {
    setPreviewVisible(true);

    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  }, []);

  const handleChange = useCallback(async (info) => {
    if (info.file.status === "uploading") {
      info.file.status = "done";
    }
    if (info.file.status === "done") {
      const hash = await getBase64(info.file.originFileObj);
      setImgBase64(hash);
      setFileList(info.fileList);
    }
  }, []);

  const FromEdit = useCallback(() => {
    return (
      <Form
        name="validate_other"
        {...formItemLayout}
        onFinish={onFinish}
        initialValues={{
          product_name: selected.product_name,
          star: selected.star,
          catalog_id: selected.catalog_id,
          inventory: selected.inventory ?? 0,
          price: selected.price,
          isHot: selected.isHot ?? false,
          status: selected.status ?? false,
          description: selected.description,
          color: selected.color,
        }}
      >
        <Form.Item
          name="product_name"
          label="Product Name"
          rules={[
            {
              required: true,
              message: "Please input product name!",
            },
          ]}
          hasFeedback
        >
          <Input
            placeholder={selected.product_name}
            defaultValue={selected.product_name}
            value={selected.product_name}
          />
        </Form.Item>
        <Form.Item
          name="catalog_id"
          label="Catalog Name"
          hasFeedback
          placeholder="Catalog"
        >
          <Select
            placeholder={catalogSeleted?.catalog_name}
            defaultValue={selected.catalog_id}
          >
            {catalogList &&
              catalogList
                .filter((f) => f.status)
                .map((cata) => (
                  <Option value={cata._id}>{cata.catalog_name}</Option>
                ))}
          </Select>
        </Form.Item>

        <Form.Item label="Iventory" valuePropName="isHot">
          <Form.Item
            name="inventory"
            noStyle
            rules={[
              {
                required: true,
                message: "Please input inventory!",
              },
            ]}
          >
            <InputNumber min={1} defaultValue={selected.inventory} />
          </Form.Item>
          <span className="ant-form-text"> Price:</span>
          <Form.Item
            name="price"
            noStyle
            rules={[
              {
                required: true,
                message: "Please input price!",
              },
            ]}
          >
            <InputNumber min={1} defaultValue={selected.price} />
          </Form.Item>
        </Form.Item>

        <Form.Item
          label="Image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Image src={selected.image} width="120px" /> <br />
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
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
          </Modal>
        </Form.Item>
        <Form.Item name="color" label="Color" hasFeedback>
          <Input
            placeholder={selected.color}
            defaultValue={selected.color}
            value={selected.color}
          />
        </Form.Item>

        <Form.Item label="Description">
          <Form.Item
            name="description"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please input description!",
              },
            ]}
          >
            <Input.TextArea defaultValue={selected.description} />
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
          <Button
            onClick={() => {
              setVisible(false);
              setSelected({});
            }}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    );
  }, [
    selected,
    imgBase64,
    fileList,
    previewImage,
    previewTitle,
    previewVisible,
  ]);

  return (
    <>
      <Modal
        title="Edit Products"
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
  );
}
