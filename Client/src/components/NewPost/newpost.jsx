import React, { useEffect, useState } from 'react'
import { RiFileUploadFill } from "react-icons/ri";
import { MdOutlineFileUpload } from "react-icons/md";
import "./Newpost.css"
import fetchModel from '../../lib/fetchModelData';
import { useNavigate } from 'react-router-dom';

const Newpost = () => {
  // lấy thông tin người dùng
  const token = localStorage.getItem("accesstoken");
  const [myInfo, setInfo] = useState([]);
  const getData = async () => {
    const res = await fetch("http://localhost:8081/api/user/accesstoken",{
      headers: {
      "Content-Type": "application/json",
      Authorization:  "Bearer " + token
      }
    });
    const result = await res.json();
    // console.log(result, "info");
    setInfo(result);
  }
  useEffect(() => {
    getData();
    }, []);

  //up ảnh
  const [upload, SetUpload] = useState([]);
  const navigate = useNavigate();
  const handlePost = async () => {
    const formData = new FormData(); 
    formData.append("image", upload);
    const post = await fetch("http://localhost:8081/api/uploadphoto/image",{
      method: "POST",
      headers: {
        Authorization:  "Bearer " + token
      },
      body: formData
    });
    console.log(post, "post");
    if(post.ok){
      alert("Photo successfully uploaded");
      navigate(`/home/users/${myInfo._id}`);
    }
    else{
      alert("Photo failed");
    }
  }
  return (
    <div className="post-wrapper">
      <h1 className='header'>New Post</h1>

      <div className='icon-wrapper'>
      {upload.length === 0 ? (<MdOutlineFileUpload className="post-icon" transform='scale(3)'/>) :
      (<figure>
        <img src={URL.createObjectURL(upload)} style={{width: "100%", height:"400px"}}/>
       </figure>)}
      </div> 
      
      <div className='upload-post'>
        <label className="upload">
          Upload
          <input type="file" onChange={(e) => {SetUpload(e.target.files[0])}}/>
        </label>
        <button className='btn' onClick={handlePost}>Post</button>
      </div>
    </div>
  )
}

export default Newpost;