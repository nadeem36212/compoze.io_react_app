import { Badge, Flex, HStack, Image, Link } from '@chakra-ui/react';
import { isFulfilled } from '@reduxjs/toolkit';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectUser, signOut } from '../features/auth/authSlice';
import routes from '../routes';
import Logo from '../images/Logo.svg';
import { Alert, AlertDescription, AlertIcon, AlertTitle, CloseButton } from '@chakra-ui/react';

export default function NavBar() {
  const user = useAppSelector(selectUser);

  const dispatch = useAppDispatch();
  const history = useHistory();

  const handleLogout = async () => {
    const action = await dispatch(signOut());
    const fulfilled = isFulfilled(action);
    fulfilled
      ? history.push('/login')
      : alert('There was a problem signing in, please try again');
  };
  return (
    <Flex
      as='nav'
      align='center'
      justify='space-between'
      wrap='wrap'
      w='100%'
      mb={8}
      p={8}
      // bg='brand.orange'
      color='brand.orange'
      fontSize={19}
      fontWeight={600}
    >
      <LinkContainer to='/'>
        <Navbar.Brand className='font-weight-bold text-muted'>
          <Image src={Logo} />
        </Navbar.Brand>
      </LinkContainer>
      <Nav activeKey={window.location.pathname}>
        {user ? (

          <HStack spacing={8}>

            <LinkContainer to={routes.COST.path}>
              <Link
                variant={
                  window.location.pathname === routes.COST.path
                    ? 'link-hover-active'
                    : 'link-hover'
                }
              >
                Cost
                
              </Link>
            </LinkContainer>

            <LinkContainer to={routes.COMPLIANCE.path}>
              <Link
                variant={
                  window.location.pathname === routes.COMPLIANCE.path
                    ? 'link-hover-active'
                    : 'link-hover'
                }
              >
                Compliance
              </Link>
            </LinkContainer>

            {<LinkContainer to={routes.PRODUCTS.path}>
              <Link
                variant={
                  window.location.pathname === routes.PRODUCTS.path
                    ? 'link-hover-active'
                    : 'link-hover'
                }
              >
                Products
              </Link>
            </LinkContainer>}
            
            {/* <LinkContainer to={routes.PRODUCTS.path}>
              <Alert status='error'>
                <AlertIcon />

                <Link
                  variant={
                    window.location.pathname === routes.PRODUCTS.path
                      ? 'link-hover-active'
                      : 'link-hover'
                  }
                >
                  Operations
                </Link>
              </Alert>

            </LinkContainer> */}

            <LinkContainer to={routes.ACCOUNT.path}>
              <Link
                variant={
                  window.location.pathname === routes.ACCOUNT.path
                    ? 'link-hover-active'
                    : 'link-hover'
                }
              >
                Accounts
              </Link>
            </LinkContainer>

            <LinkContainer to={routes.ORGANIZATION.path}>
              <Link
                variant={
                  window.location.pathname === routes.ORGANIZATION.path
                    ? 'link-hover-active'
                    : 'link-hover'
                }
              >
                Organization
              </Link>
            </LinkContainer>

            <Link variant='link-hover' onClick={handleLogout}>
              Logout
            </Link>
          </HStack>
        ) : (
          <HStack spacing={8}>
            <LinkContainer to='/signup'>
              <Link variant='link-hover'>Signup</Link>
            </LinkContainer>
            <LinkContainer to='/login'>
              <Link variant='link-hover'>Login</Link>
            </LinkContainer>
          </HStack>
        )}
      </Nav>
    </Flex>
  );
}
