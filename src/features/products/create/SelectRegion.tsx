import { Flex } from "@chakra-ui/react";
import { CompozeFormOption } from "../../../components/form/CompozeFormOption";
import FormOption from "../../../components/form/FormSelectOption";

interface RegionOptions {
    regionOptions: CompozeFormOption[];
    onChange: (event: any) => void;
}
export default function SelectRegion(props: RegionOptions): JSX.Element {
    return (
        <Flex py={4}>
            <Flex py={10}>
                <FormOption
                    label='Which region would you like to use?'
                    placeHolder='Region'
                    helperText='Note: If you do not see the region you are looking for you can initialize a new region, for this account, via the account.region.init CLI command'
                    options={props.regionOptions}
                    onChange={props.onChange}
                />
            </Flex>
        </Flex>
    )

}