import { Flex } from "@chakra-ui/react";
import { CompozeFormOption } from "../../../../components/form/CompozeFormOption";
import FormOption from "../../../../components/form/FormSelectOption";

interface VPCSelectionProps {
    vpcOptions: CompozeFormOption[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

}
export default function VPCSelection(props: VPCSelectionProps): JSX.Element {
    return (
        <Flex py={4}>
            <Flex py={10}>
                <FormOption
                    label='Which VPC would you like to deploy your EC2 Instance into?'
                    placeHolder='VPC ID'
                    helperText="This is the VPC that your EC2 Instance will be deployed into"
                    options={props.vpcOptions}
                    onChange={props.onChange}
                />
            </Flex>
        </Flex>
    )
}
