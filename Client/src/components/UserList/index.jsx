import React, { useEffect, useState } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link, useParams } from 'react-router-dom';
import "./styles.css";
import models from "../../modelData/models";

/**
 * Define UserList, a React component of Project 4.
 */
function UserList () {
    const { userId } = useParams();
    const [data,setData] = useState([]);

    const token = localStorage.getItem("accesstoken");
    const fethData = async () => {
        const userData = await fetch("http://localhost:8081/api/user/list",{
          headers: {
            "Content-Type": "application/json",
            Authorization:  "Bearer " + token
          },
        });
        const data1 = await userData.json();
        setData(data1.data);
    }
    useEffect(
      ()=>{
        fethData();
      }
    ,[]);
    // console.log(data, "list1");
    return (
      <div>
        <List component="nav">
          {data?.map((item) => (
            <>
              <ListItem key={item._id}  component={Link} to={`/home/users/${item._id}`}>
                      <ListItemText primary={`${item.first_name} ${item.last_name}`}/>
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
      </div>
    );
}

export default UserList;
