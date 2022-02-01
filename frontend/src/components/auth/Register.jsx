import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/userContext";
import ErrorNotice from "../../components/misc/ErrorNotice";
import "../component.css"

function Register () {

    const [email, setEmail] = useState();
    const [number, setNumber] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [displayName, setDisplayName] = useState();
    const [error, setError] = useState();

    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();

        try{
            const newUser = {displayName,number,email,password, passwordCheck};
            await axios.post("http://localhost:5000/users/register", newUser);
            const loginResponse = await axios.post("http://localhost:5000/users/login", {
                email, password
            });
            setUserData({
                token: loginResponse.data.token,
                user: loginResponse.data.user
            });
            localStorage.setItem("auth-token", loginResponse.data.token);
            history.push("/");
        } catch(err) {
            err.response.data.msg && setError(err.response.data.msg)
        }
        
    };
   
    return ( 
        <div className="registers">
            <h2>Register</h2>
            {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
            <form className='register-form' onSubmit={submit}>
                <label>Username </label>
                <input type="text" id="dsplay-name" placeholder="username" onChange={e => setDisplayName(e.target.value)}/>
                <label>Email: </label>
                <input type="email" id="email" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
                <label>Phone Number:</label>
                <input type="number" id="number" placeholder="Phone number" onChange={e => setNumber(e.target.value)}/>
                <label>Password: </label>
                <input type="password" id="password" placeholder="password" onChange={e => setPassword(e.target.value)}/>
                <label>ConfirmPassword: </label>
                <input type="password" placeholder="Confirm password" onChange={e => setPasswordCheck(e.target.value)}/>
                
                <input type="submit" value="Register" className="btn btn-primary" />
            </form>
        </div>
        );
}
 
export default Register;