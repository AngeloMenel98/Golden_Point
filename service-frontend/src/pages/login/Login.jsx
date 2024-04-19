import axios from "axios";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import logo from "../../images/golden_point_logo.png";
import "./login.css";

const Login = ()=>{

    const [credentials, setCredentials] = useState({ 
        username: "", 
        password: "" 
    });

    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.id]: e.target.value });
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://127.0.0.1:8080/api/login", credentials);
            console.log("Login successful", res.data);
            navigate('/');
        } catch (error) {
            if (error.response && error.response.data) {
                const errorMessage = error.response.data.error;
                setError(errorMessage);
                console.error("Login failed", errorMessage);
            } else {
                setError(null);
            }
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
                            <input type="text" id="username" value={credentials.username} onChange={handleChange}/>
                        </div>
                        <div className="l-input-2">
                            <span className="l-span">Contraseña</span>
                            <input type="password" id="password" value={credentials.password} onChange={handleChange}/>
                            <span className="l-span-fp">¿Has olvidado tu contraseña?</span>
                        </div>
                        <button className="l-button" onClick={handleClick}>Ingresar <FontAwesomeIcon icon={faRightToBracket} className="l-icon" /></button>
                        <div className="eContainer">
                            {error && <span>{error}</span>}
                        </div>
                    </form>
                </div>
                <div className="l-wallpaper">
                </div>
            </div>
        </div>
    );
};

export default Login