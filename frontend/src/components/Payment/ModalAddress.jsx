import { Button, Col, Form, Input, Modal, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchDistrict, selectDistrict } from "redux/address/district";
import { fetchProvince, selectProvince } from "redux/address/province";
import { fetchWard, selectWard } from "redux/address/ward";
import {
  selectModals,
  ShowModalAddress,
  ShowModalDefaultAddress,
} from "redux/modal";
import { patterns, validations } from "utils/validation";
export default function ModalAddress({ handleCreate }) {
  const { Option } = Select;

  const { itemsProvince } = useSelector(selectProvince);
  const { itemsDistrict } = useSelector(selectDistrict);
  const { itemsWard } = useSelector(selectWard);
  const { isShowAddress } = useSelector(selectModals);

  const [address, setAddress] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProvince());
  }, [dispatch]);

  const showDefaultAddress = () => {
    dispatch(ShowModalAddress(false));
    dispatch(ShowModalDefaultAddress(true));
  };
  const handleCancel = () => {
    dispatch(ShowModalAddress(false));
  }
  const handleProvinceChange = (key, value) => {
    dispatch(fetchDistrict(key));
    setAddress({ ...address, province: value.children });
  };

  const handleDistrictChange = (key, value) => {
    dispatch(fetchWard(key));
    setAddress({ ...address, district_id: key, district: value.children });
  };
  const handleWardChange = (key, value) => {
    setAddress({ ...address, ward_code: key, ward: value.children });
  };

  const [form] = Form.useForm();

  return (
    <Modal
      visible={isShowAddress}
      title="Choose address"
      footer={
        <>
          <Button type="ghost" onClick={showDefaultAddress}>
            Back
          </Button>
          <Button
            onClick={() => {
              form
                .validateFields()
                .then((value) => {
                  if (
                    !validations.checkBlankSpace(value.name) ||
                    !validations.checkBlankSpace(value.street)
                  ) {
                    toast.error("You are not allowed text only white space");
                  } else {
                    form.resetFields();
                    handleCreate(Object.assign({}, value, address));
                  }
                })
                .catch((info) => {
                  console.log("Validate Failed:", info);
                });
            }}
            type="primary"
          >
            Ok
          </Button>
        </>
      }
      onCancel={handleCancel}
      width={600}
    >
      <Form layout="vertical" form={form} name="form_in_modal" size="large">
        <Row gutter={10}>
          <Col md={12}>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
              ]}
            >
              <Input placeholder="Input name" />
            </Form.Item>
          </Col>

          <Col md={12}>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please input your phone!",
                },
                {
                  pattern: patterns.phonePattern,
                  message: "Wrong phone number format",
                },
              ]}
            >
              <Input type="tel" placeholder="Input phone" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={10}>
          <Col md={8}>
            <Form.Item
              label="Province"
              rules={[
                {
                  required: true,
                  message: "Please select your address!",
                },
              ]}
            >
              <Select
                placeholder="Province"
                onChange={handleProvinceChange}
                showSearch
              >
                {itemsProvince &&
                  itemsProvince.map((province) => (
                    <Option
                      value={province.ProvinceID}
                      key={province.ProvinceID}
                    >
                      {province.ProvinceName}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col md={8}>
            <Form.Item
              label="District"
              rules={[
                {
                  required: true,
                  message: "Please select your address!",
                },
              ]}
            >
              <Select
                placeholder="District"
                onChange={handleDistrictChange}
                showSearch
              >
                {itemsDistrict &&
                  itemsDistrict.map((district) => (
                    <Option
                      value={district.DistrictID}
                      key={district.DistrictID}
                    >
                      {district.DistrictName}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col md={8}>
            <Form.Item
              label="Ward"
              rules={[
                {
                  required: true,
                  message: "Please select your address!",
                },
              ]}
            >
              <Select placeholder="Ward" showSearch onChange={handleWardChange}>
                {itemsWard &&
                  itemsWard.map((ward) => (
                    <Option value={ward.WardCode} key={ward.WardCode}>
                      {ward.WardName}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="street"
          label="Street"
          rules={[
            {
              required: true,
              message: "Please input your address!",
            },
          ]}
        >
          <Input placeholder="Input street" value={address.street} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
