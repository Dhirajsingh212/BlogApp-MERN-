import React from "react";
import "./Blog.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function Blog() {
  const [array, setarray] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/getallblogs")
      .then((res) => {
        setarray(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {array.map((e, i) => (
        <div className="blog_div" id="blog" key={i}>
          <div className="blog_div_text">
            <h2>{e.title.slice(0, 100)}</h2>
            <p>
              {e.description.slice(0, 500)}..
              <a className="blog_div_text_link" href={`/${e._id}`}>
                more
              </a>
            </p>
            <p>by {e.username}</p>
          </div>
          <div className="blog_div_img">
            <img src={`http://localhost:8000/images/${e.image}`} alt="" />
          </div>
        </div>
      ))}
    </>
  );
}
