import react from "react";
import reactdom from "react-dom";
import { useEffect,useState,useContext } from "react";
import {UserContext} from './App';

import "./index.css"
 const Profile = ()=>{
    const [mypics,setpics] = useState([])
    const {state, dispatch} = useContext(UserContext)
    console.log(state)
    useEffect(()=>{
        fetch("https://instaclone-4-qwrx.onrender.com/mypost", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        })
          .then((res) => res.json())
          .then((res) => {
            //console.log(res.mypost)
            setpics(res.mypost);
            //console.log(state)
          });
    },[])
    
    //console.log(mypics)

    return (
        
        <>
        
            <div style={{maxWidth:"550px", margin:"0px auto"}}>
                <div style={{
                    display:"flex",
                    justifyContent:"space-around",
                    margin:"18px 0px",
                    borderBottom:"1px solid grey"
                    

                }}>
                    <div>
                        <img style={{width:"160px", height:"160px",borderRadius:"80px"}}
                        src="https://images.unsplash.com/photo-1610024062303-e355e94c7a8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
                        />
                    </div>
                    <div >
                    
                        <p >{state?state.name:"loading"}</p>
                        <p>{state?state.email:"loading"}</p>
                        <div style={{display:"flex", justifyContent:"space-between", width:"200px"}}>
                        <p>{mypics.length} post</p>
                        
                         {/* <p>{state ? (state.following.length) : "wait"} following</p>
                        <p>{state ? (state.followers.length) : "wait"} followers</p>  */}

                        </div>
                    </div>
                </div>
                <div className="gallery">
                
                  {
                    mypics.map(item=>{
                        return(
                         
                            <img className="item" src ={item.photo} alt = {item.title} />
                        )
                    })
                  }
               
               
               
                {/* <img className="item" src = "https://images.unsplash.com/photo-1553658024-39485fea1f16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80"/>

                <img className="item" src = "https://images.unsplash.com/photo-1553658024-39485fea1f16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80"/>

                <img className="item" src = "https://images.unsplash.com/photo-1553658024-39485fea1f16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80"/>
 */}


                </div>
            </div>
        </>
    )


 }
 export default Profile;