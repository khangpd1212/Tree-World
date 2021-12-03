import "styles/button.scss";
import "styles/Home/Home.scss";
import { useDispatch, useSelector } from "react-redux";
import { setLayoutStatus } from "redux/layout";

import Banner from "components/Home/Banner";
import SliderProduct from "components/Home/SliderProduct";
import RecommendHome from "components/Home/RecommendHome";
import HeaderProduct from "components/Home/HeaderProduct";
import Button from "../../components/utils/Button";
import BlogHome from "components/Home/BlogHome";
import { useEffect } from "react";
import { filterProducts, selectProducts } from "redux/product";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

export default function Home() {
  const dispatch = useDispatch();
  dispatch(setLayoutStatus(false));
  const { productList } = useSelector(selectProducts);
  const { filterProduct } = useSelector(selectProducts);
  const { filterStatus } = useSelector((state) => state.layoutState);
  const filterOptions = useSelector((state) => state.filterState);
  const { loading } = useSelector(selectProducts);

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
          <SliderProduct products={filterProduct} />
        ) : (
          <div className="spinner--loading">
            <Spin indicator={antIcon} />
          </div>
        )}
        <div className="h_product-button">
          <Button title="all product >>" />
        </div>
      </div>
      <RecommendHome />
    </div>
  );
}
