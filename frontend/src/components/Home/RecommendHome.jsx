import React from 'react'
import { Col, Row } from "antd";
import { InfoCircleFilled } from '@ant-design/icons';
import Button from '../../components/utils/Button';
export default function RecommendHome() {
   return (
      <Row className="section_hot container_home" align="middle">
         <Col lg={11} xl={12}>
            <Row align="middle" className="section_hot__left">
               <Col className="section_hot__img" xs={16} sm={15} lg={16} xl={12}>
                  <img srcSet="./images/section3.png" alt="img_plots" />
               </Col>
               <Col className="section_hot__card" xs={8} sm={9} lg={8} xl={12}>
                  <div className="card--top card__flex">
                     <div className="card__icon">
                        <InfoCircleFilled style={{ color: "black", background: "white", borderRadius: "100%" }} />
                     </div>
                     <div className="card__content">
                        <p className="card__content--title">Lorem issum dolor</p>
                        <div className="card__content--bar"></div>
                     </div>
                  </div>
                  <div className="card--center card__flex">
                     <div className="card__icon">
                        <InfoCircleFilled style={{ color: "black", background: "white", borderRadius: "100%" }} />
                     </div>
                     <div className="card__content">
                        <p className="card__content--title">Lorem issum dolor</p>
                        <div className="card__content--bar"></div>
                     </div>
                  </div>
                  <div className="card--bottom card__flex">
                     <div className="card__icon">
                        <InfoCircleFilled style={{ color: "black", background: "white", borderRadius: "100%" }} />
                     </div>
                     <div className="card__content">
                        <p className="card__content--title">Lorem issum dolor</p>
                        <div className="card__content--bar"></div>
                     </div>
                  </div>
               </Col>
            </Row>
         </Col>
         <Col lg={13} xl={12}>
            <div className="section_hot__desc">
               <h1 className="desc__title">Lorem ipsum dolor sit amet, consectetur.</h1>
               <div className="desc__content">
                  <p className="desc__content--large">adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                  <div className="desc__content--small">
                     <div className="desc__content--flex">
                        <InfoCircleFilled style={{ color: "black", background: "white", borderRadius: "100%" }} />
                        <span>consectetur adipiscing elit</span>
                     </div>
                     <div className="desc__content--flex">
                        <InfoCircleFilled style={{ color: "black", background: "white", borderRadius: "100%" }} />
                        <span>et dolore magna aliqua</span>
                     </div>
                     <div className="desc__content--flex">
                        <InfoCircleFilled style={{ color: "black", background: "white", borderRadius: "100%" }} />
                        <span>sed do eiusmod tempor incididunt ut </span>
                     </div>
                  </div>
                  <div className="desc__content--btn">
                     <Button title="see more" />
                  </div>
               </div>
            </div>
         </Col>
      </Row>
   )
}
