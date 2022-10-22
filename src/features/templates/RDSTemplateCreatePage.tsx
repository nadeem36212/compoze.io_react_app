import { Heading, Switch, Divider, HStack, Flex, Box, Stack, FormControl, FormLabel, Button } from "@chakra-ui/react"
import { useState } from "react";
import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { CompozeFormOption } from "../../components/form/CompozeFormOption";
import FormOption from "../../components/form/FormSelectOption";
import FreeFormSelect from "../../components/form/FreeFormSelect";
import VolumeSelectionSize from "../component/create/selections/VolumeSizeSelection";

interface RDSFromTemplateCreationPageProps {
    finishForm: (productName: string, name: string, technology: string, attributes: any) => void
}
export function RDSTemplateCreatePage({ finishForm }: RDSFromTemplateCreationPageProps) {
    const params = useParams<{ name: string }>();
    const [name, setName] = useState<string>()

    const [defaultDatabaseEngine, setDefaultDatabaseEngine] = useState<boolean>(false)
    const [databaseType, setDatabaseType] = useState('')
    const databaseTypeOptions = [{ displayName: "Postgres", value: "POSTGRES" }, { displayName: "MySQL", value: "MYSQL" }];
    const instanceTypeOptions = [{ displayName: "t3.micro (~$13.00 / month)", value: "t3.micro" }, { displayName: "t3.small (~$26.00 / month)", value: "t3.small" }, { displayName: "t3.medium (~$52.00 / month)", value: "t3.medium" }, { displayName: "t3.large (~$105.00 / month)", value: "t3.large" }, { displayName: "t3.xlarge (~$209.00 / month)", value: "t3.xlarge" }];

    const [defaultInstanceSize, setDefaultInstanceSize] = useState<boolean>(false)
    const [instanceType, setInstanceType] = useState<string>()

    const [defaultStorageSize, setDefaultStorageSize] = useState<boolean>(false)
    const [storageSize, setStorageSize] = useState<string>()

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
                                <FormLabel fontSize={'2xl'} htmlFor='default-databsae-engine' mb='0'>
                                    Default Database Engine
                                </FormLabel>
                                <Switch onChange={(e) => setDefaultDatabaseEngine(e.target.checked)} size={'lg'} id='default-vpc' />
                            </FormControl>
                            {defaultDatabaseEngine &&
                                <Flex py={4}>
                                    <Flex py={10}>
                                        <FormOption
                                            label='Which database engine would you like to use?'
                                            placeHolder='Select a database engine'
                                            options={databaseTypeOptions}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                //find the option that was selected
                                                const selectedOption = databaseTypeOptions.find(option => option.displayName === event.target.value)!;
                                                setDatabaseType(selectedOption.value);
                                            }}
                                        />
                                    </Flex>
                                </Flex>
                            }
                        </HStack>
                    </Card>
                    <Card>
                        <HStack spacing={31} w='100%' h={100}>
                            <FormControl display='flex' alignItems='left' >
                                <FormLabel fontSize={'2xl'} htmlFor='default-databsae-engine' mb='0'>
                                    Default Instance Size
                                </FormLabel>
                                <Switch onChange={(e) => setDefaultInstanceSize(e.target.checked)} size={'lg'} id='default-vpc' />
                            </FormControl>
                            {defaultInstanceSize &&
                                <Flex py={4}>
                                    <Flex py={10}>
                                        <FormOption
                                            label='What size RDS instance?'
                                            placeHolder='Instance Type'
                                            options={instanceTypeOptions}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                const selectedOption = instanceTypeOptions.find(option => option.displayName === event.target.value)!;
                                                setInstanceType(selectedOption.value);
                                            }}
                                        />
                                    </Flex>
                                </Flex>
                            }
                        </HStack>
                    </Card>
                    <Card>
                        <HStack spacing={31} w='100%' h={100}>
                            <FormControl display='flex' alignItems='left' >
                                <FormLabel fontSize={'2xl'} htmlFor='default-vpc' mb='0'>
                                    Default Volume Size
                                </FormLabel>
                                <Switch onChange={(e) => setDefaultStorageSize(e.target.checked)} size={'lg'} id='default-vpc' />
                            </FormControl>
                            {defaultStorageSize &&
                                <VolumeSelectionSize onChange={setStorageSize} />
                            }
                        </HStack>
                    </Card>
                    <Button size="lg" onClick={() => {
                        finishForm(params.name, name!, "RDS", {
                            databaseType,
                            instanceType,
                            storageSize
                        })
                    }}>
                        Create
                    </Button>
                </Stack>
            </Box>
        </Box>
    )
}