import { Flex } from "@chakra-ui/react"
import FreeFormSelect from "../../../components/form/FreeFormSelect"

interface EnvironmentSelectionProps {
    setEnvironments: (value: string) => void
}
export default function EnvironmentSelection(props: EnvironmentSelectionProps): JSX.Element {
    return (
        <Flex py={4}>
            <Flex py={10}>
                <FreeFormSelect
                    label='How many environments do you want Compoze to setup for each of your components?'
                    helperText='Please provide a comma separated list of environment names'
                    placeHolder='Comma separated name'
                    onChange={(e: any) => {
                        props.setEnvironments(e.target.value)
                    }}
                />
            </Flex>
        </Flex>
    )

    //What would you like to name your RDS Component?
}