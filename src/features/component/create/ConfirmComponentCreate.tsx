import { Box, Button, Heading } from "@chakra-ui/react";

interface ConfirmComponentCreateProps {
    productName: string;
    name: string;
    technology: string;
    attributes: any
    onSubmit: (productName: string, name: string, technology: string, attributes: any) => void;
}

export default function ConfirmComponentCreate(props: ConfirmComponentCreateProps) {

    return (
        <div className='ConfirmCreateComponent container py-3'>
            <Box >
                <Heading as='h1' size='xl' mb={8} textAlign='center'>
                    {props.name}
                </Heading>

                <div>
                    {Object.entries(props.attributes).map((key, index) => (
                        <div>
                            <div>{key[0].charAt(0).toUpperCase()+ key[0].slice(1)} : {key[1] as string}</div>
                        </div>
                    ))}
                </div>
                <Button onClick={() => {
                    props.onSubmit(props.productName, props.name, props.technology, props.attributes)
                }}>
                    Create
                </Button>
            </Box>
        </div >
    );
}