import axios from "axios";
import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import logo from "../../images/golden_point_logo.png";
import "./login.css";

const Login = ()=>{

    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined
    });

    const {loading, error, dispatch} = useContext(AuthContext);

    const navigate = useNavigate();

    const handleChange = (e)=>{
        setCredentials((prev) => ({...prev, [e.target.id]: e.target.value}));
    }

    const handleClick = async (e) =>{
        e.preventDefault();
        dispatch({type:"LOGIN_START"});
        try{
            const res = await axios.post("/auth/login", credentials);
            dispatch({type:"LOGIN_SUCCESS", payload: res.data});
            navigate(-1);
        }catch(err){
            dispatch({type:"LOGIN_FAILURE", payload: err.response.data});
        }
    };

    return (
        <div>
            <div className="login">
                <div className="l-items">
                    <form className="content">
                        <div className="l-headerLogo">
                            <img className="l-logo" src={logo} alt="" />
                        </div>
                        <h1 class="l-title">Ingrese a su cuenta</h1>
                        <span class="l-span-da">¿No tienes una cuenta? <span class="l-span-su">Registrarse</span></span>
                        <div className="l-input-1">
                            <span className="l-span">Nombre de usuario</span>
                            <input type="text" id="username" required="required"/>
                        </div>
                        <div className="l-input-2">
                            <span className="l-span">Contraseña</span>
                            <input type="password" id="password" required="required"/>
                            <span className="l-span-fp">¿Has olvidado tu contraseña?</span>
                        </div>
                        <button className="l-button">Ingresar <FontAwesomeIcon icon={faRightToBracket} className="l-icon" /></button>
                    </form>
                </div>
                <div className="l-wallpaper">
                </div>
            </div>
        </div>
    );
};

export default Login