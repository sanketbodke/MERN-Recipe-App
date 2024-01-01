import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Dropdown, Popover, Button } from "antd";
import { useCookies } from "react-cookie";

import {
  UserOutlined
} from "@ant-design/icons";
import logo from "../../public/assets/logo.svg";
import "../styles/navbar.css";

import {useSelector} from "react-redux"

const Navbar = () => {
  const [ _ , setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/auth/login");
  };

  const {currentUser} = useSelector(state => state.user)
  const userName = currentUser.data.data.user.username
  const userEmail = currentUser.data.data.user.email

  const menu = (
    <Menu>
      <Menu.Item key="profile">
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="logout">
        <button onClick={logout}>Logout</button>
      </Menu.Item>
    </Menu>
  );

  const content = (
    <div>
      <p>Email: {userEmail}</p>
      <Button type="primary" onClick={logout}>Logout</Button>
    </div>
  );

  return (
    <nav>
      <div className="navbarContainer container">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="menuItems">
          <Link to="/">
            Home
          </Link>
          <Link to="/create-recipe">
            Create Recipes
          </Link>
          <Link to="/saved-recipes">
            Saved Recipes
          </Link>
          <Link to="/my-recipes">
            My Recipes
          </Link>
        </div>
        <div className="userProfile">
          <Popover content={content} title={userName}>
            <span><UserOutlined /> {userName}</span>
          </Popover>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
