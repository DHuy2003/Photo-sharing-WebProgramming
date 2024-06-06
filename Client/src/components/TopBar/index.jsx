import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import "./styles.css";
import { jwtDecode } from "jwt-decode";

//  * Define TopBar, a React component of Project 4.
//  */
function TopBar () {
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

    const handlLogout = () => {
      localStorage.clear();
      window.location.href = "/login";
    }
    const handlNewPost = () => {
      window.location.href = "/home/newpost";
    }
    
    return (
      <AppBar className="topbar-appBar"  style={{position: "fix", zIndex:"1100"}}>
        <Toolbar>
          <Typography variant="h5" color="inherit" >
            {/* This is the TopBar component */}
            Welcome {myInfo.first_name} {myInfo.last_name}
            <div>
            <Button variant="contained" color="secondary" style={{ position: "absolute", right: 0, top : 10}} onClick={handlLogout}>Log out</Button>
            <Button variant="contained" color="secondary" style={{ position: "absolute", right: 150, top : 10}} onClick={handlNewPost}>New Post</Button>
            </div>    
          </Typography>
        </Toolbar>
      </AppBar>
    );
}

export default TopBar;
