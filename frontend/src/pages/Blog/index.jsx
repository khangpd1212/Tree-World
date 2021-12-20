import {
  CalendarOutlined,
  CommentOutlined, DownOutlined, FolderViewOutlined,
  HeartOutlined, UserOutlined
} from "@ant-design/icons";
import { List, Skeleton } from "antd";
import BreadCrumb from "components/Base/BreadCrumb";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs, selectBlogs } from "redux/blog";
import "styles/blog.scss";
import { requests } from "utils/axios";

const count = 1;
export default function Blog() {
  const { blogList } = useSelector(selectBlogs);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    initLoading: true,
    loading: false,
    data: [],
    list: [],
  });

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  useEffect(() => {
    requests.getBlogLimit(count, list.length).then((res) => {
      setState({
        initLoading: false,
        data: res,
        list: res,
      });
    });
  }, [count]);

  const onLoadMore = () => {
    setState({
      loading: true,
      list: state.data.concat(
        [...new Array(1)].map(() => ({
          loading: true,
          title: "",
          content: "",
          image: "",
          create_date: "",
        }))
      ),
    });

    requests.getBlogLimit(count, list.length).then((res) => {
      const data = state.data.concat(res);
      setState({
        data,
        list: data,
        loading: false,
      });
    });
  };

  const { initLoading, loading, list } = state;
  const lengthLastBlog = blogList.length === list.length;

  const loadMore =
    !initLoading && !loading && !lengthLastBlog ? (
      <div className="icon-down" onClick={onLoadMore}>
        <DownOutlined />
      </div>
    ) : null;

  return (
    <div>
      <div id="blog">
        <BreadCrumb page="Blog" className="breadcrumb" />
        <div className="ourblog">
          <div className="cloud">
            <img
              src="./images/contact-mail-icon.png"
              alt=""
              srcset=""
              className="cloud-img"
            />
          </div>
          <div className="our-text">
            <h1>Our Blog</h1>
          </div>
        </div>
        <div className="banner">
          <div className="banner-1">
            <img
              src="./images/news-banner-1.png"
              alt=""
              srcset=""
              className="img-left1"
            />
          </div>
          <div className="banner-2">
            <img
              src="./images/news-banner-2.png"
              alt=""
              srcset=""
              className="img-right2"
            />
          </div>
        </div>
        <div className="banner">
          <div className="banner-3">
            <img
              src="./images/news-banner-3.png"
              alt=""
              srcset=""
              className="img-left3"
            />
          </div>
          <div className="banner-4">
            <img
              src="./images/news-banner-4.png"
              alt=""
              srcset=""
              className="img-right4"
            />
          </div>
        </div>
        <hr></hr>
        <div className="content">
          <div className="content-left">
            <List
              className="demo-loadmore-list"
              loading={initLoading}
              itemLayout="horizontal"
              loadMore={loadMore}
              dataSource={list}
              renderItem={(item) => (
                <Skeleton loading={item.loading} active>
                  <div className="wrapper_content">
                    <h1 className="title_content">{item.title}</h1>
                    <div className="info">
                      <div className="icon-blog user">
                        <UserOutlined />
                        <p>Linhcute</p>
                      </div>
                      <div className="icon-blog calendar">
                        <CalendarOutlined />
                        <p>
                          {moment(item.create_date).format(
                            "DD/MM/YYYY HH:mm:ss"
                          )}
                        </p>
                      </div>
                      <div className="icon-blog comment">
                        <CommentOutlined />
                        <p>0 comments</p>
                      </div>
                      <div className="icon-blog view">
                        <FolderViewOutlined />
                        <p>161 views</p>
                      </div>
                      <div className="icon-blog like">
                        <HeartOutlined />
                        <p>2 like</p>
                      </div>
                    </div>
                    <div className="content-text">
                      <p>{item.content}</p>
                    </div>
                    <div className="content-img">
                      <img src={item.image} alt="" srcset="" />
                    </div>
                  </div>
                </Skeleton>
              )}
            />
          </div>

          <div className="content-right">
            <div className="default-setting">
              <select id="setting">
                <option value="volvo">DEFAULT SETTING</option>
                <option value="saab">Saab</option>
                <option value="opel">Opel</option>
                <option value="audi">Audi</option>
              </select>
            </div>
            <p>RECENT POSTS</p>
            <div className="posts-list">
              {blogList &&
                blogList.map((item, key) => (
                  <div className="posts-list-1">
                    <h1>{key + 1}</h1>
                    <div className="posts-list-text">
                      <p>{item.title}</p>
                      <p>
                        {moment(item.create_date).format("dddd, MMMM Do YYYY")}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="banner-5">
        <img src="./images/news-banner-5.png" alt="" />
      </div>
    </div>
  );
}
