import { Flex } from "@chakra-ui/react"
import FreeFormSelect from "../../../../components/form/FreeFormSelect"

interface PortSelectionProps {
    setPorts: (value: string) => void
}
export default function PortSelection(props: PortSelectionProps): JSX.Element {
    return (
        <Flex py={4}>
            <Flex py={10}>
                <FreeFormSelect
                    label='Which ports would you like to open on your instance?'
                    helperText='Please provide a comma separated list of ports'
                    placeHolder='Comma separated ports'
                    onChange={(e: any) => {
                        props.setPorts(e.target.value)
                    }}
                />
            </Flex>
        </Flex>
    )

    //What would you like to name your RDS Component?
}