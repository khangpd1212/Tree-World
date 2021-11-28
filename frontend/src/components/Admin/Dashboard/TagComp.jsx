import { DollarOutlined, CreditCardOutlined, FieldTimeOutlined, ShoppingOutlined } from '@ant-design/icons';
import ItemTagComp from "./ItemTagComp";
export default function TagComp() {
   return (
      <div className="wrapper__tag">
         <ItemTagComp
            icon={<DollarOutlined />}
            bgColorTag="#368978ab"
            bgColorIcon="#368978"
            title="Tổng doanh thu"
            content="130,222,000 VNĐ"
         />
         <ItemTagComp
            icon={<CreditCardOutlined />}
            bgColorTag={"#ff7875"}
            bgColorIcon={"#cf1322"}
            title="Đơn hàng bị hủy"
            content="122"
         />
         <ItemTagComp
            icon={<FieldTimeOutlined />}
            bgColorTag={"#ffd666"}
            bgColorIcon={"#d48806"}
            title="Đang giao"
            content="357"
         />
         <ItemTagComp
            icon={<ShoppingOutlined />}
            bgColorTag={"#69c0ff"}
            bgColorIcon={"#096dd9"}
            title="Giao thành công"
            content="278"
         />
      </div>
   )
}
