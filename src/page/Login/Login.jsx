import React, {useState} from 'react';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../../firebase';
import { NavLink, useNavigate } from 'react-router-dom'
import "./Login.css"
import axios from "axios";
import { API_URL } from "../../constants/url";
import { useGiveBuddyStore } from '../../store/store';
 
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [updateUserUid, updateUserId, user_id] = useGiveBuddyStore(
        (state) => [state.updateUserUid, state.updateUserId, state.user_id]
    )
       
    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            updateUserUid(user.uid)
            axios
                .get(`${API_URL}/user_profile/${user.uid}`)
                .then((res) => {
                    console.log(res.data.user_id)
                    updateUserId(res.data.user_id)
                    console.log(user_id)
                    navigate("/home")
                })
                .catch((err) => console.log(err));

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
    }
 
    return(
      <>
        <div id="header">
          <a href="/"><p id="title">GiveBuddy</p></a>
        </div>
        
        <div id="login-page">    
          <div id="login-container">
            <p id="login-main-text">Log into Your Account</p>       
            <p id="login-description">Discover your favourite charities with us!</p>                                                                    
            <form id="login-form">                                                                                           
                <div id="login-form-item">
                    <label htmlFor="email-address">
                        Email address
                    </label>
                    <input
                        id="login-form-input"
                        type="email"
                        label="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}  
                        required                                                    
                    />
                </div>

                <div id="login-form-item">
                    <label htmlFor="password">
                        Password
                    </label>
                    <input
                        id="login-form-input"
                        type="password"
                        label="Create password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        required                              
                    />
                </div>                                             
                
                <button
                    type="submit" 
                    onClick={onLogin} 
                    id="login-form-button"                       
                >  
                    Log in                             
                </button>                                   
            </form>
            
            <p>
                No account yet? {' '}
                <NavLink to="/signup" style={{textDecoration:"underline", color: 'black'}}>
                    Sign up
                </NavLink>
            </p>        
          </div>           
        </div>
      </>
    )
}
 
export default Login