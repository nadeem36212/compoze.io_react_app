import { Flex } from "@chakra-ui/react";
import { CompozeFormOption } from "../../../components/form/CompozeFormOption";
import FreeFormSelect from "../../../components/form/FreeFormSelect";

interface ProductNameProps {
    setName: (event: any) => void;
}
export default function SelectProductName(props: ProductNameProps): JSX.Element {
    return (
        <Flex py={4}>
            <Flex py={10}>
                <FreeFormSelect
                    label='What would you like to name your Product?'
                    helperText='No special characters or spaces'
                    placeHolder='Product Name'
                    onChange={(e: any) => {
                        props.setName(e.target.value)
                    }}
                />
            </Flex>
        </Flex>
    )

}