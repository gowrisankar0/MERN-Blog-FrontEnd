import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";


const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password:'',
    password2:'',
  });

  const [error,setError]=useState("");
  const navigate = useNavigate();


 const changeInputHandler = (e) =>{

  const {name,value} = e.target;

  setUserData((prev)=>{
    return {
      ...prev,
      [name]:value
    }
  })

 };



 const registerUser = async(e)=>{

  e.preventDefault();
  setError("")

  try {

    const response = await axios.post(`http://localhost:4000/api/users/register`,userData)
    const newUser =await response.data;
    console.log(newUser);
   if(!newUser){
    setError("couldn't register user.please try again!")
   };

   navigate("/login");

  } catch (err) {
    setError(err.response.data.message);
    // console.log(err.respose.data.message);
  }

 }


  return (
    <section className="register">
      <div className="container">
        <h2>Sign Up</h2>
        <form className="form register__form" onSubmit={registerUser}>
          {error&&<p className="form__error-message">{error}</p>}
          <input
            type="text"
            placeholder="Full name"
            name="name"
            value={userData.name}
            onChange={changeInputHandler}
          />
          <input
            type="email"
            placeholder="Enter Email"
            name="email"
            value={userData.email}
            onChange={changeInputHandler}
          />
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            value={userData.password}
            onChange={changeInputHandler}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={userData.password2}
            onChange={changeInputHandler}
          />
          <button type="submit" className="btn primary">Register</button>
        </form>
        <small>Already have an account? <Link to="/login">Sign In</Link></small>
      </div>
    </section>
  );
};

export default Register;
