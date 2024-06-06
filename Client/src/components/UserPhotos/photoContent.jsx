import { Avatar, Button, CardActions, CardContent, CardHeader, CardMedia, ListItem, TextField } from '@mui/material';
import { Card, List } from 'antd';
import React, { useState } from 'react'
import UserComment from './userComment';
import fetchModel from '../../lib/fetchModelData';
import SendIcon from '@mui/icons-material/Send';
import { Link } from 'react-router-dom';
import "./styles.css";
import moment from 'moment';
import angry_face from "./angry-face.png";
import like from "./like.png";
import heart from "./love.png";
import lauhgh_face from "./laugh.png";
import sad_face from "./sad-face.png";
import heart_eye from "./heart-eyes.png";

const PhotoContent = ({ photo, myDetail }) => {
  const [myComment, setComment] = useState("");
  const [photoDetail, setPhotoDetail] = useState(photo);
  // console.log(photo, "du lieu photo");
  const tmp = photo.reactions?.find((reaction)=>(reaction.user_id === localStorage.getItem("user_id")));
  // console.log(tmp, "du lieu");
  const [reaction, setReaction] = useState(tmp ? tmp.reaction : -1);

  const onChange = (e) => {
    e.preventDefault();
    try {
      setComment(e.target.value);
    } catch (err) {
      console.log(err);
    }
  };
  
  // console.log(photoDetail, "detail");
  const onsubmit = async (e) => {
    // console.log(myComment, "ngu");
    e.preventDefault();
    if (myComment === "") {
      return;
    }
    try {
      const res = await fetchModel(`api/comment/${photoDetail._id}`, {
        method: "POST",
        body: JSON.stringify({
          comment: myComment,
        }),
      });
      const result = await res.json();
      if (result.success) {
        setComment("");
        setPhotoDetail(result.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //xử lí reaction

  const handleReaction = async (number) =>{
    try {
      const res = await fetchModel(`api/photo/${photoDetail._id}`, {
        method: "POST",
        body: JSON.stringify({reaction: number}),
      });
      const result = await res.json();
      if (result.success) {
        setReaction(number);
        setPhotoDetail({...photoDetail,reactions: result.photo.reactions});
        console.log(photoDetail);
        alert("Reaction successfully");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <ListItem key={photoDetail._id} sx={{width: "70%", margin: "0 auto"}}>
      <Card style={{width:"100%", boxShadow:"10px 10px 8px 10px #888888"}}>
        <CardHeader
          className="header-post"
          title={<Link className="header-post-title" to={`http://localhost:3000/home/users/${myDetail._id}`}>{myDetail.first_name}</Link>}
          subheader={moment(photoDetail.date_time).format('MMMM Do YYYY, h:mm:ss a')}
          avatar={<Avatar />}
        />
      
        <CardMedia 
          style={{width: '100%', height: '600px'}}
          component={"img"}
          image={`http://localhost:8081/image/${photoDetail.file_name}`}
          alt={`${photoDetail.file_name}`}
        />
        <CardContent>
          <div className='react-icons'>
            {reaction === 0 ? <button className='color' onClick={() => handleReaction(-1)}>
              <img src={like} alt="" />
            </button > : <button className="greyscale" onClick={() => handleReaction(0)}>
              <img src={like} alt="" />
            </button >}

            {reaction === 1 ? <button className='color' onClick={() => handleReaction(-1)}>
              <img src={heart} alt="" />
            </button > : <button className="greyscale" onClick={() => handleReaction(1)}>
              <img src={heart} alt="" />
            </button >}

            {reaction === 2 ? <button className='color' onClick={() => handleReaction(-1)}>
              <img src={heart_eye} alt="" />
            </button > : <button className="greyscale" onClick={() => handleReaction(2)}>
              <img src={heart_eye} alt="" />
            </button >}

            {reaction === 3 ? <button className='color' onClick={() => handleReaction(-1)}>
              <img src={angry_face} alt="" />
            </button > : <button className="greyscale" onClick={() => handleReaction(3)}>
              <img src={angry_face} alt="" />
            </button >}

            {reaction === 4 ? <button className='color' onClick={() => handleReaction(-1)}>
              <img src={lauhgh_face} alt="" />
            </button > : <button className="greyscale" onClick={() => handleReaction(4)}>
              <img src={lauhgh_face} alt="" />
            </button >}

            {reaction === 5 ? <button className='color' onClick={() => handleReaction(-1)}>
              <img src={sad_face} alt="" />
            </button > : <button className="greyscale" onClick={() => handleReaction(5)}>
              <img src={sad_face} alt="" />
            </button >}

          </div>
          <List style={{mt: "20px"}}>
            {photoDetail.comments &&
              photoDetail.comments.map((cmt) => <UserComment comment={cmt} />)}
          </List>
        </CardContent>
        <CardActions sx={{padding: "30px"}}>
          <TextField
            value={myComment}
            onChange={(e) => onChange(e)}
            placeholder='Enter your comment here.....'
            size="large"
            style={{borderRadius:"10px" , width:"100%", padding:"10px"}}
            name='comment'
          />
          <Button
            onClick={(e) => onsubmit(e)}
            size="large"
          >
            <SendIcon/>
          </Button>
        </CardActions>
      </Card>
    </ListItem>
  );
};

export default PhotoContent;