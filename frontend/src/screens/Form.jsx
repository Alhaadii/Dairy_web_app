import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { getFromLocalStorage } from "../utils/LocalStorage";
import axios from "axios";

const Form = () => {
  const param = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [formStatus, setFormStatus] = useState("add");

  useEffect(() => {
    if (!getFromLocalStorage("userInfo")) {
      navigate("/login");
    }
  }, [navigate]);

  const createDiaryApi = async ({ title, description, eventDate }) => {
    try {
      await axios.post(
        "http://localhost:5000/api/diary",
        {
          title,
          description,
          eventDate,
        },
        {
          headers: {
            Authorization: `Bearer ${getFromLocalStorage("userInfo")?.token}`,
          },
        }
      );
      return navigate("/");
    } catch (error) {
      setError(error?.response?.data?.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const updateDiaryApi = async ({ _id, title, description, eventDate }) => {
    try {
      await axios.put(
        `http://localhost:5000/api/diary/${_id}`,
        {
          title,
          description,
          eventDate,
        },
        {
          headers: {
            Authorization: `Bearer ${getFromLocalStorage("userInfo")?.token}`,
          },
        }
      );
      return navigate("/");
    } catch (error) {
      setError(error?.response?.data?.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

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
      setTitle(data?.diary?.title);
      setDescription(data?.diary?.description);
      setEventDate(data?.diary?.eventDate);
      setId(data?.diary?._id);
      setFormStatus("edit");
    } catch (error) {
      setError(error?.response?.data?.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  useEffect(() => {
    if (param.id) {
      getDiaryApi({ _id: param.id });
    } else {
      setFormStatus("add");
      setId("");
      setTitle("");
      setDescription("");
      setEventDate("");
    }
  }, [param]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formStatus === "add") {
      // Add form submission logic
      return createDiaryApi({ title, description, eventDate });
    }
    if (formStatus === "edit") {
      // Edit form submission logic
      return updateDiaryApi({ _id: id, title, description, eventDate });
    }
  };

  return (
    <FormContainer>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="col-lg-8 col-md-10 col-12 mx-auto shadow-sm p-5">
          {error && <div className="alert alert-danger">{error}</div>}
          <h1 className="text-center title">Diary Form</h1> <hr />
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              cols={30}
              rows={10}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="eventDate" className="form-label">
              Event Date
            </label>
            <input
              type="datetime-local"
              className="form-control"
              id="eventDate"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              required
            />
          </div>
          <Link to="/" className="btn btn-secondary  w-50 text-light rounded-0">
            {" "}
            CANCEL
          </Link>
          <button type="submit" className="btn btn-primary w-50 rounded-0">
            {formStatus === "add" ? "ADD" : "EDIT"}
          </button>
        </div>
      </form>
    </FormContainer>
  );
};

export default Form;
