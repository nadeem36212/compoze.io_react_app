import { Box, Button, Heading } from "@chakra-ui/react";
import { CompozeFormOption } from "../../../components/form/CompozeFormOption";
import { Account } from "../../account/accountSlice";

interface ConfirmProductCreateProps {
    name: string;
    account: Account;
    region: CompozeFormOption;
    environments: string;
    onSubmit: (account: Account, region: CompozeFormOption, name: string) => void;
}

export default function ConfirmProductCreate(props: ConfirmProductCreateProps) {

    return (
        <div className='ConfirmCreateProduct container py-3'>
            <Box >
                <Heading as='h1' size='xl' mb={8} textAlign='center'>
                    Review Product To Create
                </Heading>

                <div>
                    <div>
                        <div>Name: {props.name}</div>
                        <div>Account: {props.account.name}</div>
                        <div>Region: {props.region.displayName}</div>
                        <div>Environments: {props.environments}</div>
                    </div>
                </div>
                <Button onClick={() => {
                    props.onSubmit(props.account, props.region, props.name)
                }}>
                    Create
                </Button>
            </Box>
        </div >
    );
}