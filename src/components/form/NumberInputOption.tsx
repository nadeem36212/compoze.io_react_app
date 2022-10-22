import { FormControl, FormHelperText, FormLabel, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select } from "@chakra-ui/react";

interface NumberSelectOptionProps {
    label: string;
    helperText?: string;
    min: number;
    max: number;
    onChange: any
}
export default function NumberFormOption(props: NumberSelectOptionProps) {
    return (
        <FormControl>
            <FormLabel fontSize={'xlg'}>{props.label}</FormLabel>
            <NumberInput fontSize={'lg'} min={props.min} max={props.max} onChange={props.onChange}>
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
            {props.helperText && <FormHelperText fontSize={'lg'}>{props.helperText}</FormHelperText>}
        </FormControl>
    )
}
