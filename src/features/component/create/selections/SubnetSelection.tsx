import { Flex } from "@chakra-ui/react";
import { CompozeFormOption } from "../../../../components/form/CompozeFormOption";
import FormOption from "../../../../components/form/FormSelectOption";

interface SubnetSelectionProps {
    subnetOptions: CompozeFormOption[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

}
export default function SubnetSelection(props: SubnetSelectionProps): JSX.Element {
    return (
        <Flex py={4}>
            <Flex py={10}>
                <FormOption
                    label='Which Subnet would you like to deploy your EC2 Instance into?'
                    placeHolder='Subnet ID'
                    helperText="This is the Subnet that your EC2 Instance will be deployed into"
                    options={props.subnetOptions}
                    onChange={props.onChange}
                />
            </Flex>
        </Flex>
    )
}
