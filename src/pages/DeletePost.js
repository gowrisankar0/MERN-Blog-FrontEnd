import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/userContext';
import { useNavigate ,useLocation, useParams} from 'react-router-dom';
import {Link} from "react-router-dom";
import axios from "axios";
import Loader from "../componets/Loader"

const DeletePost = ({postId:id}) => {

  const { currentUser } = useContext(UserContext);
  const location =useLocation()
  const navigate = useNavigate();
  const [loading,setIsloading] = useState(false)
  // const {id} =useParams()
  const token = currentUser?.token;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  const removePost = async()=>{
   setIsloading(true)
    try {


      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/posts/${id}`,{withCredentials:true,headers:{
        Authorization:`Bearer ${token}`
      }});

      if(response.status===200){
        if(location.pathname==`myposts/${currentUser.id}`){
          navigate(0)
        }else{
          navigate("/")
        }
      }

      setIsloading(false)

      
    } catch (error) {
      console.log("could't delete post");
    }

   

  }

  if(loading){
    return <Loader />
  }


  return (
    <Link className="btn sm danger" onClick={()=>removePost(id)}>DeletePost</Link>
  )
}

export default DeletePost