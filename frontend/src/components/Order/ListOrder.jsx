import { List, Collapse, Image } from "antd";
import {selectOrders, getOrders}  from "redux/order";
import {useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
export default function ListOrder() {
  const { Panel } = Collapse;


  const dispatch = useDispatch();
  const { orderList } = useSelector(selectOrders);
  
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);
  console.log(orderList);
  const data = [
    {
      title: "Ant Design Title 1",
    },
    {
      title: "Ant Design Title 2",
    },
    {
      title: "Ant Design Title 3",
    },
    {
      title: "Ant Design Title 4",
    },
  ];
  const description = (
      <>
          <span style={{display: "block"}}>Ant design</span>
          <span>19/20/2001</span>
      </>
  )
  return (
    <Collapse defaultActiveKey={["1"]} expandIconPosition="right" ghost>
      <Panel header="Your order" key="1">
            <List
              itemLayout="horizontal"
              dataSource={orderList}
              renderItem={(itemOrder) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Image
                        width={80}
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                      />
                    }
                    title={itemOrder.name}
                    description={description}
                  />
                  <div>$999</div>
                </List.Item>
              )}
            />

      </Panel>
    </Collapse>
  );
}
