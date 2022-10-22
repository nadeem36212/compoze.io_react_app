import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import { CompozeFormOption } from "../../../../components/form/CompozeFormOption"
import { fetchAccountMetaData, selectAccountMetaData } from "../../../account/accountSlice"
import CreateForm from "../../../products/create/CreateForm"
import { getTemplates, selectTemplates, Template } from "../../../templates/templateSlice"
import { Subnet } from "../ec2/EC2ComponentCreation"
import SelectAMIName from "../selections/AMISelection"
import PortSelection from "../selections/PortSelection"
import SelectComponentName from "../selections/SelectComponentName"
import SelectionForm from "../selections/SelectionForm"
import SubnetSelection from "../selections/SubnetSelection"
import VolumeSelectionSize from "../selections/VolumeSizeSelection"
import VPCSelection from "../selections/VPCSelection"

interface EC2ComponentCreationProps {
    finishForm: () => void
    setName: (name: string) => void
    setAttributes: (attributes: any) => void
    template: Template
}

export default function EC2FromTemplateCreationPage({ finishForm, setName, setAttributes, template }: EC2ComponentCreationProps) {
    const meta = useAppSelector(selectAccountMetaData);
    const dispatch = useAppDispatch();
    const params = useParams<{ name: string, templateId: string }>();
    const templates = useAppSelector(selectTemplates);
    const [selectedVpcSubents, setSelectedVpcSubents] = useState<Subnet[]>([])
    const [vpc, setVPC] = useState<CompozeFormOption>()
    const [subnet, setSubnet] = useState<Subnet>()
    const [ports, setPorts] = useState<string>()
    const [key, setKey] = useState<CompozeFormOption>()
    const [volume, setVolume] = useState<string>()
    const [ami, setAmi] = useState<CompozeFormOption>()
    const [instanceTypeIdentifier, setInstanceTypeIdentifier] = useState<CompozeFormOption>()

    useEffect(() => {
        dispatch(fetchAccountMetaData({ productName: params.name }));
        dispatch(getTemplates({ productName: params.name }));
    }, []);

    //select template by templateid from templates

    const templateVPCId = template.attributes['vpcId']
    const templateSubnetId = template.attributes['subnetId']
    const templateAvailabilityZone = template.attributes['availabilityZone']
    const templatePorts = template.attributes['ports']
    const templateKeyName = template.attributes['keyName']
    const templateAMI = template.attributes['ami']
    const templateVolumeSize = template.attributes['volumeSize']
    const templateInstanceTypeId = template.attributes['instanceTypeIdentifier']

    const vpcOptions: CompozeFormOption[] = meta ? meta.vpcs.map((vpc: any) => { return { value: vpc.vpcId, displayName: vpc.vpcName } }) : []

    const vpcSelection = <VPCSelection vpcOptions={vpcOptions} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedOption = vpcOptions.find(option => option.displayName === event.target.value)!
        const subnets = meta.vpcs.find((vpc: any) => vpc.vpcId === selectedOption.value)!.subnets
        setVPC(selectedOption)
        setSelectedVpcSubents(subnets)

    }} />

    const subnetOptions: CompozeFormOption[] = selectedVpcSubents ? selectedVpcSubents.map(subnet => { return { value: subnet.subnetId, displayName: subnet.subnetName } }) : []

    const subnetSelection = <SubnetSelection subnetOptions={subnetOptions} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedOption = subnetOptions.find(option => option.displayName === event.target.value)!
        //find subnet from selectedVpcSubents
        const subnet = selectedVpcSubents.find((subnet: any) => subnet.subnetId === selectedOption.value)!
        setSubnet(subnet)
    }} />

    const keyOptions: CompozeFormOption[] = meta ? meta.keyNames.map((key: any) => { return { value: key.keyName, displayName: key.keyName } }) : []

    const selectComponentName = <SelectComponentName label="What would you like to name your EC2 Instance?"
        setName={setName} />

    const amiOptions: CompozeFormOption[] = meta ? meta.amis.map((ami: any) => { return { value: ami.amiId, displayName: ami.name } }) : []
    const instanceTypeOptions: CompozeFormOption[] = meta ? meta.instanceTypes.map((instanceType: any) => { return { value: instanceType.instanceType, displayName: instanceType.instanceType } }) : []
    const steps = []
    steps.push({ label: 'Provide a Name', content: selectComponentName })

    if (!templateVPCId) {
        steps.push({ label: 'Select a VPC', content: vpcSelection })
    }
    if (!templateSubnetId) {
        steps.push({ label: 'Select a Subnet', content: subnetSelection })
    }

    if (!templatePorts) {
        steps.push({ label: 'Ports', content: <PortSelection setPorts={setPorts} /> })
    }

    if (!templateKeyName) {
        steps.push({
            label: 'Key Name', content: <SelectionForm label="Which key name would you like to use?"
                placeHolder="EC2 Key name"
                options={keyOptions}
                helperText="This is the key you will use to ssh into your instance"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const selectedOption = keyOptions.find(option => option.displayName === event.target.value)!
                    setKey(selectedOption)
                }} />
        })
    }
    if (!templateAMI) {
        steps.push({
            label: 'AMI', content: <SelectAMIName amiOptions={amiOptions} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const selectedOption = amiOptions.find(option => option.displayName === event.target.value)!
                setAmi(selectedOption)
            }} />
        })
    }
    if (!templateVolumeSize) {
        steps.push({ label: 'Volume', content: <VolumeSelectionSize onChange={setVolume} /> })
    }
    if (!templateInstanceTypeId) {
        steps.push({
            label: 'Instance Size', content: <SelectionForm label="Which instance type would you like to use?"
                placeHolder="Instance Type"
                options={instanceTypeOptions}
                helperText="Confirm pricing for your instance type to ensure you do not exceed your budget"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const selectedOption = instanceTypeOptions.find(option => option.displayName === event.target.value)!
                    setInstanceTypeIdentifier(selectedOption)
                }} />
        })
    }

    return (
        <CreateForm heading="Create Your EC2 Instance" steps={steps} finishForm={() => {
            setAttributes({
                singleDeployment: "true",
                vpcId: templateVPCId ?? vpc!.value,
                subnetId: templateSubnetId ?? subnet?.subnetId,
                availabilityZone: templateAvailabilityZone ?? subnet?.availabilityZone,
                numberOfInstances: "1",
                ports: templatePorts ?? ports,
                ami: templateAMI ?? ami?.value,
                keyName: templateKeyName ?? key?.value,
                volumeSize: templateVolumeSize ?? volume,
                instanceTypeIdentifier: templateInstanceTypeId ?? instanceTypeIdentifier!.value,
            })
            finishForm()
        }} />
    )
}

// numberOfInstances, DEFAULT 1
// vpcId, stubbed
// subnetId, stubbed
// availabilityZone, to be stubbed
// ports, 
// keyName,
// ami,
// volumeSize,
// singleDeployment: String(!singleDeployment),
// instanceTypeIdentifier