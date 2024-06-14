import react,{useContext} from "react";
import reactdom from "react-dom";
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom'; 
import {UserContext, userContext} from "./App";
import "./index.css"
 const Navbar = ()=>{
  const navigate = useNavigate()
  const {state,dispatch}= useContext(UserContext)
  const renderlist = ()=>{
    
    if(state)
    {
      return [
        <li><NavLink to="/profile">Profile</NavLink></li>,
        <li><NavLink to="/createpost">Post</NavLink></li>,
        <li><NavLink to="/myfollowers">My Followers</NavLink></li>,
        <li>
        
          <button className=" logbtn waves-effect waves-light #f44336 red" onClick={()=>
          {
            localStorage.clear();
            dispatch({type:"CLEAR"})
            navigate("/signup")
          }}>Logout</button>
            {/* <h5><NavLink to="/signup" >Don't have an account?</NavLink></h5> */}
        </li>
      ]
      
    }
    else{
        return[
          <li><NavLink to="/login">Login</NavLink></li>,
          <li><NavLink to="/signup">SignUp</NavLink></li>
        ]
    }
  }
    return (<nav>
    <div className="nav-wrapper white">
      <NavLink to={state?"/about":"/login"} className="brand-logo">Instagram</NavLink>
      <ul id="nav-mobile" className="right">
        {renderlist()}
      </ul>
    </div>
  </nav>)
        
 }
 export default Navbar;