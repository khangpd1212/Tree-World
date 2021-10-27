import React from 'react'
import { Col, Row } from "antd";

export default function RecommendHome() {
   return (
      <Row className="section_hot">
         <Col className="section_hot__left" md={12}>
            <div className="section_hot__img">
               {/* <ModelViewer type="gtlf" src={modelPath} /> */}
               {/* <model-viewer id="reveal" loading="eager" camera-controls auto-rotate src="https://sketchfab.com/3d-models/simple-pot-and-plant-d489a069b49c4451a0fa17130fba4c28" alt="A 3D model of a shishkebab"></model-viewer> */}
            </div>
            <div className="section_hot__top">

            </div>
         </Col>
      </Row>
   )
}
