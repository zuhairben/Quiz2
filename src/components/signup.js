import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Checkbox,FormControlLabel,FormControl,Select,InputLabel } from '@mui/material';
import {MenuItem} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const states = [
    { value: 'Seller', label: 'Seller' }
   
  
  ];

const defaultTheme = createTheme();

export default function SignUp() {
   

    const [udata, setData] = useState({
        email: "",
        password: "",
        age: 0,
        fullName: "",
        lastName: "",
        admin: false,
        utype:"",
      });
    
    
      useEffect(() => {
        
        console.log(udata);
      }, [udata]);
      const handleInputChange = (event) => {
        
        const { name, value } = event.target;
        console.log(name , value)
        setData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      const SignupSubmit = async () => {
  
        try {
      
          const res = await axios({
            
              url: "http://localhost:5600/auth/signup",
              method: "post",
              data: udata,
          });
         
          if (res.data.msg){
    
            window.alert(res.data.msg);
          
          return; // Return to prevent further execution  
        }
          
        } catch (e) {
          window.alert("ERROR");
          console.error(e);
        }
      };
    
 

  return (
    
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
       
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate  sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="FullName"
                  label="Full Name"
                  name="fullName"
                  autoComplete="family-name"
                  onChange={handleInputChange}
                  value={udata.fullName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleInputChange}
                  value={udata.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleInputChange}
                  value={udata.password}
                />
              </Grid>
              <Grid item xs={12}>
            <FormControl fullWidth>
                <InputLabel >User Type</InputLabel>
                <Select onChange={handleInputChange}  label="Type" name="utype" variant="outlined" value={udata.utype} >
                  {states.map((option) => (
                    <MenuItem  key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
              {/* <FormControlLabel
        control={
          <Checkbox
            checked={isChecked}
            onChange={handleCheckboxChange}
            color="primary" // You can customize the color
            value={udata.utype}
          />
        }
        label="Seller" // Label for the checkbox
      /> */}
     
    
           
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={SignupSubmit}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/Login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
    
      </Container>
   
  );
}