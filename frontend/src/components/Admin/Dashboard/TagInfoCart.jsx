import { UserOutlined, ShoppingCartOutlined, PercentageOutlined } from '@ant-design/icons';
import "../../../styles/Admin/Dashboard/TagInfoCart.scss";
export default function TagInfoCart() {
   return (
      <div className="tag_outline">
         <div className="tag_outline__wrapper">
            <div className="tag_outline__wrapper--content">
               <p className="content_title">Tổng số người dùng</p>
               <span className="content_data">14,208</span>
            </div>
            <div className="tag_outline__wrapper--icon">
               <UserOutlined style={{ color: "#fa8c16"}}/>
            </div>
         </div>
         <div className="tag_outline__wrapper">
            <div className="tag_outline__wrapper--content">
               <p className="content_title">Tổng số đơn hàng</p>
               <span className="content_data">14,208</span>
            </div>
            <div className="tag_outline__wrapper--icon">
               <ShoppingCartOutlined style={{ color: "#722ed1" }}/>
            </div>
         </div>
         <div className="tag_outline__wrapper">
            <div className="tag_outline__wrapper--content">
               <p className="content_title">Tỉ lệ đặt hàng</p>
               <span className="content_data">14,208</span>
            </div>
            <div className="tag_outline__wrapper--icon">
               <PercentageOutlined style={{ color: "#1890ff" }}/>
            </div>
         </div>
      </div>
   )
}
