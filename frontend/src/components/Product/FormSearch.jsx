import React, { useState } from "react";
import { Button, Input, Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "styles/formsearch.scss";
import { useDispatch } from "react-redux";
import { setSearchStatus } from "redux/layout";
import { searchProducts } from "redux/product";
import { useHistory } from "react-router";
import { validations } from "utils/validation";
import { toast } from "react-toastify";
const { Search } = Input;
function FormSearch() {
  const dispatch = useDispatch();
  const history = useHistory();

  const onSearch = (value) => {
    if (validations.checkNull(value)) {
      if (validations.checkBlankSpace(value)) {
        dispatch(setSearchStatus(value.trim()));
        dispatch(searchProducts({ keyword: value.trim() }));
        history.push(`/product/?keyword=${value}`);
      } else {
        toast.error("You're allowed text only space");
      }
    } else {
      toast.error("Please text your keyword");
    }
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
