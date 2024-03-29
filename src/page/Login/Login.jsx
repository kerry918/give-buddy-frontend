import React, {useState} from 'react';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../../firebase';
import { NavLink, useNavigate } from 'react-router-dom'
import "./Login.css"
import axios from "axios";
import { API_URL } from "../../constants/url";
import { useGiveBuddyStore } from '../../store/store';
import Logo from "../../assets/GiveBuddylogo.png"
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
 
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [updateUserUid, updateUserId, user_id, updateMatchedCharities, matched_charities] = useGiveBuddyStore(
        (state) => [state.updateUserUid, state.updateUserId, state.user_id, state.updateMatchedCharities, state.matched_charities]
    )
    const [error, setError] = useState('')

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
                    updateUserId(res.data.user_id)
                    console.log(res.data)
                    updateMatchedCharities(res.data.user_data.matched_charities)
                    if(res.data.user_data.matched_charities){
                        navigate("/recommended_charities")
                    } else {
                        navigate("/welcome")
                    }
                })
                .catch((err) => console.log(err));

        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode.split("/")[1] === "invalid-credential"){
                setError("Invalid email address/password")
            }
            // const errorMessage = error.message;
            console.log(errorCode)
        });
    }
 
    return(
      <>
        <div id="header">
          <a href="/"><p id="title">GiveBuddy</p></a>
        </div>
        
        <div id="login-page">    
          <div id="login-container">
            <img src={Logo}/>
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
                        style={{marginBottom: "24px"}}                                                 
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
                        style={{borderColor: error !== "" ? "#D72C0D" : "#AEB4B9"}}                                    
                    />
                    {error !== "" && (
                        <div style={{display:"flex", flexDirection: "row", alignItems: "center", marginBottom: "20px"}}>
                            <ErrorRoundedIcon sx={{ color: "#D72C0D" }} />
                            <h1 id="signup-form-error">{error}</h1>
                        </div>
                    )} 
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