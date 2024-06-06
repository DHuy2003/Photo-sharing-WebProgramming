import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Typography, List } from '@material-ui/core';
import { useEffect } from 'react';
import PhotoContent from './photoContent';

const UserPhotos = () => {
  const { userId } = useParams();
// thoong tin nguoi dung
  const [myDetail, setDetail] = useState([]);
  const token = localStorage.getItem("accesstoken");
  const getUser = async () => {
    const res = await fetch(`http://localhost:8081/api/user/${userId}`,{
      headers: {
      "Content-Type": "application/json",
      Authorization:  "Bearer " + token
      }
    });
    const result = await res.json();
    setDetail(result);
  }
  useEffect(() => {
    getUser();
  }, []);
  
  //thong tin anh
  const [userPhotos,setUserPhotos] = useState([]);
    const fethData = async () => {
        const userPhoto = await fetch(`http://localhost:8081/api/photo/${userId}`,{
          headers: {
          "Content-Type": "application/json",
          Authorization:  "Bearer " + token
          }
        });
        const userPhoto1 = await userPhoto.json();
        setUserPhotos(userPhoto1);
    }
    useEffect(
      ()=>{
        fethData();
      }
    ,[userId]);
  if (!userPhotos || userPhotos.length === 0) {
    return <Typography variant="body1">No photos found for this user.</Typography>;
  }
  return (
    <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
      <Typography variant="h4" gutterBottom style={{border: "dashed 1px lightgrey",boxShadow:"5px 5px 8px 5px #888888"}}>Photos of {myDetail.first_name} {myDetail.last_name}</Typography>
      <List>
        {userPhotos.map(photo => (
          <PhotoContent photo={photo} myDetail={myDetail} />
        ))}
      </List>
      <Link to={`/home/users/${userId}`} style={{marginTop:"15px"}}>Back to User Detail</Link>
    </div>
  );
};

export default UserPhotos;
