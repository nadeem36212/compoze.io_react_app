import { Heading, Text } from '@chakra-ui/react';
import NavBar from '../navigation/navbar';
import './Home.css';

export default function Home() {
  
  return (
    <div className=''>
      
      <div className='Home  py-3'>
        <div className='Home'>
          <div className='lander'>
            <Heading as='h1' size='3xl' pb={3}>
              Compoze
            </Heading>
            <Text className='text-muted'>
              Welcome to the Compoze AWS Management page
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}
