import React, { useEffect, useState } from "react";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import { FaEdit, FaTrash } from "react-icons/fa";
import ReactMarkDown from "react-markdown";
import axios from "axios";
import { getFromLocalStorage } from "../utils/LocalStorage";

const Home = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [q, setQ] = useState("");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (!getFromLocalStorage("userInfo")) {
      navigate("/login");
    }
  }, [navigate]);

  const getDiariesApi = async () => {
    try {
      const userInfo = getFromLocalStorage("userInfo");
      if (!userInfo || !userInfo.token) {
        throw new Error("User is not authenticated");
      }

      const { data } = await axios.get("http://localhost:5000/api/diary", {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      if (Array.isArray(data.diaries)) {
        setEvents(data.diaries);
      } else {
        console.error("Expected an array but got:", data);
        setEvents([]);
      }
    } catch (error) {
      setError(
        error?.response?.data?.error ||
          error.message ||
          "Failed to fetch diaries"
      );
      setTimeout(() => setError(""), 5000);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete?");
      if (confirm) {
        await axios.delete(`http://localhost:5000/api/diary/${id}`, {
          headers: {
            Authorization: `Bearer ${getFromLocalStorage("userInfo")?.token}`,
          },
        });
        return getDiariesApi();
        ``;
      }
    } catch (error) {
      setError(error?.response?.data?.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const filterDiaries = events.filter((diary) => {
    return diary?.title?.toLowerCase().includes(q.toLowerCase());
  });

  useEffect(() => {
    getDiariesApi();
  }, []);

  return (
    <div className="row gy-3">
      <div className="col-lg-12 mt-3">
        <h1 className="text-center font-monospace">
          Diaries List [{filterDiaries?.length}]
        </h1>
        <div className="row">
          <div className="col-lg-3 col-md-5 col-12 mx-auto">
            <div className="input-group  mb-3">
              <input
                type="text"
                name="text"
                id="text"
                onChange={(e) => setQ(e.target.value)}
                value={q}
                className="form-control shadow-none"
                placeholder="Search By Title"
                aria-describedby="search"
              />
              <button
                className="btn btn-outline-primary"
                type="button"
                id="search"
              >
                SEARCH
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="alert alert-danger text-center mb-3"> {error} </div>
        )}
      </div>
      {filterDiaries?.map((diary) => (
        <div key={diary?._id} className="col-lg-4 col-md-6 col-12 mb-3">
          <div className="card border-0 shadow-sm rounded-0">
            <div className="card-body">
              <div className="card-img-top text-center title">
                <span className="display-1">
                  {moment(diary?.eventDate).format("DD")}
                </span>
                <span>
                  {moment(diary?.eventDate).format("MMM YYYY, HH:mm:ss")}
                </span>
              </div>
              <hr />
              <Link
                to={`/diary/details/${diary?._id}`}
                className="text-decoration-none"
              >
                <h2 className="card-title font-monospace fs5 fw-bold ">
                  {diary?.title}
                </h2>
              </Link>
              <div className="card-text">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <Avatar
                      name={diary?.user.name}
                      size="20"
                      textSizeRatio={1.75}
                      round="25px"
                      className="mb-1"
                    />
                    <small className="ms-2"> {diary?.user.name} </small>
                  </div>
                  <div>
                    <Link to={`/diary/form/${diary?._id}`}>
                      <FaEdit className="fs-3" />
                    </Link>
                    <FaTrash
                      className="text-danger ms-2 fs-4"
                      onClick={() => handleDelete(diary?._id)}
                    />
                  </div>
                </div>
                <ReactMarkDown
                  children={`${diary?.description?.slice(0, 90)}...`}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
