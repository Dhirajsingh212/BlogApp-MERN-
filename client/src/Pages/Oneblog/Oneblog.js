import React from "react";
import "./Oneblog.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export default function Oneblog() {
  let params = useParams().id;

  const [data, setdata] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/oneblog", {
        headers: { params },
      })
      .then((res) => {
        setdata(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="oneblog_navigate">
        <a href="/">Home</a>
      </div>
      <div className="oneblog_div">
        <h2>{data.title}</h2>
        <img src={`http://localhost:8000/images/${data.image}`} alt="" />
        <p>{data.description}</p>
        <h5>by {data.username}</h5>
      </div>
    </>
  );
}
