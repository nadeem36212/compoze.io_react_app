import { Box, Button, Heading, propNames, Stack , Text} from "@chakra-ui/react";
import { Card } from "../../components/Card";
import { Component } from "./componentSlice";
import DeleteIcon from '../../images/Icons.svg'
import SettingButton from '../../images/Button.png'
import arrow from '../../images/left-arrow.svg'
import CompozeLab from '../../images/compoze-lab.svg'
import './ComponentDetail.css'


interface ComponentProps {
    component: Component
    onDelete: () => void;
}

export default function ComponentDetails(props: ComponentProps) {
    const component = props.component;
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'CREATED':
                return 'green';
            case 'DEPLOYED':
                return 'blue';
            case 'FAILED':
                return 'red';
            default:
                return 'blue';
        }
    }
    return (
        <div>
            <Box>
                <Box>
                    {/* <Heading as='h1' size='xl' mb={8} textAlign='center'>
                        Component {component.name}
                    </Heading> */}

<div className='dlt-btn-container'>
        <div >
      <img src={arrow}  />
        </div>
        <Stack spacing={3} direction='row' align='center'>
        <Button  
        type='button' 
        w="170px"
        onClick={()=>{}}
        leftIcon={<div className="icon">
          <img src={DeleteIcon} width={32} height={32} alt=''/></div>}>
        Delete account</Button>
          <img src={SettingButton} height={36} width={36} onClick={()=>{}}/>
        </Stack>
      </div>

                    {/* <Button style={{ marginBottom: '15px' }} alignContent={'right'} onClick={props.onDelete}>Decompoze</Button>
                     */}
                    <Box className="container1">
                        <Box className="container2">
                            <Box className="compazLab">
                                <img src={CompozeLab} />
                            </Box>
                            <Box style={{marginTop:35 }}>
                               <Text className="componentText" > Component name </Text>
                               <Box className="box-shadow">
                                <Box>
                                    <Text className="boldText">{`Database Engine`}</Text>
                                </Box>
                                <Box>
                                <Text className="paragraph">{`Lorem Ipsum`}</Text>
                                </Box>
                            </Box>
                            <Box className="box-shadow">
                                <Box>
                                    <Text className="boldText">{`Instance Size`}</Text>
                                </Box>
                                <Box>
                                <Text className="paragraph">{`Lorem Ipsum`}</Text>
                                </Box>
                            </Box>
                            <Box className="box-shadow">
                                <Box>
                                    <Text className="boldText">{`Storage`}</Text>
                                </Box>
                                <Box>
                                <Text className="paragraph">{`Lorem Ipsum`}</Text>
                                </Box>
                            </Box>
                            <Box className="paragraphBox">
                                <Box>
                                    <Text className="boldText">{`Note`}</Text>
                                </Box>
                                <Box>
                                <Text className="paragraph"  style={{textAlign:"justify"}}>{`Sit velit ultrices lobortis nullam vulputate consectetur eget pretium. 
                                    Blandit neque nibh augue nisi. Elit venenatis feugiat mi turpis at auctor enim diam sed. 
                                    Blandit turpis blandit porttitor habitant tincidunt bibendum vestibulum aliquet ullamcorper.`}</Text>
                                </Box>
                            </Box>
                            </Box>
                            
                        </Box>
                    <Stack spacing={31}>
                        {/* <Card w='35%' h='100%'>
                            <Heading as='h1' size='xl' variant='med-dark' mb={4}>
                                Component Details
                            </Heading>
                            <Stack overflowX='auto'>
                                <Heading as='h2' size='lg' variant='light'>
                                    Technology
                                </Heading>
                                <Stack pl={5}>
                                    <Heading as='h3' size='md' variant='med-dark'>
                                        AWS {component.technology}
                                    </Heading>
                                </Stack>
                                <Heading as='h2' size='lg' variant='light'>
                                    Status
                                </Heading>
                                <Stack pl={5}>
                                    <Heading as='h3' size='md' variant='med-dark' color={getStatusColor(component.status)}>
                                        {component.status}
                                    </Heading>
                                </Stack>

                                {Object.entries(component.attributes).map((key, index) => (
                                    <div>
                                        <Heading as='h2' size='lg' variant='light'>
                                            {key[0].charAt(0).toUpperCase() + key[0].slice(1)}
                                        </Heading>
                                        <Stack pl={5}>
                                            <Heading as='h3' size='md' variant='med-dark'>
                                                {key[1] as string}
                                            </Heading>
                                        </Stack >
                                    </div>
                                ))}

                            </Stack>
                        </Card> */}
                    </Stack>
                    </Box>
                </Box>
            </Box>
        </div>
    );

}

