import { memo } from 'react'
import "styles/About/index.scss"
import { DownOutlined } from '@ant-design/icons';

function AboutAlbum() {
  return (
    <div className="about">
     <div className="aboutAlbum">

      <div className="aboutAlbum__title">
        <div className="aboutAlbum__title--left"></div>
          <div className="aboutAlbum__title--center">Album Collection</div>
        <div className="aboutAlbum__title--right"></div>
      </div>


      <div className="aboutAlbum__album">
          <div className="leftItem">
            <div className="leftItem--top">
              <img className="left" src="./images/aboutUs-album-1.png" alt="" />
              <img className="right" src="./images/aboutUs-album-3.png" alt="" />
            </div>
            <div className="leftItem--center">
              <img className="left" src="./images/aboutUs-album-2.png" alt="" />
              <img className="right" src="./images/aboutUs-album-4.png" alt="" />
            </div>
            <div className="leftItem--bottom">
              <img src="./images/aboutUs-album-5.png" alt="" />
            </div>
        </div>

        <div className="centerItem">
            <img className="top" src="./images/aboutUs-album-6.png" alt="" />
            <img className="bottom" src="./images/aboutUs-album-7.png" alt="" />
        </div>
         
         <div className="rightItem">
            <img className="top" src="./images/aboutUs-album-8.png" alt="" />
            <img className="center" src="./images/aboutUs-album-9.png" alt="" />
            <img className="bottom" src="./images/aboutUs-album-10.png" alt="" />
         </div>
      </div>



      <div className="aboutAlbum__button">
        <button className="albumBtn">more information</button>
          <DownOutlined className="downOutIcon"/>
      </div>

     </div>
    </div>
  )
}
export default memo(AboutAlbum);
