import { EnvironmentFilled, RightOutlined } from "@ant-design/icons";
import { BtnOutlineGray, BtnOutlineBlue } from "../utils/Button";
import ModalAddress from "./ModalAddress";
import DefaultAddress from "./DefaultAddress";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddress, getAddress, selectAddress } from "redux/address";
import { selectUsers } from "redux/user";
import { showTextAddress, selectProvince } from "redux/address/province";
import {
  ShowModalDefaultAddress,
  onCancelAddress,
  ShowModalLogin,
} from "redux/modal";
import { toast } from "react-toastify";
export default function AddressPayment() {
  const [addressItems, setAddressItems] = useState({});
  const dispatch = useDispatch();
  const { userItems } = useSelector(selectUsers);
  const { textAddress } = useSelector(selectProvince);
  const { addressList } = useSelector(selectAddress);

  const addressSession = sessionStorage.getItem("address");

  let addressChild = textAddress
    .map(
      (item) =>
        `${item.street}, ${item.ward}, ${item.district}, ${item.province}`
    )
    .toString();
  useEffect(() => {
    let addressFilter = addressList.filter(
      (item) => userItems._id === item.idUser
    );
    if (!addressSession && !textAddress[0]) {
      setAddressItems({
        address:
          addressFilter.length > 0
            ? addressFilter[addressFilter.length - 1].content
            : null,
        name: userItems.username,
        phone: userItems.phone_number,
      });
    } else if (addressSession && !textAddress[0].province) {
      setAddressItems({
        address: textAddress[0].address,
        name: textAddress[0].name,
        phone: textAddress[0].phone,
      });
    } else if (addressSession && textAddress[0].province) {
      setAddressItems({
        address: addressChild,
        name: textAddress[0].name,
        phone: textAddress[0].phone,
      });
    }
  }, [textAddress, addressList, userItems]);

  console.log(addressItems);
  const handleDefaultAddress = () => {
    let dataAddress = {};
    const compareAddress = addressList.find(
      (item) => item.content === addressChild
    );
    if (textAddress.length < 1 || compareAddress) {
      toast.error(`You can't choose this address anymore`, {
        position: "bottom-left",
        autoClose: 2000,
      });
    } else if (textAddress.length < 1 && compareAddress) {
      toast.error(`You can't choose this address anymore`, {
        position: "bottom-left",
        autoClose: 2000,
      });
    } else {
      dataAddress = {
        idUser: userItems._id,
        content: addressChild,
        district_id: textAddress[0].district_id,
        ward_code: textAddress[0].ward_code,
      };
      dispatch(fetchAddress(dataAddress));
      dispatch(getAddress());
      toast.success(`You have successfully selected defaults`, {
        position: "bottom-left",
        autoClose: 2000,
      });
    }
  };

  const handleShowDefaultAddress = () => {
    if (Object.values(userItems).length === 0) {
      dispatch(ShowModalLogin(true));
      toast.error(`You need to login`, {
        position: "bottom-left",
        autoClose: 2000,
      });
    } else {
      dispatch(ShowModalLogin(false));
      dispatch(ShowModalDefaultAddress(true));
    }
  };

  const onCreate = (values) => {
    sessionStorage.setItem("address", JSON.stringify(values));
    dispatch(showTextAddress(values));
    dispatch(onCancelAddress(false));
  };

  return (
    <div className="address">
      <img srcSet="./images/address.png" alt="address" />
      <div className="address__main">
        <div className="address__main--top">
          <p className="top__title">
            <EnvironmentFilled style={{ color: "#d64848", fontSize: "20px" }} />
            <span className="top__title--text">your address</span>
          </p>
        </div>
        <div className="address__main--bottom">
          <span className="bottom__content">
            {addressItems.name} - {addressItems.phone} <br />
            {addressItems.address}
          </span>
          <div className="bottom__button">
            <BtnOutlineGray
              title={"default"}
              handleOnClick={handleDefaultAddress}
            />
            <BtnOutlineBlue
              title={"change"}
              handleOnClick={handleShowDefaultAddress}
            />
            <DefaultAddress />
            <ModalAddress handleCreate={onCreate} />
          </div>
        </div>
        <RightOutlined className="icon-right" />
      </div>
    </div>
  );
}
