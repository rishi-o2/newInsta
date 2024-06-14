
import React, { useEffect, useState, useContext } from "react";
import { UserContext } from './App';
import { useParams } from "react-router-dom";
import "./index.css";

const Profile = () => {
    console.log("Hello");
    const [userProfile, setProfile] = useState({});
    const [showfollow,setShowFollow] = useState(state?!state.following.includes():true);
    const { state, dispatch } = useContext(UserContext);
    const { id } = useParams();
    console.log(id);
    
    useEffect(() => {
        // Replace with the actual user ID you want to fetch
        const userId = id;

        fetch(`https://instaclone-4-qwrx.onrender.com/user/${userId}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            setProfile(res);
            console.log(userProfile);
          })
          .catch((error) => {
            console.error(error);
          });
    }, [id]);
    const followuser = ()=>{
        fetch("https://instaclone-4-qwrx.onrender.com/follow", {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
          body: JSON.stringify({
            followId: id,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            dispatch({
              type: "UPDATE",
              payload: { following: data.following, followers: data.followers },
            });
            localStorage.setItem("user", JSON.stringify(data));
            setProfile((prevstate) => {
              return {
                ...prevstate,
                user: {
                  ...prevstate.user,
                  followers: [...prevstate.user.followers, data._id],
                },
              };
            });
            setShowFollow(false);
          });
    }
    const unfollowUser = ()=>{
        fetch('https://instaclone-4-qwrx.onrender.com/unfollow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                unfollowId:id
            })
        }).then(res=>res.json())
        .then(data=>{
            
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
             localStorage.setItem("user",JSON.stringify(data))
            
             setProfile((prevState)=>{
                const newFollower = prevState.user.followers.filter(item=>item != data._id )
                 return {
                     ...prevState,
                     user:{
                         ...prevState.user,
                         followers:newFollower
                        }
                 }
             })
             setShowFollow(true)
             
        })
    }


    return (
        <>
        {userProfile?
          <div style={{ maxWidth: "550px", margin: "0px auto" }}>
                <div style={{
                    display: "flex",
                    justifyContent: "space-around",
                    margin: "40px 0px",
                    
                    borderBottom: "1px solid grey"
                }}>
                    <div>
                        {/* Replace with user profile picture */}
                        <img style={{ width: "160px", height: "160px", borderRadius: "80px" }}
                            src="https://images.unsplash.com/photo-1610024062303-e355e94c7a8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
                        />
                    </div>
                    <div>
                        {/* Replace with user name and bio */}
                        <p><h4>{userProfile.user ? userProfile.user.name : "Name not available"}</h4></p>
                        <p><h5>{userProfile.user ? userProfile.user.email : "Name not available"}</h5></p>
                        <div style={{ display: "flex", justifyContent: "space-between", width: "200px" }}>
                         <p style={{ margin: "0", lineHeight: "1" }}>{userProfile.posts ? userProfile.posts.length : "wait"} Posts</p>
                         <p style={{ margin: "0", lineHeight: "1" }}>
                                                  {userProfile.user ? userProfile.user.following.length : "Not available"}{' '}
                                                  <span style={{ marginLeft: "10px" }}>following</span>
                         </p>
                         <p style={{ margin: "0", lineHeight: "1" }}>
                                                  {userProfile.user ? userProfile.user.followers.length : "Not available"}{' '}
                                                  <span style={{ marginLeft: "10px" }}>followers</span>
                         </p>
</div>
{showfollow?<button style={{margin:"10px"}} className="waves-effect waves-light btn #42a5f5 blue lighten-1"  onClick={() => followuser()}>Follow</button>
:<button style={{margin:"10px"}} className="waves-effect waves-light btn #42a5f5 blue lighten-1" onClick={() => unfollowUser()}>UnFollow</button>}
 




                    </div>
                </div>
                <div className="gallery">
                    {/* Uncomment and replace with user posts */}
                    {userProfile.posts?userProfile.posts.map(item => (
                        <img className="item" src={item.photo} alt={item.title} key={item.id} />
                    )):<h5>Loading</h5>}
                </div>
            </div>
        
        
        :<h2>Loading</h2>}
            
        </>
    )
}

export default Profile;

