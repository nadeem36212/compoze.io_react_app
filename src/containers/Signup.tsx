import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Box, VStack, Button } from '@chakra-ui/react';
import './Signup.css';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useHistory } from 'react-router-dom';
import NavBar from '../navigation/navbar';
import { selectSignupFailedMessage, signUp } from '../features/auth/authSlice';
import { isFulfilled } from '@reduxjs/toolkit';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successfullSignup, setSuccessfullSignup] = useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const dispatch = useAppDispatch();
  const history = useHistory();
  const signupFailedMessage: string | undefined = useAppSelector(selectSignupFailedMessage);

  function validateForm() {
    return email.length > 0 && password.length > 0 && password === passwordConfirmation;
  }


  async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    const action = await dispatch(signUp({ email, password }));
    const fulfilled = isFulfilled(action);
    if (fulfilled) {
      setSuccessfullSignup(true)
    } else {
      const failureMessage = signupFailedMessage ? signupFailedMessage : "Failed to signup user. Please try again"
      alert(failureMessage)
    }

  }
  return (
    <div className='App container py-3'>
      <NavBar />
      {successfullSignup ? (
        <div>Thanks for signing up! Please check your inbox to confirm your user account</div>
      ) :
        (<Box className='Signup' alignItems='center' justifyContent='center'>
          <Form onSubmit={handleSubmit}>
            <VStack>
              <Form.Group controlId='email' style={{ width: '100%' }}>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  autoFocus
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId='password' style={{ width: '100%' }}>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId='confirmpassword' style={{ width: '100%' }}>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type='password'
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
              </Form.Group>
              <Button
                className='signUpButton'
                type='submit'
                disabled={!validateForm()}
                w='100%'
              >
                Sign Up
              </Button>
            </VStack>
          </Form>
        </Box>
        )
      }

    </div>
  );
}
