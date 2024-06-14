import react, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import {useEffect} from "react"; 
import M from "materialize-css";


const Post = ()=>{
  const navigate = useNavigate()

  
    const [title,setTitle] = useState("")
    const [body,setBody] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")
    useEffect(()=>{
       if(url){
        fetch("https://instaclone-4-qwrx.onrender.com/createpost", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
          body: JSON.stringify({
            title,
            body,
            pic: url,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              M.toast({ html: data.error, classes: "#c62828 red darken-3" });
            } else {
              M.toast({
                html: "Created post Successfully",
                classes: "#43a047 green darken-1",
              });
              navigate("/profile");
            }
          })
          .catch((err) => {
            console.log(err);
          });
    }
    },[url])
  
   const postDetails = ()=>{
       const data = new FormData()
       data.append("file",image)
       data.append("upload_preset","insta-clone")
       data.append("cloud_name","dnpxhgolq")
       fetch("https://api.cloudinary.com/v1_1/dnpxhgolq/image/upload",{
           method:"post",
           body:data
       })
       .then(res=>res.json())
       .then(data=>{
          setUrl(data.url)
       })
       .catch(err=>{
           console.log(err)
       })

    
   }






 return (
    <>
        <div className = "card card1 input-filed">
        <input type="text" placeholder="title"
          value={title}
          onChange={(e)=>{
            setTitle(e.target.value)
          }}
        />
        <input type = "text" placeholder="body"
          value={body}
          onChange={(e)=>setBody(e.target.value)}
        />
        <div className="file-field input-field">
      <div className="waves-effect waves-light btn #42a5f5 blue darken">
        <span style={{color:"black"}}>upload</span>
        <input type="file" onChange={(e)=>setImage(e.target.files[0])} multiple/>
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text" placeholder="Upload one or more files"/>
        <buton className="waves-effect waves-light btn #42a5f5 blue lighten-1" onClick={()=>postDetails()} style={{translate:"200%"}} 
        
        
        >post</buton>
      </div>
      
    </div>

        </div>
    </>
 )
}
export default Post;