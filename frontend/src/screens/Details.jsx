import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { events } from "../utils/Data";
import moment from "moment";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";
import { FaEdit, FaTrash } from "react-icons/fa";
import ReactMarkDown from "react-markdown";

const Details = () => {
  const param = useParams();
  const navigate = useNavigate();
  const [diary, setDiary] = useState([]);
  const [error, setError] = useState("");

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (confirm) {
      console.log(id);
    }
  };

  useEffect(() => {
    if (param.id) {
      const event = events?.find((obj) => obj._id === param.id);
      if (!event) {
        return navigate("/");
      }
      setDiary(event);
    }
  }, [param.id]);

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
