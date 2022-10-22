import './App.css';
import { useAppDispatch } from './app/hooks';
import { checkSession, User } from './features/auth/authSlice';
import routes from './routes';
import Router from './routes/Routes';
import NavBar from './navigation/navbar';
import { useEffect, useState } from 'react';
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, ChakraProvider, CloseButton } from '@chakra-ui/react';
import theme from './config/theme';
import '@fontsource/montserrat';
import '@fontsource/lato';
import accounts from "./images/accounts.svg";
import products from "./images/products.svg";
import { Header } from './navigation/header';
import { logo } from './images';
import { useSelector } from 'react-redux';
import { selectAlertError, selectAlertSuccess, setAlertError, setAlertSuccess } from './features/alertSlice';

function App() {
  const [ready, setReady] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const error = useSelector(selectAlertError);
  const success = useSelector(selectAlertSuccess);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkSession())
      .then((thunkResponse) => {
        const authorized = !!thunkResponse;
        console.log(authorized);

        setAuthorized(authorized);
        setReady(true);

      })
      .catch(() => {
        setAuthorized(false);
        setReady(true);
      });
  }, []);

  const closeAlert  =()=>{
    dispatch(setAlertError(''))
  }


  const closeSuccess  =()=>{
    dispatch(setAlertSuccess(''))
  }
  return (
    <ChakraProvider theme={theme}>
      <div className='flex'>
         <div className='dib w-250 leftbar'>
          <div className='logo-div'>
          <img src={logo} alt='' />
          </div>
          <div className="db leftbar-block active">
              <img src={accounts} alt=''/> Accounts
          </div>
          <div className="db leftbar-block">
            <img src={products} alt=''/> Products
          </div>
        </div>
        <div className='flex w-100'>
          <div className='w-100'>
            <Header />
            <div className = { 'main-content'}>
              <div className={ 'block min-h-35'}>
              {success && (
                  <div className='mt-20'>
                    <Alert status='success' >
                      <AlertIcon />
                      <Box>
                        <AlertTitle></AlertTitle>
                        <AlertDescription>
                        {success}
                        </AlertDescription>
                      </Box>
                    
                      <CloseButton
                        alignSelf='flex-start'
                        position='absolute'
                        right={2}
                        top={2}
                        onClick={closeSuccess}
                      />
                    </Alert>
                  </div>
                  
                )}
                {error && (
                  <div className='mt-20'>
                    <Alert status='error' >
                      <AlertIcon />
                      <Box>
                        <AlertTitle></AlertTitle>
                        <AlertDescription>
                        {error}
                        </AlertDescription>
                      </Box>
                    
                      <CloseButton
                        alignSelf='flex-start'
                        position='absolute'
                        right={2}
                        top={2}
                        onClick={closeAlert}
                      />
                    </Alert>
                  </div>
                )}
                
              </div>
            {ready && (
                <Router
                  routes={routes}
                  authorized={authorized}
                  redirectPath={routes.LOGIN.path}
                >
                  <div className=''>

                    <NavBar />

                  </div>
                </Router>
              )}
              </div>
          </div>
        </div>
        
      </div>
    </ChakraProvider>
  );
}

export default App;
