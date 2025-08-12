import React, { useEffect, useRef } from "react";
import Header from "./Header/Header";
import MainPage from "../pages/MainPage/MainPage";
import HomePage from "../pages/Home/HomePage";

const Layout = () => {
  return (
    <>
      {/* <Header /> */}
      <main>
        {/* <MainPage /> */}
        <HomePage />
      </main>
    </>
  );
};

export default Layout;
