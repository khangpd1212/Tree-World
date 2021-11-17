import { Modal, Form, Input, Row, Col, Select } from 'antd';
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { fetchProvince, selectProvince } from "redux/address/province";
import { fetchDistrict, selectDistrict } from "redux/address/district";
import { fetchWard, selectWard } from "redux/address/ward";

export default function ModalAddress({ visible, onCreate, onCancel }) {
   const { Option } = Select;

   const { itemsProvince } = useSelector(selectProvince);
   const { itemsDistrict } = useSelector(selectDistrict);
   const { itemsWard } = useSelector(selectWard);

   const [address, setAddress] = useState([])
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(fetchProvince());
   }, [dispatch])

   const handleProvinceChange =(key, value) => {
      dispatch(fetchDistrict(key));
      setAddress({ ...address, province: value.children})
   };

   const handleDistrictChange = (key, value) => {
      dispatch(fetchWard(key));
      setAddress({ ...address, district_id: key,district: value.children})
   };
   const handleWardChange = (key, value) => {
      setAddress({ ...address, ward_code: key, ward: value.children})
   }
   const handleStreetChange = e => {
      setAddress({ ...address, street: e.target.value })
   }
   const handleNameChange = e => {
      setAddress({ ...address, name: e.target.value })
   }
   const handlePhoneChange = e => {
      setAddress({ ...address, phone: e.target.value })
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
                        {itemsProvince && itemsProvince.map((province) => (
                           <Option key={province.ProvinceID}>{province.ProvinceName}</Option>
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
                        {itemsDistrict && itemsDistrict.map((district) => (
                           <Option key={district.DistrictID}>{district.DistrictName}</Option>
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
                        {itemsWard && itemsWard.map((ward) => (
                           <Option key={ward.WardCode}>{ward.WardName}</Option>
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
