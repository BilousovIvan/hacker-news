import { Button, Tree } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import MetaData from "./MetaData";

const Comment = ({ id }) => {
  const [comments, setComments] = useState();
  const [showKids, setShow] = useState(false);

  const fetching = async () => {
    console.log(
      "try connecting... ",
      "https://hacker-news.firebaseio.com/v0/item/" + id + ".json"
    );
    axios
      .get("https://hacker-news.firebaseio.com/v0/item/" + id + ".json")
      .then((res) => {
        const c = res.data;
        setComments(c);
      });
  };

  useEffect(() => {
    fetching();
  }, []);

  const showCommentsHandler = () => {
    if (comments.kids) {
      if (showKids) {
        setShow(false);
      } else {
        setShow(true);
      }
    }
  };

  return (
    <div className="comment-wrapper">
      {comments && (
        <>
          <p>{comments.text}</p>

          <div className="comments-container-footer">
            <MetaData
              score={comments.score}
              time={comments.time}
              comments={comments.kids}
              authtor={comments.by}
            />
            {comments.kids && (
              <Button type="primary" onClick={() => showCommentsHandler()}>
                {showKids ? "Hide comments" : "Show comments"}
              </Button>
            )}
          </div>

          {/* {comments.kids ? <Comment id={comments.kids} /> : <></>} */}
        </>
      )}
      {/* {comments.kids && <p> Есть дочерне коменнтарии: {comments.kids}</p>} */}
      {/* {props.kids.length >= 1 ? <Comment kids={props.kids} /> : "0"} */}
      {showKids && (
        <>
          {comments.kids.map((item) => {
            return <Comment id={item} />;
          })}
        </>
      )}
    </div>
  );
};

export default Comment;
