import axios from "axios";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../images/golden_point_logo.png";
import "./login.css";

const Login = ()=>{

    return (
        <div>
            <div className="login">
                <div className="l-items">
                    <form className="content">
                        <div className="l-headerLogo">
                            <img className="l-logo" src={logo} alt="" />
                        </div>
                        <h1 class="l-title">Log in to your account</h1>
                        <span class="l-span-su">Don’t have an account? Sign Up</span>
                        <div className="l-input-1">
                            <span className="l-span">Username</span>
                            <input type="text" id="username" className="lInput"/>
                        </div>
                        <div className="l-input-2">
                            <span className="l-span">Password</span>
                            <input type="password" id="password" className="lInput"/>
                            <span className="l-span-fp"> Forgot Password?</span>
                        </div>
                        <button className="l-button">Login</button>
                    </form>
                </div>
                <div className="l-image">
                    <div className="image">
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login