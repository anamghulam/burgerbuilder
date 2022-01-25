import React from "react";
import burgerLogo from "../../assets/images/burger-logo.png";
import classes from "./Logo.module.css";
const Logo = (props) => (
    <div>
        <img src={burgerLogo} alt="My Burger" className={classes.Logo} />
    </div>
);
export default Logo;