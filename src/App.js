import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import MainPage from "./pages/MainPage/MainPage";
import FormDataComponent from "./pages/FormDataTesting/FormDataComponent";
import PostmanParams from "./pages/Home/Response/PostmanParams";
import PostmanParam2 from "./pages/Home/Response/PostmanParam2";
// import MenuComponent from "./pages/Home/test";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/main-page" element={<MainPage />} />
        <Route path="/form-data" element={<FormDataComponent />} />
        <Route  path="/postman-params" element={<PostmanParams />}/>
        <Route  path="/postman-params2" element={<PostmanParam2 />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
