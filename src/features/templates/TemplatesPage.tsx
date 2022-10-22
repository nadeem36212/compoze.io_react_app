import { Heading, Box, HStack, Stack, FormControl, FormLabel, Switch, Divider, Button, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, Flex, Grid, GridItem, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Card } from "../../components/Card";
import ConfirmationModal from "../../components/ConfirmationModal";
import { CompozeFormOption } from "../../components/form/CompozeFormOption";
import FreeFormSelect from "../../components/form/FreeFormSelect";
import NavBar from "../../navigation/navbar";
import routes from "../../routes";
import { fetchAccountMetaData, selectAccountMetaData } from "../account/accountSlice";
import ComponentTypeSelection from "../component/create/ComponentTypeSelection";
import { Subnet } from "../component/create/ec2/EC2ComponentCreation";
import SelectAMIName from "../component/create/selections/AMISelection";
import PortSelection from "../component/create/selections/PortSelection";
import SelectionForm from "../component/create/selections/SelectionForm";
import SubnetSelection from "../component/create/selections/SubnetSelection";
import VolumeSelectionSize from "../component/create/selections/VolumeSizeSelection";
import VPCSelection from "../component/create/selections/VPCSelection";
import { EC2ComponentTemplateDetails } from "./EC2ComponentTemplateDetails";
import { EC2TemplateCreatePage } from "./EC2TemplateCreatePage";
import { RDSComponentTemplateDetails } from "./RDSComponentTemplateDetails";
import { RDSTemplateCreatePage } from "./RDSTemplateCreatePage";
import { selectTemplates, createTemplate, getTemplates, Template, deleteTemplate } from "./templateSlice";

export function TemplatesPage() {
    const params = useParams<{ name: string }>();
    const dispatch = useAppDispatch();
    const history = useHistory();

    const meta = useAppSelector(selectAccountMetaData);
    const templates = useAppSelector(selectTemplates);
    const [templateToDelete, setTemplateToDelete] = useState<Template>();
    const [componentType, setComponentType] = useState<string | undefined>(undefined)
    const [vpc, setVPC] = useState<string | undefined>(undefined)
    const [defaultVPC, setDefaultVPC] = useState<boolean>(false)
    const [defaultSubnet, setDefaultSubnet] = useState<boolean>(false)
    const [defaultPorts, setDefaultPorts] = useState<boolean>(false)
    const [defaultAmi, setDefaultAmi] = useState<boolean>(false)
    const [createNewTemplate, setCreateNewTemplate] = useState<boolean>(false)
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


    useEffect(() => {
        dispatch(fetchAccountMetaData({ productName: params.name }));
        dispatch(getTemplates({ productName: params.name }));
    }, []);
    const { onOpen: onOpenConfirmationModal,
        isOpen: isOpenConfirmationModal,
        onClose: onCloseConfirmationModal,
    } = useDisclosure()

    const submitTemplate = (productName: string, name: string, technology: string, attributes: any) => {
        dispatch(createTemplate({
            productName,
            name,
            technology,
            attributes
        }))
        setCreateNewTemplate(false)

    };

    const dispatchDeleteTemplate = (id: string) => {
        dispatch(deleteTemplate({ productName: params.name, id }))
    };

    const navigateToCreateFromTemplate = (name: string, templateId: string) => {

        history.push(routes.CREATECOMPONENTFROMTEMPLATE.path.replace(':name', name).replace(':templateId', templateId));
    };

    return (
        <div className='Templates container py-3'>
            <NavBar />
            {(templates && !createNewTemplate) &&
                templatesTables()
            }
            {(!componentType && createNewTemplate) &&
                <ComponentTypeSelection
                    onComponentTypeSelected={setComponentType}
                    heading="Getting Started Creating Your Template"
                    subHeading='First, start by selecting the type of component you want to add to your template.' />
            }
            {(componentType === "EC2" && createNewTemplate) &&

                <EC2TemplateCreatePage finishForm={submitTemplate} />
            }
            {(componentType === "RDS" && createNewTemplate) &&

                <RDSTemplateCreatePage finishForm={submitTemplate} />
            }

            <ConfirmationModal actionTitle="Confirm" body={`Do you want to delete ${templateToDelete?.name}?`}
                title="Delete Template"
                isOpen={isOpenConfirmationModal}
                onClose={onCloseConfirmationModal}
                onConfirm={() => {
                    dispatchDeleteTemplate(templateToDelete!.id)
                }}
            />

        </div >
    )


    function templatesTables() {
        return <Box px='20px'>
            <Box>
                <Heading as='h1' size='xl' mb={8} textAlign='center'>
                    Your Component Templates
                </Heading>

                <Button size="lg" onClick={() => {
                    setCreateNewTemplate(true);
                }}>
                    Create
                </Button>
                <Divider marginBottom={'5px'} marginTop={'15px'} />

                <Stack spacing={15}>
                    {templates.map((template: Template) => {
                        if (template.technology === "EC2") {
                            return <EC2ComponentTemplateDetails id={template.id} name={template.name}
                                attributes={template.attributes} onDelete={() => {

                                    onOpenConfirmationModal();
                                    setTemplateToDelete(template);
                                }}
                                createComponent={() => {
                                    navigateToCreateFromTemplate(params.name, template.id);
                                }}
                            />;
                        } if (template.technology === "RDS") {
                            return <RDSComponentTemplateDetails id={template.id} name={template.name}
                                attributes={template.attributes} onDelete={() => {

                                    onOpenConfirmationModal();
                                    setTemplateToDelete(template);
                                }}
                                createComponent={() => {
                                    navigateToCreateFromTemplate(params.name, template.id);
                                }}
                            />;
                        }
                        else {
                            return <div></div>;
                        }
                    })}


                </Stack>
            </Box>

        </Box>;
    }
}