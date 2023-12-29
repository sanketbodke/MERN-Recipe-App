import React, { useState } from "react";
import logo from "../../../../public/assets/logo.svg";
import "../../../styles/register.css";
import { Link } from "react-router-dom"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function registerForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/api/v1/users/register", {
        username,
        email,
        password,
      });
      navigate("/auth/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="formContainer">
        <form onSubmit={onSubmit}>
          <div className="registerFormLogo">
            <img src={logo} alt="logo" />
            <h2>Create a new account</h2>
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
            <label htmlFor="username">email </label>
            <input
              type="text"
              name="email"
              id="email"
              onChange={(event) => {
                setEmail(event.target.value);
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
          <button type="submit">Register</button>
          <Link to="/auth/login">Already have an account ? Login </Link>
        </form>
      </div>
    </>
  );
}
