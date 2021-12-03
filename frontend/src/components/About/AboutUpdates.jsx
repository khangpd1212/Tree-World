import { memo } from 'react'
import "styles/About/index.scss"
import { DownOutlined } from '@ant-design/icons';

function AboutUpdates() {
  return (
    <div className="about">
      <div className="aboutUpdates">

        <div className="aboutUpdates__title">
          <div className="aboutUpdates__title--left"></div>
          <div className="aboutUpdates__title--center">Our Updates</div>
          <div className="aboutUpdates__title--right"></div>
        </div>

        <div className="aboutUpdates__content">
          <div className="top__content">
              <h1 className="month">April <h1 className="day">15</h1></h1>
              <h2 className="first title">Special exhibit: Foods of the Americas</h2>
              <span className="first content">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo conse.</span>
          </div>
          <div className="center__content">
            <span className="second content">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo conse.</span>
            <h2 className="second title">Fall harvest dinner an education fundraiser</h2>
            <h1 className="month">April <h1 className="day">17</h1></h1>
          </div>
          <div className="third__content">
            <h1 className="month">April <h1 className="day">19</h1></h1>
            <h2 className="first title">Native plant sale Extravaganza discount</h2>
            <span className="first content">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo conse.</span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default memo(AboutUpdates);
