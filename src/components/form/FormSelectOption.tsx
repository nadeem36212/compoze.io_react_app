import { FormControl, FormHelperText, FormLabel, Select } from "@chakra-ui/react";
import { CompozeFormOption } from "./CompozeFormOption";

interface FormSelectOptionProps {
    label: string;
    placeHolder: string;
    helperText?: string;
    options: CompozeFormOption[];
    onChange: (event: any) => void;
}
export default function FormOption(props: FormSelectOptionProps) {
    return (
        <FormControl size={'lg'}>
            <FormLabel fontSize={'xlg'}>{props.label}</FormLabel>
            <Select fontSize={'lg'}
                placeholder={props.placeHolder}
                onChange={props.onChange}>
                {props.options.map((option, index) => (
                    <option key={option.value}>{option.displayName}</option>
                ))}
            </Select>
            {props.helperText && <FormHelperText fontSize={'lg'}>{props.helperText}</FormHelperText>}
        </FormControl>
    )
}
