import React, { useState } from "react";
import { Button, Input, Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "styles/formsearch.scss";
import { useDispatch } from "react-redux";
import { setSearchStatus } from "redux/layout";
import { searchProducts } from "redux/product";
import { useHistory } from "react-router";
const { Search } = Input;
function FormSearch() {
  const dispatch = useDispatch();
  const history = useHistory();
  const onSearch = (value) => {
    console.log(value);
    dispatch(setSearchStatus(value));
    dispatch(searchProducts({ keyword: value }));
    history.push(`/product/?keyword=${value}`);
  };
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
        <Search placeholder="Search product" onSearch={onSearch} />
      </div>
      <div className="form__search--mobileVisible">
        <Button type="primary" onClick={showModal}>
          <SearchOutlined />
        </Button>
        <Modal title="Search" visible={isModalVisible} onCancel={handleCancel}>
          <Search placeholder="Search product" onSearch={onSearch} />
        </Modal>
      </div>
    </div>
  );
}

export default FormSearch;
