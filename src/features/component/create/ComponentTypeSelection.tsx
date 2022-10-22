import { Heading, Divider, Grid, GridItem, Image, Button, propNames, Flex } from "@chakra-ui/react"
import RDSIcon from './rds.svg';
import EC2Icon from './ec2.svg';
import OPENVPNIcon from './openvpn.svg';

interface ComponentTypeSelectionProps {
    onComponentTypeSelected: (componentType: string) => void;
    heading: string
    subHeading: string
}
export default function ComponentTypeSelection(props: ComponentTypeSelectionProps) {
    return (<div>

        <Heading as='h1' textColor='gray.700' textAlign='center'>{props.heading}</Heading>
        <Heading as='h2' textColor='gray.700' padding={'10'} size='lg' textAlign={'center'}  >
            {props.subHeading}
        </Heading>
        <Divider />
        <Grid padding={'50'} templateColumns='repeat(3, 1fr)' w='100%' justifyItems='center'>
            <GridItem w='150px' display={'flex'} flexDir='column' alignItems={'center'}  >
                <Image width='90%' src={RDSIcon} marginBottom={'10'}
                    onClick={() => { props.onComponentTypeSelected('RDS') }} />
                <Button
                    width={'100%'}
                    size='sm'
                    onClick={() => { props.onComponentTypeSelected('RDS') }}
                >
                    Amazon RDS
                </Button>
            </GridItem>
            <GridItem w='150px' display={'flex'} flexDir='column' alignItems={'center'} >
                <Image width='90%' src={EC2Icon} marginBottom={'10'}
                    onClick={() => { props.onComponentTypeSelected('EC2') }}
                />
                <Button
                    width={'90%'}
                    size='sm'
                    onClick={() => { props.onComponentTypeSelected('EC2') }}>
                    EC2 Instance
                </Button>
            </GridItem>
            <GridItem w='150px' display={'flex'} flexDir='column' alignItems={'center'}  >
                <Image width='90%' src={OPENVPNIcon} marginBottom={'10'}
                    onClick={() => { props.onComponentTypeSelected('OPENVPN') }} />
                <Button
                    width={'100%'}
                    size='sm'
                    onClick={() => { props.onComponentTypeSelected('OPENVPN') }}                >
                    OpenVPN
                </Button>
            </GridItem>
        </Grid>
    </div>

    )
}