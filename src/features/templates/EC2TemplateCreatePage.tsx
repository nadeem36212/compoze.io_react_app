import { Heading, Switch, Divider, HStack, Flex, Box, Stack, FormControl, FormLabel, Button } from "@chakra-ui/react"
import { useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { Card } from "../../components/Card"
import { CompozeFormOption } from "../../components/form/CompozeFormOption"
import FreeFormSelect from "../../components/form/FreeFormSelect"
import { selectAccountMetaData } from "../account/accountSlice"
import { Subnet } from "../component/create/ec2/EC2ComponentCreation"
import SelectAMIName from "../component/create/selections/AMISelection"
import PortSelection from "../component/create/selections/PortSelection"
import SelectionForm from "../component/create/selections/SelectionForm"
import SubnetSelection from "../component/create/selections/SubnetSelection"
import VolumeSelectionSize from "../component/create/selections/VolumeSizeSelection"
import VPCSelection from "../component/create/selections/VPCSelection"
import { selectTemplates, Template } from "./templateSlice"

interface EC2FromTemplateCreationPageProps {
    finishForm: (productName: string, name: string, technology: string, attributes: any) => void
}
export function EC2TemplateCreatePage({ finishForm }: EC2FromTemplateCreationPageProps) {
    const params = useParams<{ name: string }>();

    const meta = useAppSelector(selectAccountMetaData);
    const [vpc, setVPC] = useState<string | undefined>(undefined)
    const [defaultVPC, setDefaultVPC] = useState<boolean>(false)
    const [defaultSubnet, setDefaultSubnet] = useState<boolean>(false)
    const [defaultPorts, setDefaultPorts] = useState<boolean>(false)
    const [defaultAmi, setDefaultAmi] = useState<boolean>(false)
    const [defaultVolumeSize, setDefaultVolumeSize] = useState<boolean>(false)
    const [defaultInstanceType, setDefaultInstanceType] = useState<boolean>(false)
    const [defaultKeyName, setDefaultKeyName] = useState<boolean>(false)
    const [subnet, setSubnet] = useState<Subnet>()
    const [selectedVpcSubents, setSelectedVpcSubents] = useState<Subnet[]>([])
    const [ports, setPorts] = useState<string>()
    const [ami, setAmi] = useState<CompozeFormOption>()
    const [key, setKey] = useState<CompozeFormOption>()
    const [volumeSize, setVolumeSize] = useState<string>()
    const [name, setName] = useState<string>()
    const [instanceTypeIdentifier, setInstanceTypeIdentifier] = useState<CompozeFormOption>()


    const vpcOptions: CompozeFormOption[] = meta ? meta.vpcs.map((vpc: any) => { return { value: vpc.vpcId, displayName: vpc.vpcName } }) : []
    const subnetOptions: CompozeFormOption[] = selectedVpcSubents ? selectedVpcSubents.map(subnet => { return { value: subnet.subnetId, displayName: subnet.subnetName } }) : []
    const amiOptions: CompozeFormOption[] = meta ? meta.amis.map((ami: any) => { return { value: ami.amiId, displayName: ami.name } }) : []
    const instanceTypeOptions: CompozeFormOption[] = meta ? meta.instanceTypes.map((instanceType: any) => { return { value: instanceType.instanceType, displayName: instanceType.instanceType } }) : []
    const keyOptions: CompozeFormOption[] = meta ? meta.keyNames.map((key: any) => { return { value: key.keyName, displayName: key.keyName } }) : []


    return (
        <Box px='20px'>
            <Box>
                <Heading as='h1' size='xl' mb={8} textAlign='center'>
                    Ec2 Template Details
                </Heading>
                <Heading as='h2' textColor='gray.700' size='lg' textAlign={'center'}  >
                    Select which fields you'd like to provide default values for when creating a new EC2 instance
                </Heading>
                <Divider marginBottom={'5px'} marginTop={'15px'} />
                <Stack spacing={15}>
                    <Card>
                        <HStack spacing={31} w='100%' h={100}>

                            <Flex py={4}>
                                <Flex py={10}>
                                    <FreeFormSelect
                                        label='Template Name'
                                        helperText='Provide a name for your template'
                                        placeHolder='Name'
                                        onChange={(e: any) => {
                                            setName(e.target.value)
                                        }}
                                    />
                                </Flex>
                            </Flex>
                        </HStack>
                    </Card>
                    <Card>
                        <HStack spacing={31} w='100%' h={100}>
                            <FormControl display='flex' alignItems='left' >
                                <FormLabel fontSize={'2xl'} htmlFor='default-vpc' mb='0'>
                                    Default VPC
                                </FormLabel>
                                <Switch onChange={(e) => setDefaultVPC(e.target.checked)} size={'lg'} id='default-vpc' />
                            </FormControl>
                            {defaultVPC &&
                                <VPCSelection vpcOptions={vpcOptions} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    const selectedOption = vpcOptions.find(option => option.displayName === event.target.value)!
                                    const subnets = meta.vpcs.find((vpc: any) => vpc.vpcId === selectedOption.value)!.subnets
                                    setVPC(selectedOption.value)
                                    setSelectedVpcSubents(subnets)

                                }} />
                            }
                        </HStack>
                    </Card>
                    <Card>
                        <HStack spacing={31} w='100%' h={100}>
                            <FormControl display='flex' alignItems='left' >
                                <FormLabel fontSize={'2xl'} htmlFor='default-vpc' mb='0'>
                                    Default Subnet
                                </FormLabel>
                                <Switch onChange={(e) => setDefaultSubnet(e.target.checked)} size={'lg'} id='default-vpc' />
                            </FormControl>
                            {defaultSubnet &&
                                <SubnetSelection subnetOptions={subnetOptions} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    const selectedOption = subnetOptions.find(option => option.displayName === event.target.value)!
                                    //find subnet from selectedVpcSubents
                                    const subnet = selectedVpcSubents.find((subnet: any) => subnet.subnetId === selectedOption.value)!
                                    setSubnet(subnet)
                                }} />
                            }
                        </HStack>
                    </Card>
                    <Card>
                        <HStack spacing={31} w='100%' h={100}>
                            <FormControl display='flex' alignItems='left' >
                                <FormLabel fontSize={'2xl'} htmlFor='default-vpc' mb='0'>
                                    Default Ports
                                </FormLabel>
                                <Switch onChange={(e) => setDefaultPorts(e.target.checked)} size={'lg'} id='default-vpc' />
                            </FormControl>
                            {defaultPorts &&
                                <PortSelection setPorts={(portsString) => { setPorts(portsString) }} />
                            }
                        </HStack>
                    </Card>
                    <Card>
                        <HStack spacing={31} w='100%' h={100}>
                            <FormControl display='flex' alignItems='left' >
                                <FormLabel fontSize={'2xl'} htmlFor='default-vpc' mb='0'>
                                    Default AMI
                                </FormLabel>
                                <Switch onChange={(e) => setDefaultAmi(e.target.checked)} size={'lg'} id='default-vpc' />
                            </FormControl>
                            {defaultAmi &&
                                <SelectAMIName amiOptions={amiOptions} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    const selectedOption = amiOptions.find(option => option.displayName === event.target.value)!
                                    setAmi(selectedOption)
                                }} />
                            }
                        </HStack>
                    </Card>
                    <Card>
                        <HStack spacing={31} w='100%' h={100}>
                            <FormControl display='flex' alignItems='left' >
                                <FormLabel fontSize={'2xl'} htmlFor='default-vpc' mb='0'>
                                    Default Volume Size
                                </FormLabel>
                                <Switch onChange={(e) => setDefaultVolumeSize(e.target.checked)} size={'lg'} id='default-vpc' />
                            </FormControl>
                            {defaultVolumeSize &&
                                <VolumeSelectionSize onChange={setVolumeSize} />
                            }
                        </HStack>
                    </Card>
                    <Card>
                        <HStack spacing={31} w='100%' h={100}>
                            <FormControl display='flex' alignItems='left' >
                                <FormLabel fontSize={'2xl'} htmlFor='default-vpc' mb='0'>
                                    Default Instance Type
                                </FormLabel>
                                <Switch onChange={(e) => setDefaultInstanceType(e.target.checked)} size={'lg'} id='default-vpc' />
                            </FormControl>
                            {defaultInstanceType &&
                                <SelectionForm label="Which instance type would you like to use?"
                                    placeHolder="Instance Type"
                                    options={instanceTypeOptions}
                                    helperText="Confirm pricing for your instance type to ensure you do not exceed your budget"
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        const selectedOption = instanceTypeOptions.find(option => option.displayName === event.target.value)!
                                        setInstanceTypeIdentifier(selectedOption)
                                    }} />
                            }
                        </HStack>
                    </Card>
                    <Card>
                        <HStack spacing={31} w='100%' h={100}>
                            <FormControl display='flex' alignItems='left' >
                                <FormLabel fontSize={'2xl'} htmlFor='default-vpc' mb='0'>
                                    Default Key Name
                                </FormLabel>
                                <Switch onChange={(e) => setDefaultKeyName(e.target.checked)} size={'lg'} id='default-vpc' />
                            </FormControl>
                            {defaultKeyName &&
                                <SelectionForm label="Which key name would you like to use?"
                                    placeHolder="EC2 Key name"
                                    options={keyOptions}
                                    helperText="This is the key you will use to ssh into your instance"
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        const selectedOption = keyOptions.find(option => option.displayName === event.target.value)!
                                        setKey(selectedOption)
                                    }} />
                            }

                        </HStack>
                    </Card>
                    <Button size="lg" onClick={() => {
                        finishForm(params.name, name!, "EC2", {
                            ami: ami?.value,
                            numberOfInstances: 1,
                            keyName: key?.value,
                            subnetId: subnet?.subnetId,
                            vpcId: vpc,
                            singleDeployment: true,
                            availabilityZone: subnet?.availabilityZone,
                            ports: ports,
                            volumeSize,
                            instanceTypeIdentifier: instanceTypeIdentifier?.value


                        })
                    }}>
                        Create
                    </Button>
                </Stack>
            </Box>

        </Box>
    )

}

// dispatch(createTemplate({
//     productName: params.name,
//     name: name!,
//     technology: componentType!,
//     attributes: {
//         ami: ami?.value,
//         numberOfInstances: 1,
//         keyName: key?.value,
//         subnetId: subnet?.subnetId,
//         vpcId: vpc,
//         singleDeployment: true,
//         availabilityZone: subnet?.availabilityZone,
//         ports: ports,
//         volumeSize,
//         instanceTypeIdentifier: instanceTypeIdentifier?.value


//     }

// }))