import { Flex } from "@chakra-ui/react"
import NumberFormOption from "../../../../components/form/NumberInputOption"

interface VolumeSelectProps {
    onChange: (value: string) => void
}

export default function VolumeSelectionSize(props: VolumeSelectProps) {
    return (
        <Flex py={4}>
            <Flex py={10}>
                <NumberFormOption
                    label='How much disk storage do you want allocated for you instance?'
                    helperText='The minimum is 1 GiB and the maximum is 16,384 GiB (in Gigs)'
                    min={1}
                    max={16384}
                    onChange={(valueAsString: string, valueAsNumber: number) => {

                        props.onChange(valueAsString)
                    }}
                />
            </Flex>
        </Flex>
    )
}