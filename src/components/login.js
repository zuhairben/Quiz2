import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector ,useDispatch} from 'react-redux';
import { login } from '../redux/reducers/userReducer';
import { useFormik } from "formik";
import { NotificationManager } from "react-notifications";
import {Link} from 'react-router-dom'


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "jivynosyfu@mailinator.com",
      social_auth_type: "normal",
      password: "Pa$$w0rd!",
    },
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("email", formik.values.email)
      formData.append("password", formik.values.password)
      formData.append("social_auth_type", formik.values.social_auth_type)
      const response = await axios.post(
        "https://sandbox.practical.me/api/login",
        values,
        formData,
      );
      if (response.data.message === "User login successfully." && response.status === 200) {
        NotificationManager.success(response.data.msg);
        console.log(response.data.token)
        dispatch(login(response.data.token));
      } else {
        NotificationManager.error(response.data.message);
      }
    },
  });


  return (
    <Box>
    <form
    style={{ display: "flex", flexDirection: "column" }}
    onSubmit={formik.handleSubmit}
  >
    <TextField
      onChange={formik.handleChange}
      value={formik.values.email}
      name="email"
      label="Email"
      variant="outlined"
    />
    <TextField
      onChange={formik.handleChange}
      value={formik.values.password}
      name="password"
      label="Password"
      type="password"
      variant="outlined"
    />
    <Link to="/home">
    <Button type="submit" variant="contained">
      Login
    </Button>
    </Link>
  </form>
  </Box>
  );
}