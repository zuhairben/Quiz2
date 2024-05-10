import React from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table'
import {Stack, Typography} from "@mui/material";
import Container from '@mui/material/Container';
import { createTheme} from '@mui/material/styles';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";

import MealCard from "./MealCard";
import { Link } from "react-router-dom";



// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
const Home = () => {

    const user = useSelector((state) => state.user);
    const [data, setData] = useState(null);
    const token = user.token;

    const UserProfile = async()=>{
      try 
      {const response = await axios.get(
        "https://sandbox.practical.me/api/user/profile",
        {
          headers: { Authorization: `Bearer ${token}`}
        }
      )
      setData(response.data);
    }

      catch(e){
        console.error();
      }
    }

    useEffect(()=>{
      UserProfile();
    }, [])

    return ( 
      <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        margin: "100px",
      }}
    >
      <h1>User Profile</h1>

    </Box>
       
        
     

);
}
 
export default Home;