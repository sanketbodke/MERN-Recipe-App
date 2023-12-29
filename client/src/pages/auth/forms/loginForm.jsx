import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../../../../public/assets/logo.svg";
import "../../../styles/register.css";

export default function loginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const [_, setCookies] = useCookies(["access_token"]);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/users/login",
        {
          username,
          password,
        }
      );
      setCookies("access_token", response.data.data.access_token);
      window.localStorage.setItem("userId", response.data.data.user._id);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="formContainer">
      <form onSubmit={onSubmit}>
        <div className="registerFormLogo">
          <img src={logo} alt="logo" />
          <h2>Login to your account</h2>
        </div>
        <div className="form_group">
          <label htmlFor="username">Username </label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </div>

        <div className="form_group">
          <label htmlFor="username">password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        <button type="submit">Login</button>
        <Link to="/auth/register">Don't have an account ? Register </Link>
      </form>
    </div>
  );
}
