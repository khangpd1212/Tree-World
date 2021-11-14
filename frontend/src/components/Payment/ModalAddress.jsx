import { Modal, Form, Input, Row, Col, Select } from 'antd';
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { fetchAddress, selectAddress } from "redux/address";

export default function ModalAddress({ visible, onCreate, onCancel }) {
   const { Option } = Select;

   const { itemsAddress } = useSelector(selectAddress);

   const [district, setDistrict] = useState([]);
   const [ward, setWard] = useState([]);
   const [address, setAddress] = useState([])

   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(fetchAddress());
   }, [dispatch])

   const handleProvinceChange = (value) => {
      setAddress({ ...address, province: value })
      setDistrict(itemsAddress.find(x => x.name === value).districts);
   }

   const handleDistrictChange = (value) => {
      setAddress({ ...address, district: value })
      setWard(district.find(x => x.name === value).wards);
   };
   const handleWardChange = (value) => {
      setAddress({ ...address, ward: value })
   }
   const handleStreetChange = event => {
      setAddress({ ...address, street: event.target.value })
   }
   const handleNameChange = event => {
      setAddress({ ...address, name: event.target.value })
   }
   const handlePhoneChange = event => {
      setAddress({ ...address, phone: event.target.value })
   }
   const [form] = Form.useForm();

   return (
      <Modal
         visible={visible}
         title="Choose address"
         okText="Add"
         cancelText="Cancel"
         onCancel={onCancel}
         width={600}
         onOk={() => {
            form
               .validateFields()
               .then(() => {
                  form.resetFields();
                  onCreate([address]);
               })
               .catch((info) => {
                  console.log('Validate Failed:', info);
               });
         }}
      >
         <Form
            layout="vertical"
            form={form}
            name="form_in_modal"
            size="large"
         >
            <Row gutter={10}>
               <Col md={12}>
                  <Form.Item
                     label="Name"
                     rules={[
                        {
                           required: true,
                           message: 'Please input your name!',
                        },
                     ]}
                  >
                     <Input
                        onChange={handleNameChange}
                        placeholder="Input name"

                     />
                  </Form.Item>
               </Col>

               <Col md={12}>
                  <Form.Item
                     label="Phone"
                     rules={[
                        {
                           required: true,
                           message: 'Please input your phone!',
                        },
                     ]}
                  >
                     <Input
                        type="number"
                        onChange={handlePhoneChange}
                        placeholder="Input phone"

                     />
                  </Form.Item>
               </Col>
            </Row>

            <Row gutter={10}>
               <Col md={8}>
                  <Form.Item
                     label="Province"
                     rules={[
                        {
                           type: 'array',
                           required: true,
                           message: 'Please select your address!',
                        },
                     ]}
                  >
                     <Select
                        placeholder="Province"
                        onChange={handleProvinceChange}
                        showSearch
                     >
                        {itemsAddress.map((province) => (
                           <Option key={province.name}>{province.name}</Option>
                        ))}
                     </Select>
                  </Form.Item>

               </Col>
               <Col md={8}>
                  <Form.Item
                     label="District"
                     rules={[
                        {
                           type: 'array',
                           required: true,
                           message: 'Please select your address!',
                        },
                     ]}
                  >
                     <Select
                        placeholder="District"
                        onChange={handleDistrictChange}
                        showSearch
                     >
                        {district.map((district) => (
                           <Option key={district.name}>{district.name}</Option>
                        ))}
                     </Select>
                  </Form.Item>
               </Col>
               <Col md={8}>
                  <Form.Item
                     label="Ward"
                     rules={[
                        {
                           type: 'array',
                           required: true,
                           message: 'Please select your address!',
                        },
                     ]}
                  >
                     <Select
                        placeholder="Ward"
                        showSearch
                        onChange={handleWardChange}
                     >
                        {ward.map((ward) => (
                           <Option key={ward.name}>{ward.name}</Option>
                        ))}
                     </Select>
                  </Form.Item>
               </Col>
            </Row>
            <Form.Item
               label="Street"
               rules={[
                  {
                     required: true,
                     message: 'Please input your address!',
                  },
               ]}
            >
               <Input
                  onChange={handleStreetChange}
                  placeholder="Input street"
                  value={address.street}
               />
            </Form.Item>
         </Form>
      </Modal>
   )
}
