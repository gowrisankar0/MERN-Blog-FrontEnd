import React, { useEffect, useState } from 'react';
// import { DUMMY_POSTS } from '../data';
import PostItem from '../componets/PostItem';
import Loader from '../componets/Loader';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CategoryPosts = () => {

  const [posts, setPosts] = useState([]);
  const {category}= useParams()

  const [loading,setLoading] =useState(false);


  useEffect(()=>{

     const fetchPost = async()=>{
      setLoading(true);

      try {

        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/categories/${category}`);

        // const post = await res.data;
        console.log(res.data);
        setPosts(res.data)
        
      } catch (error) {
         console.log(error);
      }

    
    setLoading(false);


     }

fetchPost();
  },[category]);


  if(loading){

    return <Loader />
  }
 
  return (
    <section className="posts">
      {posts.length>0 ?<div className="container posts__container">
        {posts.map(({ _id:id, thumbnail, category, title, discription, creater ,authorID,createdAt }) => (

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
}

export default CategoryPosts