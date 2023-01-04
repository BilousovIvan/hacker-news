import React, { useEffect, useState } from "react";
import { Breadcrumb, Button } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import Comment from "../components/Comment";
import Preloader from "../components/Preloader";
import axios from "axios";
import MetaData from "../components/MetaData";
import { getPadTime } from "../helpers/getPadTime";
const NewsPage = ({ id }) => {
  const cicle = Math.floor(60);
  const [leftTime, setLeftTime] = useState(cicle);
  const timer = getPadTime(leftTime);

  let [title, setTitle] = useState(false);
  let [score, setScore] = useState();
  let [datePubluish, setDatepulish] = useState();
  let [authtor, setAuthtor] = useState();
  let [url, setUrl] = useState();
  let [kids, setKids] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLeftTime((leftTime) => (leftTime >= 1 ? leftTime - 1 : cicle));
      if (leftTime <= 0) {
        UpdateStateAndResetTimer();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [leftTime]);

  const UpdateStateAndResetTimer = async () => {
    console.log("Обновление...");
    setKids([]);
    fechingNews();
  };

  const fechingNews = () => {
    // fetch("https://hacker-news.firebaseio.com/v0/item/" + id + ".json")
    axios
      .get("https://hacker-news.firebaseio.com/v0/item/" + id + ".json")
      .then((res) => res.data)
      .then((json) => {
        setTitle(json.title);
        setUrl(json.url);
        setAuthtor(json.by);
        setScore(json.score);
        setDatepulish(
          moment.unix(json.time).clone().format("DD.MM.YYYY. hh:mm")
        );
        if (json.kids) {
          setKids(json.kids);
        }
        console.log(json.kids);
      });
  };
  useEffect(() => {
    fechingNews();
  }, []);

  return (
    <>
      <div className="header-news-list">
        <Button type="primary" onClick={() => UpdateStateAndResetTimer()}>
          Refresh
        </Button>
        <p>Automatic update after {timer} sec</p>
      </div>
      <div className="container-news-page">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{title}</Breadcrumb.Item>
        </Breadcrumb>
        {title ? (
          <>
            <h1>{title}</h1>
            <Button>
              <a href={url} target="_blank">
                {url}
              </a>
            </Button>
            {/* <p>{score} points</p>
            <p>Published: {datePubluish}</p>
            <p>By: {authtor}</p> */}

            <MetaData
              score={score}
              time={datePubluish}
              comments={kids}
              authtor={authtor}
            />
            {kids.map((id) => {
              return <Comment id={id} />;
            })}
            {/* <Comment kids={kids} /> */}
          </>
        ) : (
          <Preloader />
        )}
      </div>
    </>
  );
};
export default NewsPage;
