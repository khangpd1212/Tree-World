import React from 'react'
import { Col, Row } from "antd";
import "styles/Home/HeaderProduct.scss"

export default function HeaderProduct() {
   return (
            <Row className="h_product">
               <Col className="h_product-title" xs={24} sm={10} md={8}>
                  <h1>Choose your product from our collection</h1>
               </Col>
               <Col className="h_product-header" xs={24} sm={10}>
                  <div className="h_product-header_flex">
                     <div>hot</div>
                     <div>new</div>
                     <div>view</div>
                     <div>favorite</div>
                  </div>
               </Col>
            </Row>
   )
}
