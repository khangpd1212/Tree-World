import { Col, Row } from "antd";
import BreadCrumb from "components/Base/BreadCrumb";
import ContactContent from "components/Contact/ContactContent";
import ContactForm from "components/Contact/ContactForm";
import ContactIcon from "components/Contact/ContactIcon";
import { useDispatch } from "react-redux";
import { setLayoutStatus } from "redux/layout";
import "styles/contact.scss";
export default function Contact() {
  const dispatch = useDispatch();
  dispatch(setLayoutStatus(true));
  return (
    <>
      <div className="contact">
        <BreadCrumb page="Contact" />
        <ContactContent />
        <ContactIcon />
        <div className="contact__form">
          <p className="contact__form--title">get in touch</p>
          <Row align="middle">
            <Col xs={24} sm={24} md={24} lg={10} xl={12}>
              <div className="contact__form--img tabletHidden">
                <img src="images/contactForm-mail-icon.png" alt="mailIcon" />
              </div>
            </Col>

            <Col xs={24} sm={24} md={24} lg={14} xl={12}>
              <ContactForm />
            </Col>
          </Row>
        </div>
      </div>
      <div className="contact__google--maps">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1380.526078431959!2d106.69775201378681!3d10.786687222407343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ff0ea95d837%3A0xc1d0ec1d95918f98!2sLIM%20Tower%203!5e0!3m2!1svi!2s!4v1634895527710!5m2!1svi!2s"
          width="100%"
          height="450px"
          style={{ border: "0" }}
          allowFullScreen=""
          loading="lazy"
          title="map"
        ></iframe>
      </div>
    </>
  );
}
