import {memo} from 'react'
import { Col, Row } from "antd";
import "styles/Home/Banner.scss"
import Button from 'components/utils/Button';
function Banner() {
   return (
     <Row className="slider">
       <Col className="slider-left" xs={24} md={14}>
         <img src="./images/slider.png" alt="img_slider-left" />
       </Col>
       <Col className="slider-right container_home" xs={24} md={10}>
         <img src="./images/slider2.png" alt="img_slider-right" />
         <div className="slider-right_title">
           <h1>Make your days feeling goods with beautiful plant</h1>
         </div>
         <div className="slider-right_content">
           <p>
             Lorem ipsum dolor sit amet, consectetur adipiscing telit, sed do
             eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
             ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
             aliquip ex ea commodo consequat.
           </p>
         </div>
         <Button title="see more" />
       </Col>
     </Row>
   );
}
export default memo(Banner);
