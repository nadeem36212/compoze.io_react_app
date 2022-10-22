import { Flex } from "@chakra-ui/react";
import { CompozeFormOption } from "../../../components/form/CompozeFormOption";
import FormOption from "../../../components/form/FormSelectOption";

interface AccountOptions {
    accountOptions: CompozeFormOption[];
    onChange: (event: any) => void;
}
export default function SelectAccount(props: AccountOptions): JSX.Element {
    return (
        <Flex py={4}>
            <Flex py={10}>
                <FormOption
                    label='Which account would you like to use?'
                    placeHolder='AWS Account'
                    helperText='If you do not see an account, create a new one in the account page'
                    options={props.accountOptions}
                    onChange={props.onChange}
                />
            </Flex>
        </Flex>
    )

}