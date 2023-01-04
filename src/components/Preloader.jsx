import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const Preloader = () => {
  // Icon loading
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <div className="preloader-container">
      <Spin indicator={antIcon} />
      <h1>Loading...</h1>
    </div>
  );
};

export default Preloader;
