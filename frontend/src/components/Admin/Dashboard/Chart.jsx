import React from "react";
import { Line } from "@ant-design/charts";
import { useSelector } from "react-redux";
import moment from "moment";
import { Select } from "antd";
import { useDispatch } from "react-redux";
import { setYear } from "redux/layout";
function turnOverYear(year, data) {
  return data.length > 0
    ? data.filter((item) => moment(item.orderDate).format("YYYY") === year)
    : [];
}
function totalOfMonth(month, data) {
  const orderOfMonth =
    data.length > 0
      ? data.filter((item) => moment(item.orderDate).format("MM") === month)
      : [];
  return orderOfMonth.length > 0
    ? orderOfMonth.reduce((prev, current) => prev + current.toTal, 0)
    : 0;
}
const { Option } = Select;
export default function Chart() {
  const { orderList } = useSelector((state) => state.orderState);
  const { year } = useSelector((state) => state.layoutState);
  const dispatch = useDispatch();
  const completeOrder =
    orderList &&
    orderList.filter(
      (item) => item.status === "Completed" || item.status === "Reviewed"
    );
  const orderOfYear = turnOverYear(year, completeOrder);
  console.log(orderOfYear);
  console.log(totalOfMonth("12", orderOfYear));
  const data = [
    { year: "January", value: totalOfMonth("01", orderOfYear) },
    { year: "February", value: totalOfMonth("02", orderOfYear) },
    { year: "March", value: totalOfMonth("03", orderOfYear) },
    { year: "April", value: totalOfMonth("04", orderOfYear) },
    { year: "May", value: totalOfMonth("05", orderOfYear) },
    { year: "June", value: totalOfMonth("06", orderOfYear) },
    { year: "July", value: totalOfMonth("07", orderOfYear) },
    { year: "August", value: totalOfMonth("08", orderOfYear) },
    { year: "September", value: totalOfMonth("09", orderOfYear) },
    { year: "October", value: totalOfMonth("10", orderOfYear) },
    { year: "November", value: totalOfMonth("11", orderOfYear) },
    { year: "December", value: totalOfMonth("12", orderOfYear) },
  ];
  const handleChange = (value) => {
    console.log(value);
    dispatch(setYear(value));
  };
  const config = {
    data,
    height: 400,
    xField: "year",
    yField: "value",
    point: {
      size: 5,
      shape: "diamond",
    },
    label: {
      style: {
        fill: "#aaa",
      },
    },
  };
  return (
    <div style={{ marginTop: "70px", fontSize: "26px" }}>
      <h1 style={{ marginBottom: "40px" }}>Chart</h1>
      <Select
        defaultValue={year}
        style={{ width: 120 }}
        onChange={handleChange}
      >
        <Option value={`${moment().format("YYYY") - 2}`}>
          {moment().format("YYYY") - 2}
        </Option>
        <Option value={`${moment().format("YYYY") - 1}`}>
          {moment().format("YYYY") - 1}
        </Option>
        <Option value={moment().format("YYYY")}>
          {moment().format("YYYY")}
        </Option>
      </Select>
      <Line {...config} />
    </div>
  );
}
