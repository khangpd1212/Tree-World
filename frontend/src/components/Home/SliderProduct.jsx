import Slider from "react-slick";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";
import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../styles/Home/SliderProduct.scss";
import SliderProductComp from "./SliderProductComp";



export default function SliderProduct({ products }) {
  var settings = {
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    lazyLoad: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 480,
        settings: {
          autoplaySpeed: 3000,
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };

  return (
    <Slider className="h_product-main" {...settings}>
      {products &&
        products.map((productItem, index) => (
          <SliderProductComp key={index} product={productItem} />
        ))}
    </Slider>
  );
}
