import { Button, Form, Input, Modal, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { selectAddress } from "redux/address";
import { showTextAddress } from "redux/address/province";
import {
  onCancelDefaultAddress, selectModals, ShowModalAddress
} from "redux/modal";
import { selectUsers } from "redux/user";
export default function DefaultAddress() {
  const { Option } = Select;
  const { isShowDefaultAddress } = useSelector(selectModals);
  const { addressList } = useSelector(selectAddress);
  const { userItems } = useSelector(selectUsers);
  const dispatch = useDispatch();

  const addressRender = addressList.filter(
    (item) => userItems._id === item.idUser
  );

  const showAddress = () => {
    dispatch(onCancelDefaultAddress(false));
    dispatch(ShowModalAddress(true));
  };
  const handleCreate = (values) => {
    localStorage.setItem(
      "address",
      JSON.stringify(
        {
          ...values,
          district_id: addressRender[0].district_id,
          ward_code: addressRender[0].ward_code,
        },
      )
    );
    dispatch(
      showTextAddress(
        {
          ...values,
          district_id: addressRender[0].district_id,
          ward_code: addressRender[0].ward_code,
        },
      )
    );
    dispatch(onCancelDefaultAddress(false));
  };
  const [form] = Form.useForm();
  return (
    <Modal
      title="Choose My Address"
      visible={isShowDefaultAddress}
      onCancel={() => dispatch(onCancelDefaultAddress(false))}
      footer={
        <>
          <Button onClick={showAddress}>
            New Address
          </Button>
          <Button
            onClick={() => {
              form
                .validateFields()
                .then((values) => {
                  form.resetFields();
                  handleCreate(values);
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
    >
      <Form layout="vertical" form={form} name="form_in_modal" size="large">
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
        <Form.Item
          name="phone"
          label="Phone"
          rules={[
            {
              required: true,
              message: "Please input your phone!",
            },
          ]}
        >
          <Input type="number" placeholder="Input phone" />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[
            {
              required: true,
              message: "Please input your address!",
            },
          ]}
        >
          <Select style={{ width: "100%" }}>
            {addressRender &&
              addressRender.map((item) => (
                <Option key={item.content}>{item.content}</Option>
              ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}
