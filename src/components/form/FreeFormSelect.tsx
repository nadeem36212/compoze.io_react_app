import { FormControl, FormHelperText, FormLabel, Input, Select } from "@chakra-ui/react";
import { HTMLInputTypeAttribute } from "react";

interface FreeFormOptionProps {
    label: string;
    placeHolder: string;
    helperText?: string;
    type?: HTMLInputTypeAttribute;
    onChange: (event: any) => void;
}
export default function FreeFormSelect(props: FreeFormOptionProps) {
    const type = props.type || 'text';
    return (

        <FormControl size={'lg'}>
            <FormLabel fontSize={'xlg'}>{props.label}</FormLabel>
            <Input fontSize={'lg'} placeholder={props.placeHolder} type={type} onChange={props.onChange} />
            {props.helperText && <FormHelperText fontSize={'lg'}>{props.helperText}</FormHelperText>}
        </FormControl>
    )
}
