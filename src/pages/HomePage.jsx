import { Button } from "antd";
import React, { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";
import { useDispatch, useSelector } from "react-redux";
import { loadNews } from "../redux/newsRedusers";
import Preloader from "../components/Preloader";
import axios, { all } from "axios";
import { getPadTime } from "../helpers/getPadTime";

const HomePage = (props) => {
  const uploadingNews = useSelector((state) => state.news);
  const [news, setNews] = useState(uploadingNews);
  const dispatch = useDispatch();

  const cicle = Math.floor(60);
  const [leftTime, setLeftTime] = useState(cicle);
  const timer = getPadTime(leftTime);

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
    setNews([]);
    await fechingNews();
  };

  const fechingNews = async () => {
    console.log("Зарос...");
    let arr = [];
    let count = 100;
    axios
      .get("https://hacker-news.firebaseio.com/v0/newstories.json")
      .then((response) => response.data)
      .then((json) => {
        json = json.slice(0, count);
        json.forEach((id) => {
          fetch("https://hacker-news.firebaseio.com/v0/item/" + id + ".json")
            .then((response) => response.json())
            .then(async (json) => {
              arr.push(json);
              if (arr.length >= count) {
                setNews(arr);
              }
            });
        });
      });

    // if (allNews.length >= 30) console.log("news");
  };

  useEffect(() => {
    fechingNews();
    console.log("Тут лежит: ", news.length);
    // setNews(uploadingNews);
  }, [uploadingNews, uploadingNews.length >= 10]);

  return (
    <main>
      <div className="header-news-list">
        <Button type="primary" onClick={() => UpdateStateAndResetTimer()}>
          Refresh
        </Button>
        <p>Automatic update after {timer} sec</p>
      </div>

      <div className="container">
        {news.length >= 1 ? (
          news.map((items) => {
            return (
              <NewsCard
                title={items.title}
                score={items.score}
                datePubluish={items.time}
                authtor={items.by}
                url={items.url}
                id={items.id}
                kids={items.kids}
                setId={props.setId}
              />
            );
          })
        ) : (
          <Preloader />
        )}
      </div>
    </main>
  );
};

export default HomePage;
