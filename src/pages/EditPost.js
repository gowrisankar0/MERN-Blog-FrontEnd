import React, { useContext, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/userContext";
import axios from "axios";

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Uncategorized");
  const [discription, setDiscription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [error,setError]=useState("")


  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
   const {id} =useParams()


  const token = currentUser?.token;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  const modules = {
    toolbar: [
      [{ header: [1, 2,3,4,5,6, false] }],
      ["bold", "italic", "underline", "strike", "blockquate"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquate",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const POST_CATEGORIES = [
    "Agriculture",
    "Business",
    "Education",
    "Entertainment",
    "Art",
    "Investment",
    "Uncategorized",
    "Weather",
  ];


  useEffect(()=>{
 

     const getPost = async()=>{
      try {

        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`);
        setTitle(res.data.title)
        setDiscription(res.data.discription);
       
      } catch (error) {
        console.log(error);
      }

    
     }



     getPost()

  },[]);



  const editPost =async(e)=>{

    e.preventDefault();


    const postData = new FormData()
    postData.set("title",title)
    postData.set("category",category)
    postData.set("discription",discription)
    postData.set("thumbnail",thumbnail)



    try {

     const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/posts/${id}`,postData,{withCredentials:true,
       headers:{Authorization : `Bearer ${token}`}
     });
    //  console.log(response);
     if(response.status === 200){
       return navigate("/")
     }
    } catch (error) {
     setError(error.response.data.message)
     // console.log(error);
     
    }

  }






  return (
    <section className="create-post">
      <div className="container">
        <h2>Edit Post</h2>
        {error && <p className="form__error-message">{error}</p>}

        <form className="form create-post__form" onSubmit={editPost}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {POST_CATEGORIES.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>

            <ReactQuill modules={modules} formats={formats} value={discription} onChange={setDiscription} className="ql-editar"/>

            <input type="file" onChange={(e)=>setThumbnail(e.target.files[0])} accept="png ,jpg , jpeg"/>
            <button type="submit" className="btn primary">Update</button>
        </form>
      </div>
    </section>
  );
};

export default EditPost;
