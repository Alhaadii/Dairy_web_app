import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import moment from "moment";
import { events } from "../utils/Data";

const Form = () => {
  const param = useParams();
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [formStatus, setFormStatus] = useState("");

  useEffect(() => {
    if (param.id) {
      setFormStatus("edit");
      const currentDiary = events.find((event) => event._id === param.id);
      if (currentDiary) {
        setId(currentDiary?._id);
        setTitle(currentDiary?.title);
        setDescription(currentDiary?.description);
        setEventDate(
          moment(currentDiary?.eventDate).format("YYYY-MM-DDTHH:mm")
        );
      }
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
    } else {
      // Edit form submission logic
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
