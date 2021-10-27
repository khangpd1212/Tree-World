import "styles/home.scss";
import "styles/button.scss";

import { useDispatch } from "react-redux";
import { setLayoutStatus } from "redux/layout";
import { fetchPosts } from "redux/post";

import Banner from "components/Home/Banner";
import SliderProduct from "components/Home/SliderProduct";
import RecommendHome from "components/Home/RecommendHome";
import { unwrapResult } from "@reduxjs/toolkit";
import { axiosRequest } from '../../utils/axios';
import { requests } from '../../utils/requests';
import { useEffect } from 'react';
export default function Home() {
  const dispatch = useDispatch();
  dispatch(setLayoutStatus(false));

  return (
    <>
      {/* Slide */}
      <Banner/>
      {/* product home */}
      <SliderProduct/>
      {/* introduce product */}
      <RecommendHome/>
    </>
  );
}
