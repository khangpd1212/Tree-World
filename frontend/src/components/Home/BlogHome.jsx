import React from 'react'
import { Col, Row } from "antd";
import { SwapRightOutlined } from '@ant-design/icons';
import "styles/Home/BlogHome.scss";

export default function BlogHome() {
   return (
      <div className="blog container_home">
         <h1 className="blog__title">News today</h1>
         <Row gutter={30}>
            <Col md={12}>
               <div className="blog__wrapper bg-item_blog">
                  <img srcSet="./images/news-banner-1.png" alt="blog-main" />
                  <div className="blog__wrapper--content">
                     <h1 className="content__heading font-title">Lorem ipsum dolor sit amet, consectetur, adipiscing ut</h1>
                     <p className="content__date font-content">2021/07/08</p>
                     <p className="content__main font-content">
                        adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                     </p>
                     <button className="btn-read_more">read more <SwapRightOutlined /></button>
                  </div>
               </div>
            </Col>
            <Col md={12}>
               <Row gutter={[0, 30]} wrap="false">
                  <Col>
                     <div className="blog__flex bg-item_blog">
                        <div className="blog__img">
                           <img srcSet="./images/section_news.png" alt="blog" />
                        </div>
                        <div className="blog__flex--content">
                           <h1 className="blog__flex--heading font-title">Lorem ipsum</h1>
                           <p className="content__date font-content">2021/07/08</p>
                           <button className="btn-read_more">read more <SwapRightOutlined /></button>
                        </div>
                     </div>
                  </Col>
                  <Col>
                     <div className="blog__flex bg-item_blog">
                        <div className="blog__img">
                           <img srcSet="./images/section_news.png" alt="blog" />
                        </div>
                        <div className="blog__flex--content">
                           <h1 className="blog__flex--heading font-title">Lorem ipsum</h1>
                           <p className="content__date font-content">2021/07/08</p>
                           <button className="btn-read_more">read more <SwapRightOutlined /></button>
                        </div>
                     </div>
                  </Col>
                  <Col>
                     <div className="blog__flex bg-item_blog">
                        <div className="blog__img">
                           <img srcSet="./images/section_news.png" alt="blog" />
                        </div>
                        <div className="blog__flex--content">
                           <h1 className="blog__flex--heading font-title">Lorem ipsum</h1>
                           <p className="content__date font-content">2021/07/08</p>
                           <button className="btn-read_more">read more <SwapRightOutlined /></button>
                        </div>
                     </div>
                  </Col>
               </Row>
            </Col>
         </Row>
      </div>
   )
}
