import React from 'react'
import "styles/blog.scss"
import BreadCrumb from 'components/Base/BreadCrumb'
import { UserOutlined, CalendarOutlined, CommentOutlined, FolderViewOutlined, HeartOutlined, DownOutlined  } from '@ant-design/icons';
export default function Blog() {
return (
   <div>
<div id="blog">

   <BreadCrumb page="Blog" className="breadcrumb" />
   <div className="ourblog">
      <div className="cloud">
         <img src="./images/contact-mail-icon.png" alt="" srcset="" className="cloud-img" />
      </div>
      <div className="our-text">
         <h1>Our Blog</h1>
      </div>
   </div>
   <div className="banner">
      <div className="banner-1">
         <img src="./images/news-banner-1.png" alt="" srcset="" className="img-left1" />
      </div>
      <div className="banner-2">
         <img src="./images/news-banner-2.png" alt="" srcset="" className="img-right2" />
      </div>


   </div>
   <div className="banner">
      <div className="banner-3">
         <img src="./images/news-banner-3.png" alt="" srcset="" className="img-left3" />
      </div>
      <div className="banner-4">
         <img src="./images/news-banner-4.png" alt="" srcset="" className="img-right4" />
      </div>
   </div>
   <hr>
   </hr>
   <div className="content">
      <div className="content-left">
         <h1>HOW TO PLANT A SUCCULENT</h1>
         <div className="info">
                  <div className="icon-blog user">
               <UserOutlined />
               <p>Linhcute</p>
            </div>
                  <div className="icon-blog calendar">
               <CalendarOutlined />
               <p>December 10, 2018</p>
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
               <p>The goal of this new editor is to make adding rich content to WordPress simple and enjoyable. This whole post is composed of pieces of content—somewhat similar to LEGO bricks—that you can move around and interact with. Move your cursor around and you’ll notice the different blocks light up with outlines and arrows. Press the […]</p>
        </div>
        <div className="content-img">
               <img src="./images/slider2.png" alt="" srcset="" />
        </div>
        <hr></hr>
            <h1>HOW TO PLANT A SUCCULENT</h1>
            <div className="info">
               <div className="icon-blog user">
                  <UserOutlined />
                  <p>Linhcute</p>
               </div>
                  <div className="icon-blog calendar">
                  <CalendarOutlined />
                  <p>December 10, 2018</p>
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
               <p>The goal of this new editor is to make adding rich content to WordPress simple and enjoyable. This whole post is composed of pieces of content—somewhat similar to LEGO bricks—that you can move around and interact with. Move your cursor around and you’ll notice the different blocks light up with outlines and arrows. Press the […]</p>
            </div>
            <div className="content-img">
               <img src="./images/slider2.png" alt="" srcset="" />
            </div>
            <div className="icon-down">   <DownOutlined /></div>
         


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
               <div className="posts-list-1">
                  <h1>1</h1>
                  <div className="posts-list-text">
                     <p>How to Plant a Succulent</p>
                     <p> December 10, 2018</p>
                  </div>
                 
               </div>
               <div className="posts-list-1">
                  <h1>1</h1>
                  <div className="posts-list-text">
                     <p>How to Plant a Succulent</p>
                     <p> December 10, 2018</p>
                  </div>
               </div>
               <div className="posts-list-1">
                  <h1>1</h1>
                  <div className="posts-list-text">
                     <p>How to Plant a Succulent</p>
                     <p> December 10, 2018</p>
                  </div>
               </div>
               <div className="posts-list-1">
                  <h1>1</h1>
                  <div className="posts-list-text">
                     <p>How to Plant a Succulent</p>
                     <p> December 10, 2018</p>
                  </div>
               </div>
               <div className="posts-list-1">
                  <h1>1</h1>
                  <div className="posts-list-text">
                     <p>How to Plant a Succulent</p>
                     <p> December 10, 2018</p>
                  </div>
               </div>
            </div>
      </div>
   </div>
    

</div>
      <div className="banner-5">
         <img src="./images/news-banner-5.png" alt="" />
      </div>
   </div>
   
)
}