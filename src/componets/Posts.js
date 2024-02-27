import React, { useEffect, useState } from "react";

import PostItem from "./PostItem";
import axios from "axios";
import Loader from "./Loader";

const Posts = () => {
 

  const [posts, setPosts] = useState([]);

  const [loading,setLoading] =useState(false);


  useEffect(()=>{

     const fetchPost = async()=>{
      setLoading(true);

      try {

        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts`);

        // const post = await res.data;
        console.log(res.data);
        setPosts(res.data)
        
      } catch (error) {
         console.log(error);
      }

    
    setLoading(false);


     }

fetchPost();
  },[]);


  if(loading){

    return <Loader />
  }
 
  return (
    <section className="posts">
      {posts.length>0 ?<div className="container posts__container">
        {posts.map(({ _id:id, thumbnail, category, title, discription ,creater,createdAt }) => (

          <PostItem
            key={id}
            postID={id}
            thumbnail={thumbnail}
            category={category}
            title={title}
            discription={discription}
            authorID={creater}
            createdAt={createdAt}
          />
          
         
        ))}
      </div> :<h2 className="center">No Posts Found</h2>}
    </section>
  );
};

export default Posts;
