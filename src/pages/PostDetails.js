import React,{useState,useContext,useEffect}from "react";
import PostAuthor from "../componets/PostAuthor";
import { Link, useParams } from "react-router-dom";
import Thumbnail from "../images/blog22.jpg";

import Loader from "../componets/Loader";
import DeletePost from "./DeletePost"
import { UserContext } from "../context/userContext";
import axios from "axios";

const PostDetails = () => {


   const {id} = useParams();
   const [post,setPost] =useState(null)
  //  const [createrId,setCreaterId] =useState(null)
   const [error,setError] =useState(null)
   const [isLoading,setIsLodaing] =useState(false)
 
   const {currentUser} = useContext(UserContext);


    useEffect(()=>{



      const getPosts =  async()=>{
      setIsLodaing(true)
        try {

          const res =await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`);
          console.log(res.data);
          setPost(res.data);
          // setCreaterId(res.data.creater)
          
        } catch (error) {
          setError(error)
        }

        setIsLodaing(false)

      }


      getPosts()
    },[])

   if(isLoading){
    return <Loader />
   }

  return (
    <section className="post-detail">
      {error && <p className="error">{error}</p>}
    {post &&  <div className="container post-detail__container">
        <div className="post-detail__header">
          <PostAuthor authorID={post.creater} createdAt={post.createdAt}/>
          {currentUser.id==post.creater && <div className="post-detail__buttons">
            <Link to={`/posts/${post._id}/edit`} className="btn sm primary">
              Edit
            </Link>
           <DeletePost postId={id}/>
          </div>}
        </div>

        <h1>{post.title}</h1>
        <div className="post_detail__thumbnail">
          <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${post.thumbnail}`} alt="image" />

        </div>
        <p dangerouslySetInnerHTML={{__html : post.discription}}></p>
      </div>}
    </section>
  );
};

export default PostDetails;
