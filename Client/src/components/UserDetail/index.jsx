import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState({});
  const token = localStorage.getItem("accesstoken");
  const user = async () => {
    const data = await fetch(`http://localhost:8081/api/user/${userId}`,{
      headers: {
      "Content-Type": "application/json",
      Authorization:  "Bearer " + token
      }
    });
    const details = await data.json();
    // console.log(details, "Sai roi");
    setUserDetails(details);
  } 
  useEffect(
    () =>{
      user();
    }
  ,[userId])
//  console.log(userDetails, "Dung chua");
    return (
      <div>
      {userDetails && (
        <div>
          <Typography variant="h6">Name: {userDetails.first_name} {userDetails.last_name}</Typography>
          <hr></hr>
          <Typography variant="body1" style={{marginTop:"10px"}}>Location: {userDetails.location}</Typography>
          <Typography variant="body1" style={{marginTop:"10px"}}>Description: {userDetails.description}</Typography>
          <Typography variant="body1" style={{marginTop:"10px"}}>Occupation: {userDetails.occupation}</Typography>
          <Button component={Link} to={`/home/photos/${userId}`} variant="contained" color="primary" style={{marginTop:"10px"}}>
            View Photos
          </Button>
        </div>
      )}
    </div>
    );
}

export default UserDetail;
