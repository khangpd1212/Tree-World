import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import Banner from "components/Home/Banner";
import BlogHome from "components/Home/BlogHome";
import HeaderProduct from "components/Home/HeaderProduct";
import RecommendHome from "components/Home/RecommendHome";
import SliderProduct from "components/Home/SliderProduct";
import Button from "components/utils/Button";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectBlogs } from "redux/blog";
import { setLayoutStatus } from "redux/layout";
import { filterProducts, selectProducts } from "redux/product";
import "styles/button.scss";
import "styles/Home/Home.scss";
export default function Home() {
  const dispatch = useDispatch();
  dispatch(setLayoutStatus(false));
  const { filterProduct, loading } = useSelector(selectProducts);
  const filterOptions = useSelector((state) => state.filterState);
  const showFilterProduct = filterProduct.filter(
    (item) => item.status === true
  );
  const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;
  useEffect(() => {
    dispatch(filterProducts(filterOptions));
  }, [dispatch, filterOptions]);

  return (
    <div id="Home">
      <Banner />
      <div className="product-wrapper container_home">
        <HeaderProduct />

        {loading === "loaded" ? (
          <SliderProduct products={showFilterProduct} />
        ) : (
          <div className="spinner--loading">
            <Spin indicator={antIcon} />
          </div>
        )}
        <Link to="product">
          <div to="product" className="h_product-button">
            <Button title="all product >>" />
          </div>
        </Link>
      </div>
      <RecommendHome />
      <BlogHome />
    </div>
  );
}
