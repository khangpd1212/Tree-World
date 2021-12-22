import { SwapRightOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import moment from "moment";
import React from "react";
import "styles/Home/BlogHome.scss";
import { fetchBlogs, selectBlogs } from "redux/blog";
import { requests } from "utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
export default function BlogHome() {
  const [dataBlog, setDataBlog] = useState([]);
  const [firstBlog, setFirstBlog] = useState({});
  const dispatch = useDispatch();
  const count = 3;
  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  useEffect(() => {
    requests.getBlogLimit(count, 1).then((res) => {
      setDataBlog(res);
    });
    requests.getBlogLimit(1, 0).then((res) => {
      setFirstBlog(res[0]);
    });
  }, [count]);
 
  return (
    <div className="blog container_home">
      <h1 className="blog__title">News today</h1>
      <Row gutter={(0, 40)}>
        <Col md={12}>
          <div className="blog__wrapper bg-item_blog">
            <img srcSet="./images/news-banner-1.png" alt="blog-main" />
            <div className="blog__wrapper--content">
              <h1 className="content__heading font-title">
                {firstBlog.title}
              </h1>
              <p className="content__date font-content">
                {moment(firstBlog.create_date).format("DD/MM/YYYY HH:mm:ss")}
              </p>
              <p className="content__main font-content">
                {firstBlog.content}
              </p>
              <button className="btn-read_more">
                read more <SwapRightOutlined />
              </button>
            </div>
          </div>
        </Col>
        <Col md={12}>
          <Row gutter={[0, 40]} wrap="false">
            {dataBlog &&
              dataBlog.map((item) => (
                <Col key={item._id}>
                  <div className="blog__flex bg-item_blog">
                    <div className="blog__img">
                      <img srcSet="./images/section_news.png" alt="blog" />
                    </div>
                    <div className="blog__flex--content">
                      <h1 className="blog__flex--heading font-title">
                        {item.title}
                      </h1>
                      <p className="content__date font-content">
                        {moment(item.create_date).format("DD/MM/YYYY HH:mm:ss")}
                      </p>
                      <button className="btn-read_more">
                        read more <SwapRightOutlined />
                      </button>
                    </div>
                  </div>
                </Col>
              ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
}
