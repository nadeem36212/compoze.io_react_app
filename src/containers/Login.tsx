import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Box, VStack, Button, Text, Checkbox, } from '@chakra-ui/react';
import './Login.css';
import { useAppDispatch } from '../app/hooks';
import { signIn } from '../features/auth/authSlice';
import { useHistory } from 'react-router-dom';
import { isFulfilled } from '@reduxjs/toolkit';
import background from '../images/login-background.svg'
import logo from "../images/login-logo.svg"
import NavBar from '../navigation/navbar';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const history = useHistory();

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    const action = await dispatch(signIn({ email, password }));
    const fulfilled = isFulfilled(action);
    fulfilled
      ? history.push('/')
      : alert('There was a problem signing in, please try again');
  }

  return (
    <div className=' ' style={{flexDirection:"row", display:"flex"}}>
      {/* <NavBar /> */}
      <Box style={{width:240, height:'100vh', backgroundColor:"white"}}>
      </Box>
      <Box  alignItems='center' justifyContent='center'>
        <Box className='Login loginBlock' >
          <Box className='welcomeBox'>
        <Box >
         <Text className='welcomeText' > Welcome </Text>
        </Box>
        <Box>
          <Text className='loginText'>
          Login to your account
          </Text>
        </Box>
        </Box>
        <Box>
        <Form onSubmit={handleSubmit}>
          <VStack>
            <Form.Group controlId='email' style={{ width: '100%' }}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                autoFocus
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{width:400, height:46}}
                placeholder='Email'
              />
            </Form.Group>
            <Form.Group controlId='password' style={{ width: '100%' }}>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{width:400, height:46}}
                placeholder='Password'
              />
            </Form.Group>
            <Box className='rememberBox' style={{marginLeft:80}}>
              <Box >
              <Checkbox  borderColor='#423B35'><Text className='rememberText' >Remember me</Text></Checkbox>
              </Box>
              <Box>
                <Text className='forgotText' >
                  Forgot Password?
                </Text>
              </Box>
            </Box>
            <Box style={{marginLeft:75}}>
            <Button
              className='loginButton'
              type='submit'
              disabled={!validateForm()}
              w='400px'
              h='44px'
              // borderRadius='5px'
              // padding='19px, 32px, 19px, 32px'
              // marginLeft='30px'
            >
              Login
            </Button>
            <Box style={{display:"flex", flexDirection:"row", marginLeft:-8, padding:10}}>
              <Text className='accountText' >
              Don’t have an account? </Text> 
              <Text className='signupText' > Sing Up</Text>
              
            </Box>
            </Box>
          </VStack>
        </Form>
        </Box>
        </Box>
      </Box>
      <div style={{display:"flex", background:"cover", }}>
      <div style={{ backgroundImage: `url(${background})`, 
      width:961.5,
        height:'100vh',
        // marginTop:'-70px',
        // fontSize:'50px',
        // backgroundSize: 'cover',
        // backgroundRepeat: 'no-repeat',
        display:"flex", alignItems:"center", justifyContent:"center",
      }}
      // style={{height:1080, backgroundColor:"green", width:960}}
      >
          <div style={{flexDirection:"row", display:"flex", alignItems:"center", }}>
          <div style={{padding:42}}>
            <img src={logo} width={64} height={68}/>
           </div>
           <div><Text fontSize='59px' fontWeight='400' fontFamily='Quicksand'> Compoze.io </Text></div>
           
           </div>
      </div>
      </div>
    </div>
  );
}
