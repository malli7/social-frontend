import React, { useState, useEffect } from "react";
import './Login.css';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { signUp, signIn } from '../../Actions/Auth';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ username: '', phonenumber: 0, email: '', password: '' });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const profile = localStorage.getItem('profile');

    useEffect(() => {
        if (profile) {
            navigate('/');
        }
    }, [profile, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const switchModes = () => {
        setIsLogin(!isLogin)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isLogin) {
            dispatch(signIn(formData, navigate))
        }
        else {
            dispatch(signUp(formData, navigate))
        }
    }

    const handlePassowrd = () => {
        console.log("forgot password");

    }
    return (
        <div className="mainContainerForLogin">

            <div className="subMainCOntainer">
                <h1>Social</h1>
                <h3>Connect with your Friends</h3>
            </div>

            <div className="signUpContainer">
                <h3>{isLogin ? "Login to your Account" : "Create New Account"}</h3>
                {
                    !isLogin && (<>
                        <input className="inputFieldClass" type="text" name="username" placeholder="Enter your UserName" onChange={handleChange} required />
                        <input className="inputFieldClass" type="number" name="phonenumber" placeholder="Enter your Phone Number" onChange={handleChange} required />
                    </>)
                }
                <input className="inputFieldClass" type="email" name="email" placeholder="Enter your Email Address" onChange={handleChange} required />
                <input className="inputFieldClass" type="password" name="password" placeholder="Enter your Password" onChange={handleChange} required />
                <button className="signUpBtn" type="button" onClick={handleSubmit}>{isLogin ? "Login" : "Sign Up"}</button>
                {isLogin && (
                    <button className="changeBtn" type="button" onClick={handlePassowrd}>Forgot Password</button>
                )}
                <button className="changeBtn" type="button" onClick={switchModes}>{isLogin ? "Don't have an account? Create One" : "Already have an Account? Login here"}</button>
            </div>

        </div>);
};

export default Login;
