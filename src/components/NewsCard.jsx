import {
  CommentOutlined,
  FieldTimeOutlined,
  FireFilled,
  UserOutlined,
} from "@ant-design/icons";
import { Divider } from "antd";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import MetaData from "./MetaData";

const NewsCard = ({
  title,
  id,
  score,
  datePubluish,
  authtor,
  url,
  setId,
  kids,
}) => {
  const date = moment.unix(datePubluish).clone().format("DD.MM.YYYY. hh:mm");

  // setTitle(title);
  // setAuthtor(authtor);
  // setDatepulish(datePubluish);
  // setPoints(points);
  // setUrl(url);
  let comments = [];
  comments = kids;
  return (
    <Link
      to={"/news/id=" + id}
      title={title}
      onClick={() => {
        setId(id);
      }}
    >
      <div
        className="news-card-items-container"
        onClick={() => console.log("colck")}
      >
        <h2>{title}</h2>
        <Divider />
        <MetaData
          score={score}
          time={datePubluish}
          comments={kids}
          authtor={authtor}
        />
      </div>
    </Link>
  );
};

export default NewsCard;
