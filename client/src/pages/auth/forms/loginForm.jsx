import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../../../../public/assets/logo.svg";
import "../../../styles/register.css";

const LoginForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [_, setCookies] = useCookies(["access_token"]);

  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/users/login",
        {
          username: values.username,
          password: values.password,
        }
      );

      message.success("Login successful");

      setCookies("access_token", response.data.data.access_token);
      window.localStorage.setItem("userId", response.data.data.user._id);
      navigate("/");
    } catch (err) {
      message.error("Login failed. Please check your credentials.");
      console.error(err);
    }
  };

  return (
    <div className="formContainer">
      <Form form={form} onFinish={onFinish}>
        <div className="registerFormLogo">
          <img src={logo} alt="logo" />
          <h2>Login to your account</h2>
        </div>
        <Form.Item name="username" rules={[{ required: true, message: "Please enter your username" }]}>
          <Input placeholder="Username" className="formInput"/>
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: "Please enter your password" }]}>
          <Input.Password placeholder="Password" className="formInput"/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
          <Link to="/auth/register">Don't have an account? Register</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
