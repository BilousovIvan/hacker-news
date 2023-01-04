import {
  CommentOutlined,
  FieldTimeOutlined,
  FireFilled,
  UserOutlined,
} from "@ant-design/icons";
import { Divider } from "antd";
import moment from "moment";
import React from "react";

const MetaData = ({ score, time, comments, authtor }) => {
  const date = moment.unix(time).clone().format("DD.MM.YYYY. hh:mm");
  let child = [];
  child = comments;

  return (
    <div className="news-card-meta">
      {score && (
        <>
          <FireFilled />
          <p>{score} </p>
          <Divider type="vertical" />
        </>
      )}

      <FieldTimeOutlined />
      <p>{date} </p>
      <Divider type="vertical" />
      <CommentOutlined />
      {comments ? <p>{child.length} </p> : <p>No comments</p>}
      {/*  */}
      <Divider type="vertical" />
      <UserOutlined />
      <p>{authtor} </p>
    </div>
  );
};

export default MetaData;
