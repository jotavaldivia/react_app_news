import React from "react";
import styled from "styled-components";
import Logo from "../../assets/svgs/hacker-news.svg";
import "./Header.css";

const Header = () => {
  return (
    <div className="headerContainer">
      <img className="logo" src={Logo} />
    </div>
  );
};

export default Header;
