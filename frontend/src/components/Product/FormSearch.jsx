import React, { useState } from "react";
import { Button, Input, Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "styles/formsearch.scss";
const { Search } = Input;
function FormSearch() {
  const onSearch = (value) => console.log(value);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div className="form__search">
      <div className="form__search--mobileHidden">
        <Search placeholder="Search..." onSearch={onSearch} />
      </div>
      <div className="form__search--mobileVisible">
        <Button type="primary" onClick={showModal}>
          <SearchOutlined />
        </Button>
        <Modal title="Search" visible={isModalVisible} onCancel={handleCancel}>
          <Search placeholder="Search..." onSearch={onSearch} />
        </Modal>
      </div>
    </div>
  );
}

export default FormSearch;
