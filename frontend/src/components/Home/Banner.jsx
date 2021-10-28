import React from 'react'
import { Col, Row, Typography } from "antd";
const { Title } = Typography;

export default function Banner() {
   return (
      <Row className="slider">
         <Col className="slider-left" xs={24} sm={14}>
            <img srcSet="./images/slider.png" alt="img_slider-left" />
         </Col>
         <Col className="slider-right" xs={24} sm={10}>
            <img srcSet="./images/slider2.png" alt="img_slider-right" />
            <div className="slider-right_title">
               <Title>Make your days feeling goods with beautiful plant</Title>
            </div>
            <div className="slider-right_content">
               <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing telit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam, quis nostrud exercitation ullamco laboris
                  nisi ut aliquip ex ea commodo consequat.
               </p>
            </div>
            <button type="submit" className="btn-home">
               See more
            </button>
         </Col>
      </Row>
   )
}
