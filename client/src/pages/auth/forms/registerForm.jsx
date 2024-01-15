import React, {useState} from "react";
import { Form, Input, Button, message } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../../../public/assets/logo.svg";
import "../../../styles/register.css";
import Spinner from "../../../components/Spinner.jsx";
import API_BASE_URL from "../../../constant.js";

const RegisterForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setIsLoading] = useState(false)

  const onFinish = async (values) => {
    try {
      setIsLoading(true)
      await axios.post(`${API_BASE_URL}/api/v1/users/register`, {
        username: values.username,
        email: values.email,
        password: values.password,
      });
      setIsLoading(false)
      message.success("Register successful");
      navigate("/auth/login");
    } catch (err) {
      message.error("Registration failed.");
      console.error(err);
    }
  };

  return (
    <div className="formContainer">
      <Form form={form} onFinish={onFinish}>
        <div className="registerFormLogo">
          <img src={logo} alt="logo" />
          <h2>Create a new account</h2>
        </div>
        <Form.Item name="username" rules={[{ required: true }]}>
          <Input placeholder="Username" className="formInput" />
        </Form.Item>
        <Form.Item name="email" rules={[{ required: true, type: "email" }]}>
          <Input placeholder="Email" className="formInput" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true }]}>
          <Input.Password placeholder="Password" className="formInput" />
        </Form.Item>
        <Form.Item>
          {loading ? (
              <Button type="primary" htmlType="submit">
                <Spinner />
              </Button>
          ) : (
              <Button type="primary" htmlType="submit">
                Register
              </Button>
          )}
          <Link to="/auth/login">Already have an account? Login</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterForm;
