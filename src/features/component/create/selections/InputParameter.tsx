import { Flex } from "@chakra-ui/react"
import { HTMLInputTypeAttribute } from "react"
import FreeFormSelect from "../../../../components/form/FreeFormSelect"

interface InputParameterProps {
    onChange: (value: string) => void
    label: string
    helperText: string
    placeHolder: string
    type: HTMLInputTypeAttribute;

}
export default function InputParameter(props: InputParameterProps): JSX.Element {
    return (
        <Flex py={4}>
            <Flex py={10}>
                <FreeFormSelect
                    label={props.label}
                    helperText={props.helperText}
                    placeHolder={props.placeHolder}
                    type={props.type}
                    onChange={(e: any) => {
                        props.onChange(e.target.value)
                    }}
                />
            </Flex>
        </Flex>
    )

    //What would you like to name your RDS Component?
}