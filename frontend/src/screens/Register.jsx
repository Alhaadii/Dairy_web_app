import { useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getFromLocalStorage, setToLocalStorage } from "../utils/LocalStorage";

export const Register = () => {
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (getFromLocalStorage("userInfo")) return navigate("/");
  }, [navigate]);

  const userRegisterAPI = async ({ name, email, password }) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/register",
        { name, email, password }
      );
      setToLocalStorage("userInfo", JSON.stringify(data));
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) return false;
    if (password !== confirmPassword) {
      setError("Mkae sure the password and confirm password are correct match");
      setTimeout(() => {
        setError("");
      }, 1000);
    }
    userRegisterAPI({ name, email, password });
  };

  return (
    <FormContainer>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="col-lg-5 col-md-8 col-12 mx-auto shadow-sm p-5">
          {error && (
            <div className="alert alert-danger text-center mb-3">{error}</div>
          )}
          <h1 className="text-center title">Registeration form</h1> <hr />
          <div className="mb-3">
            <label htmlFor="name">Full Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control"
              id="name"
              value={name}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">Email Address</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control"
              id="email"
              value={email}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              id="password"
              value={password}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              className="form-control"
              id="confirmPassword"
              value={confirmPassword}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="login">I have Alread An Account? </label>
            <Link to={"/login"}> Login</Link>
          </div>
          <button className="btn primary w-100 text-light">REGISTER</button>
        </div>
      </form>
    </FormContainer>
  );
};
