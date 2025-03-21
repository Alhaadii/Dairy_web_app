import { useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getFromLocalStorage, setToLocalStorage } from "../utils/LocalStorage";

export const Login = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (getFromLocalStorage("userInfo")) return navigate("/");
  }, [navigate]);

  const userLoginApi = async ({ email, password }) => {
    try {
      const userLogin = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );
      setToLocalStorage("userInfo", JSON.stringify(userLogin.data));
      navigate("/");
    } catch (error) {
      setError(error?.response?.data?.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email)
      return setTimeout(() => {
        setError("Please enter a valid email");
      }, 1000);
    else if (!password)
      setTimeout(() => {
        return setError("Please enter a valid password");
      }, 1000);

    userLoginApi({ email, password });
  };

  return (
    <FormContainer>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="col-lg-5 col-md-8 col-12 mx-auto shadow-sm p-5">
          {error && (
            <div className="alert alert-danger text-center mb-3">{error}</div>
          )}
          <h1 className="text-center title">Login form</h1> <hr />
          <div className="mb-3">
            <label htmlFor="email">Email Address</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
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
            <label htmlFor="register">Don't have an account? </label>
            <Link to={"/register"}> Register</Link>
          </div>
          <button className="btn primary w-100 text-light">LOGIN</button>
        </div>
      </form>
    </FormContainer>
  );
};
