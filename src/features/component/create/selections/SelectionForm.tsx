import { Flex } from "@chakra-ui/react";
import { CompozeFormOption } from "../../../../components/form/CompozeFormOption";
import FormOption from "../../../../components/form/FormSelectOption";

interface SelectionProps {
    options: CompozeFormOption[];
    label: string
    placeHolder: string
    helperText: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

}
export default function SelectionForm(props: SelectionProps): JSX.Element {
    return (
        <Flex py={4}>
            <Flex py={10}>
                <FormOption
                    label={props.placeHolder}
                    placeHolder={props.label}
                    helperText={props.helperText}
                    options={props.options}
                    onChange={props.onChange}
                />
            </Flex>
        </Flex>
    )
}