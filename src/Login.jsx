import react, { useState, useContext } from "react";
import reactdom from "react-dom";
import { NavLink } from "react-router-dom";
import "./index.css";
import M from "materialize-css";
import { useNavigate } from 'react-router-dom'; 
import {UserContext} from './App';

 const Login = ()=>{
    const {state,dispatch} = useContext(UserContext)
    const navigate = useNavigate()
    const [email,useemail] = useState("")
    const [password,usepassword] = useState("")
    
    const PostLoginData = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
            return}
        fetch("https://instaclone-4-qwrx.onrender.com/signin", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              M.toast({ html: data.error, classes: "#e53935 red darken-1" });
            } else {
              //console.log(data);
              localStorage.setItem("jwt", data.token);
              localStorage.setItem("user", JSON.stringify(data.user));
              dispatch({ type: "USER", payload: data.user });
              //console.log(localStorage.getItem("jwt"))
              M.toast({ html: "successfull login", classes: "#4caf50 green" });
              navigate("/Profile");
            }
          })
          .catch((e) => {
            console.log(e);
          });
    }


    return (
        <>
        <div className="cards">
            <div className="card auth-class input-field">
            <h2>Instagram</h2>
            <input 
                type="email"
                placeholder="Enter your email"
                value = {email}
                onChange={(e)=>{
                    useemail(e.target.value)
                }}
                
            />
             <input
                type="password" 
                placeholder="Enter your password"
                value = {password}
                onChange={(e)=>{
                    usepassword(e.target.value)
                }}
            />
            <button className="waves-effect waves-light btn #42a5f5 blue lighten-1" onClick={()=>PostLoginData()}>Login</button>
            <h5><NavLink to="/signup" >Don't have an account?</NavLink></h5>
      </div>
      </div>
        </>
    )


 }
 export default Login;