import './App.css';
import React, { useState} from "react";
import { Grid, Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes, Outlet, Navigate } from "react-router-dom";
import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import LoginForm from './modal/login/LoginForm';
import Home from './modal/default/Home';
import RegisterModal from './modal/register/RegisterModal';
import Newpost from './components/NewPost/newpost';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const open = true;
  return (
    <Router>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/login" element={<LoginForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>} />
    <Route path="/register" element={<RegisterModal isModalOpen={open} setIsModalOpen={setIsModalOpen}/>} />
    <Route path="/home" element = {
      <Grid container sx={{backgroundColor : "#fff", width: "100vw", m : 0}} spacing={2}>
        <Grid item xs={12} sx={{ height: '64px' }}>
          <TopBar />
        </Grid>
        <Grid container item xs={12} ></Grid>
        <Grid item sm={3}>
          <Paper className="main-grid-item" >
            <UserList />
          </Paper>
        </Grid>
        <Grid item sm={9}>
            <Outlet /> 
        </Grid>
      </Grid>}
    >
      <Route
        path="/home/users/:userId"
        element = {<UserDetail />}
      />
      <Route
          path="/home/photos/:userId"
          element = {<UserPhotos />}
      />
      <Route path="/home/users" element={<UserList />} />
      <Route
        path="/home/newpost"
        element = {<Newpost />}
      />
    </Route>
    </Routes>
  </Router> 
    );
}

export default App;
