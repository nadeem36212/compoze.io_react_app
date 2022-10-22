import { Flex } from "@chakra-ui/react"
import FreeFormSelect from "../../../../components/form/FreeFormSelect"

interface SelectComponentNameProps {
    setName: (value: string) => void
    label: string
}
export default function SelectComponentName(props: SelectComponentNameProps): JSX.Element {
    return (
        <Flex py={4}>
            <Flex py={10}>
                <FreeFormSelect
                    label={props.label}
                    helperText='No special characters or spaces'
                    placeHolder='Component Name'
                    onChange={(e: any) => {
                        props.setName(e.target.value)
                    }}
                />
            </Flex>
        </Flex>
    )

    //What would you like to name your RDS Component?
}