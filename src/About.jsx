import react,{useState,useEffect, useContext} from "react";
import reactdom from "react-dom";
import {UserContext} from './App';
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

import "./index.css";

 const About = ()=>{
  const [data,setData] =  useState([])
  const {state, dispatch} = useContext(UserContext)
  useEffect(()=>{
    fetch("https://instaclone-4-qwrx.onrender.com/allpost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result.posts);
      });
  },[])
  const likePost = (id)=>{
    fetch("https://instaclone-4-qwrx.onrender.com/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        //   console.log(result)
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
}
const unlikePost = (id)=>{
  fetch("https://instaclone-4-qwrx.onrender.com/unlike", {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
    body: JSON.stringify({
      postId: id,
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      //   console.log(result)
      const newData = data.map((item) => {
        if (item._id == result._id) {
          return result;
        } else {
          return item;
        }
      });
      setData(newData);
    })
    .catch((err) => {
      console.log(err);
    });
}
const makeComment = (text,postId)=>{
  fetch("https://instaclone-4-qwrx.onrender.com/comment", {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
    body: JSON.stringify({
      postId,
      text,
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      const newData = data.map((item) => {
        if (item._id == result._id) {
          return result;
        } else {
          return item;
        }
      });
      setData(newData);
    })
    .catch((err) => {
      console.log(err);
    });
}
const deletepost = (postid)=>{
  console.log(postid)
  fetch(`https://instaclone-4-qwrx.onrender.com/deletepost/${postid}`, {
    method: "delete",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      const newData = data.filter((item) => {
        return item._id !== result._id;
      });
      setData(newData);
    });
}

    return (
        <>
            <div className="home">
            {
              data.map(item=>{
                console.log(item.PostedBy._id)
                return(
                  <div className="row">
    <div className="col s12 m7">
      <div className="card">
      <h6 style={{textAlign:"center"}}><Link to={item.PostedBy._id!=state._id?"/profile/"+item.PostedBy._id:"/profile"}>{item.PostedBy.name}</Link></h6>
      <h5 style={{padding:"5px"}}>{item.PostedBy._id == state._id 
      && <i className="material-icons" style={{
          float:"right"
      }} 
      onClick={()=>deletepost(item._id)}
      >delete</i>

      }</h5>
      
        <div className="card-image">
          <img className="image" src={item.photo}/>
          
        </div>
        <div className="card-content">
        <i class="material-icons" style={{color:"red"}}>favorite</i>
        {item.likes.includes(state._id)
        ?
        <i class="material-icons" onClick={()=>(unlikePost(item._id))}> thumb_down</i>
        :
        <i class="material-icons" onClick={()=>(likePost(item._id))}>thumb_up </i>}
        
        <h6>{item.likes.length} likes</h6>

          <p>{item.title}</p>
          <p>{item.body}</p>
          {
             item.comments.map(record=>{
                    return(
                    <h6 key={record._id}><span style={{fontWeight:"500"}}>{record.PostedBy.name}</span> {record.text}</h6>
                    )
                })
          }
          <form onSubmit={(e)=>{
            e.preventDefault()
            makeComment(e.target[0].value,item._id)
          }}>
          <input type="text" placeholder="Add comment"/>
          </form>
          
        </div>
        
      </div>
    </div>
  </div>

                )
              })
            }
           

            </div>

            {/* <div className="home">
            <div className="row">
    <div className="col s12 m7">
      <div className="card">
      <h6>Rishi</h6>
        <div className="card-image">
          <img className="image" src="https://images.unsplash.com/photo-1682687218147-9806132dc697?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=775&q=80"/>
          
        </div>
        <div className="card-content">
        <i class="material-icons" style={{color:"red"}}>favorite</i>
          <p>Mountains....</p>
          
          <input type="text" placeholder="Add comment"/>
        </div>
        
      </div>
    </div>
  </div>

            </div> */}
        </>
    )


 }
 export default About;