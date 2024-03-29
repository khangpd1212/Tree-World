import { EnvironmentFilled, RightOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchAddress, getAddress } from "redux/address";
import { selectProvince, showTextAddress } from "redux/address/province";
import {
  ShowModalAddress, ShowModalDefaultAddress, ShowModalLogin
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

  let addressChild = textAddress.province
    ? `${textAddress.street}, ${textAddress.ward}, ${textAddress.district}, ${textAddress.province}`
    : textAddress.address;

  useEffect(() => {
    localStorage.setItem("address", JSON.stringify(textAddress));
  }, [textAddress]);

  // show default address
  const handleShowDefaultAddress = () => {
    dispatch(ShowModalLogin(false));
    dispatch(ShowModalDefaultAddress(true));
  };

  useEffect(() => {
    requests.getAddressByUser(userItems._id).then((result) => {
      let addressLast = result.slice(-1)[0];
      if (Object.keys(textAddress).length === 0) {
        dispatch(
          showTextAddress({
            _id: addressLast && addressLast._id,
            address: addressLast && addressLast.content,
            district_id: addressLast && addressLast.district_id,
            ward_code: addressLast && addressLast.ward_code,
            name: userItems && userItems.username,
            phone: userItems && userItems.phone_number,
            service_id: textAddress.service_id && textAddress.service_id,
          })
        );
      } else {
        return;
      }
    });
  }, [userItems, dispatch, textAddress]);
  
  //handle default address
  const handleDefaultAddress = () => {
    requests.getAddressByUser(userItems._id).then((result) => {
      const compareAddress = result.find(
        (item) => item.content == addressChild
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
        const dataAddress = {
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
    });
  };

  // handle tạo address mới
  const onCreate = (values) => {
    dispatch(showTextAddress(values));
    dispatch(ShowModalAddress(false));
  };

  return (
    <div className="address">
      <img src="./images/address.png" alt="address" />
      <div className="address__main">
        <div className="address__main--top">
          <p className="top__title">
            <EnvironmentFilled style={{ color: "#d64848", fontSize: "20px" }} />
            <span className="top__title--text">your address</span>
          </p>
        </div>
        <div className="address__main--bottom">
          <span className="bottom__content">
            {textAddress.name} - {textAddress.phone}
            <br />
            {addressChild}
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
