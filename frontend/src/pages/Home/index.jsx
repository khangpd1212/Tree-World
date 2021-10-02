import { Row, Col, Typography } from "antd";
import "styles/home.scss";
import "styles/button.scss";
const { Title,Paragraph } = Typography;
export default function Home(){
    return (
    <>
        <Row className="slider">
            <Col className="slider-left" xs={24} lg={14}>
                <img src="./images/slider.png" alt="img_slider-left"/>
            </Col>
            <Col className="slider-right" lg={10}>
                <img src="./images/slider2.png" alt="img_slider-right"/>
                <div className="slider-right_title">
                    <Title>Make your days feeling goods with beautiful plant</Title>
                </div>
                <div className="slider-right_content">
                    <Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing telit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Paragraph>
                    <button type="submit" class="btn-home">
                        See more
                    </button>
                </div>
            </Col>
        </Row>
    </>
    );
}