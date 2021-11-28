import { EnvironmentFilled, RightOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchAddress, getAddress, selectAddress } from "redux/address";
import { selectProvince, showTextAddress } from "redux/address/province";
import {
  onCancelAddress, ShowModalDefaultAddress, ShowModalLogin
} from "redux/modal";
import { selectUsers } from "redux/user";
import { requests } from "utils/axios";
import { BtnOutlineBlue, BtnOutlineGray } from "../utils/Button";
import DefaultAddress from "./DefaultAddress";
import ModalAddress from "./ModalAddress";
export default function AddressPayment() {
  const dispatch = useDispatch();
  const { userItems } = useSelector(selectUsers);
  const { textAddress } = useSelector(selectProvince);
  const { addressList } = useSelector(selectAddress);
  const [address, setAddress] = useState({});

  let addressChild = textAddress.province
    ? `${textAddress.street}, ${textAddress.ward}, ${textAddress.district}, ${textAddress.province}`
    : "";

  useEffect(() => {
    requests.getAddressByUser(userItems._id).then((result) => {
      let addressLast = result.slice(-1)[0];
      dispatch(
        showTextAddress({
          address: addressLast && addressLast.content,
          district_id: addressLast && addressLast.district_id,
          ward_code: addressLast && addressLast.ward_code,
          name: userItems && userItems.username,
          phone: userItems && userItems.phone_number,
        })
      );
    });
  }, [userItems]);
  
  useEffect(() => {
    setAddress(textAddress);
  });

  const handleDefaultAddress = () => {
    let dataAddress = {};

    const compareAddress = addressList.find(
      (item) => item.content === textAddress.address
    );

    // so sanh address
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
        district_id: textAddress.district_id,
        ward_code: textAddress.ward_code,
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
            {address.name} - {address.phone}
            <br />
            {address.address ? address.address : addressChild}
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
