import React from 'react'
import "./LoginStyle.css"
import { FaUser, FaLock } from "react-icons/fa";
import RegisterModal from '../register/RegisterModal';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const LoginForm = ({isModalOpen, setIsModalOpen}) => {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const handleLogin = async (e) =>{
    e.preventDefault();
    try {
      const data = await fetch("http://localhost:8081/api/login", // yêu cầu HTTP đến server
      { 
        method: "post", // Phương thức HTTP của yêu cầu
        headers: { // thông tin tiêu đề của yêu cầu HTTP
          Accept: "application/json",
          "Content-Type": "application/json",
        },
         body: JSON.stringify(user),  // Dữ liệu được gửi đi trong yêu cầu, được chuyển đổi sang chuỗi JSON
      }
); 
      const res = await data.json(); // Chuyển đổi phản hồi HTTP thành đối tượng JavaScript từ chuỗi JSON
      // console.log(res);
      if (res.ok) {
        localStorage.setItem("accesstoken",res.token);
        localStorage.setItem("user_id",res.user._id);
        navigate(`/home/users/${res.user._id}`);
      } else alert(res.msg);
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred. Please try again!");
    }
      
  }
  const showRegisterModal = () => {
    setIsModalOpen(true);
  }
  return (
  <div className='wrapper'>
    <div className='login-wrapper'>
      <form action="">
        <h1>Login</h1>
        <div className='input-box'>
            <input type="text" placeholder='Username' onChange={(e) =>{setUser({...user,username : e.target.value})}} required />
            <FaUser className='icon'/>
        </div>
        <div className='input-box'>
            <input type="password" placeholder='Password' onChange={(e) =>{setUser({...user,password : e.target.value})}} required />
            <FaLock className='icon'/>
        </div>
        <button type='submit' onClick={handleLogin}>Login</button>
        <div className='register-link'>
          <p>Don't have an account?
            <a href='#'onClick={showRegisterModal}> Register</a>
          </p>
        </div>
        
      </form>
    </div>
    <RegisterModal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
    />
</div>
  )
}

export default LoginForm;