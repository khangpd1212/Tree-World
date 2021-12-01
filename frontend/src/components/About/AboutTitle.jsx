import { memo } from 'react'
import "styles/About/index.scss"
import BreadCrumb from 'components/Base/BreadCrumb'

function AboutTitle() {
  return (
    <div className="about">
      <div className="breadcrumb">
        <BreadCrumb page="About Us" className="breadcrumb" />
      </div>
      <div className="aboutTitle">
        <img className="welcomeImg" src="./images/aboutUs-welcome.png" alt="" />
        <p className="aboutTitle__content">
          On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain.
        </p>
        <div className="aboutTitle__Btn">
          <button className="watchNews">
            watch news            
          </button>
          <button className="seeProduct">
            see product
          </button>
        </div>
      </div>
    </div>
  )
}
export default memo(AboutTitle);
