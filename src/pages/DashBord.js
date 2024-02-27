import React, { useContext, useEffect, useState } from "react";
import { DUMMY_POSTS } from "../data";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/userContext";
import Loader from "../componets/Loader";
import axios from "axios";
import DeletePost from "./DeletePost"
const DashBord = () => {
  const [post, setPost] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const token = currentUser?.token;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/posts/users/${id}`,
          { withCredentials: true, headers: { Authorization: `Bearer ${token}` }
        });

      setPost(response.data)
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false)
    
    };

  


    fetchPost();
  }, [id]);

  if(isLoading) {
    return <Loader />;
  }

  return (
    <section className="dashboard">
      {post.length ? (

        <div className="container dashboard__container">
          {post.map((item) => (
            <article key={item.id} className="dashboard__post">
              <div className="dashboard__posts-info">
                <div className="dashboard__post-thumbnail">
                  <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${item.thumbnail}`} alt="image" />
                </div>
                <h5>{item.title}</h5>
              </div>
              <div className="dashboard__posts-actions">
                <Link to={`/posts/${item._id}`} className="btn sm">
                  View
                </Link>
                <Link to={`/posts/${item._id}/edit`} className="btn sm primary">
                  Edit
                </Link>
             
                <DeletePost postId={item._id}/>
              
              </div>
            </article>
          ))}
        </div>
      ) : (
        <h2 className="center">You have no posts yet</h2>
      )}
    </section>
  );
};

export default DashBord;
