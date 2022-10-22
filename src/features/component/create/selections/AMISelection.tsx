import { Flex } from "@chakra-ui/react"
import { CompozeFormOption } from "../../../../components/form/CompozeFormOption";
import FormOption from "../../../../components/form/FormSelectOption";

interface SelectAMINameProps {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    amiOptions: CompozeFormOption[];

}
export default function SelectAMIName(props: SelectAMINameProps): JSX.Element {
    return (
        <Flex py={4}>
            <Flex py={10}>
                <FormOption
                    label='Which AMI would you like to use?'
                    placeHolder='AMI ID'
                    helperText='This is the base Amazon Machine Image Compoze will use to create your instance'
                    options={props.amiOptions}
                    onChange={props.onChange}
                />
            </Flex>
        </Flex>
    )

    //What would you like to name your RDS Component?
}