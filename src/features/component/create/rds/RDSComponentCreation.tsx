import { Flex } from "@chakra-ui/react"
import { useState } from "react"
import FormOption from "../../../../components/form/FormSelectOption"
import FreeFormSelect from "../../../../components/form/FreeFormSelect"
import NumberFormOption from "../../../../components/form/NumberInputOption"
import CreateForm from "../../../products/create/CreateForm"
import { Template } from "../../../templates/templateSlice"

interface RDSComponentCreationProps {
    finishForm: () => void
    setName: (name: string) => void
    setAttributes: (attributes: any) => void
    template?: Template

}
export default function RDSComponentCreation(props: RDSComponentCreationProps) {
    const [databaseType, setDatabaseType] = useState('')
    const [instanceType, setInstanceType] = useState('')
    const [storageSize, setStorageSize] = useState('')

    const templateDatabaseType = props.template ? props.template.attributes['databaseType'] : undefined
    const templateInstanceType = props.template ? props.template.attributes['instanceType'] : undefined
    const templateStorageSize = props.template ? props.template.attributes['storageSize'] : undefined

    const databaseTypeOptions = [{ displayName: "Postgres", value: "POSTGRES" }, { displayName: "MySQL", value: "MYSQL" }];
    const selectDatabaseType = (
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
    );

    const instanceTypeOptions = [{ displayName: "t3.micro (~$13.00 / month)", value: "t3.micro" }, { displayName: "t3.small (~$26.00 / month)", value: "t3.small" }, { displayName: "t3.medium (~$52.00 / month)", value: "t3.medium" }, { displayName: "t3.large (~$105.00 / month)", value: "t3.large" }, { displayName: "t3.xlarge (~$209.00 / month)", value: "t3.xlarge" }];
    const selectInstanceType = (
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
    );

    const selectStorageSize = (
        <Flex py={4}>
            <Flex py={10}>
                <NumberFormOption
                    label='How much disk storage do you want allocated for you instance?'
                    helperText='The minimum is 20 GiB and the maximum is 16,384 GiB (in Gigs)'
                    min={20}
                    max={16384}
                    onChange={(valueAsString: string, valueAsNumber: number) => {

                        setStorageSize(valueAsString)
                    }}
                />
            </Flex>
        </Flex>
    );
    const inputComponentName = (
        <Flex py={4}>
            <Flex py={10}>
                <FreeFormSelect
                    label='What would you like to name your RDS Component?'
                    helperText='No special characters or spaces'
                    placeHolder='Component Name'
                    onChange={(e: any) => {
                        props.setName(e.target.value)
                    }}
                />
            </Flex>
        </Flex>
    );

    let steps = [{ label: 'Provide a Name', content: inputComponentName },
    ];
    if (props.template) {

        if (!templateDatabaseType) {
            steps.push({
                label: 'Select Database Engine',
                content: selectDatabaseType
            })
        }
        if (!templateInstanceType) {
            steps.push({ label: 'Instance Size', content: selectInstanceType },)
        }
        if (!templateStorageSize) {
            steps.push({ label: 'Storage Size', content: selectStorageSize })
        }
    } else {
        steps.push({ label: 'Select Database Engine', content: selectDatabaseType })
        steps.push({ label: 'Instance Size', content: selectInstanceType },)
        steps.push({ label: 'Storage Size', content: selectStorageSize })
    }


    return (
        <CreateForm heading="Create Your RDS Component" steps={steps} finishForm={() => {
            props.setAttributes({
                databaseType: templateDatabaseType ?? databaseType,
                instanceType: templateInstanceType ?? instanceType,
                storageSize: templateStorageSize ?? storageSize
            })
            props.finishForm()
        }} />
    )
}