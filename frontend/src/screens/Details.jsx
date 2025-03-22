import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";
import { FaEdit, FaTrash } from "react-icons/fa";
import ReactMarkDown from "react-markdown";
import axios from "axios";
import { getFromLocalStorage } from "../utils/LocalStorage";

const Details = () => {
  const param = useParams();
  const navigate = useNavigate();
  const [diary, setDiary] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!getFromLocalStorage("userInfo")) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (param.id) {
      getDiaryApi({ _id: param.id });
    }
  }, [param.id]);

  const getDiaryApi = async ({ _id }) => {
    const userInfo = getFromLocalStorage("userInfo");
    if (!userInfo || !userInfo?.token) {
      console.error("User token is missing or undefined");
    } else {
      // console.log(userInfo.token);
    }
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/diary/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${getFromLocalStorage("userInfo")?.token}`,
          },
        }
      );
      setDiary(data?.diary);

      setFormStatus("edit");
    } catch (error) {
      setError(error?.response?.data?.error);
      setTimeout(() => {
        setError("");
      }, 5000);
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
        return navigate("/");
        ``;
      }
    } catch (error) {
      setError(error?.response?.data?.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
  return (
    <div className="collg8 col-md-10 col-12 mx-auto">
      {error && (
        <div className="alert alert-danger text-center mb-3"> {error} </div>
      )}
      <div className="card border-0 shadow-sm rounded-0">
        <div className="card-body">
          <div className="card-img-top text-center title">
            <span className="display-1">
              {moment(diary?.eventDate).format("DD")}
            </span>
            <span>{moment(diary?.eventDate).format("MMM YYYY, HH:mm:ss")}</span>
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
                  name={diary?.user?.name}
                  size="20"
                  textSizeRatio={1.75}
                  round="25px"
                  className="mb-1"
                />
                <small className="ms-2"> {diary?.user?.name} </small>
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
            <ReactMarkDown children={`${diary?.description}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
