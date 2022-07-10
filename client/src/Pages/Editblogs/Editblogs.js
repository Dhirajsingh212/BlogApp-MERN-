import axios from "axios";
import React from "react";
import "./Editblogs.css";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Context } from "../../Context/Context";
import { useNavigate } from "react-router-dom";

export default function Editblogs() {
  const { error, isFetching, token, dispatch } = useContext(Context);

  let Navigate = useNavigate();

  const params = useParams().id;

  const [description, setdescription] = useState("");
  const [title, settitle] = useState("");
  const [image, setimage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/editblogs", {
        headers: {
          params,
        },
      })
      .then((res) => {
        settitle(res.data.data[0].title);
        setdescription(res.data.data[0].description);
        setimage(res.data.data[0].image);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const changetitle = (e) => {
    settitle(e.target.value);
  };

  const changedescrip = (e) => {
    setdescription(e.target.value);
  };

  const changeimage = (e) => {
    setimage(e.target.files[0]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("description", description);
    formdata.append("image", image);
    dispatch({ type: "UPDATE_BLOG_START" });
    try {
      await axios.patch("http://localhost:8000/updateblogs", formdata, {
        headers: {
          token,
          params,
        },
      });
      dispatch({ type: "UPDATE_BLOG_SUCCESS" });
      Navigate("/");
    } catch (err) {
      dispatch({ type: "UPDATE_BLOG_FAIL" });
    }
  };

  if (isFetching) {
    return <div className="loading"></div>;
  }
  if (error) {
    return <div>error</div>;
  }
  if (token === null) {
    return (
      <div>
        please <a href="/login">login</a>
      </div>
    );
  }

  return (
    <>
      <div className="editblogs_navigate_home">
        <a href="/">Home</a>
      </div>
      <form className="editblogs_div container" onSubmit={submitHandler}>
        <textarea
          type="text"
          value={title}
          name="title"
          onChange={changetitle}
        />
        <textarea
          type="text"
          value={description}
          onChange={changedescrip}
          name="description"
        />
        <input type="file" name="image" onChange={changeimage} />
        <button>Update</button>
      </form>
    </>
  );
}
