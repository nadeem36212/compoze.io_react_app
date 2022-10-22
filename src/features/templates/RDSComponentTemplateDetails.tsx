import { TableContainer, Heading, TableCaption, Thead, Table, Tr, Th, Tbody, Td, Tfoot, propNames, Button } from "@chakra-ui/react";
import { Card } from "../../components/Card";

interface RDSComponentTemplateProps {
    id: string;
    name: string;
    attributes: any;
    onDelete(): void;
    createComponent(): void;
}
export function RDSComponentTemplateDetails({ id, name, attributes, onDelete, createComponent }: RDSComponentTemplateProps): JSX.Element {
    return (
        <Card>
            <TableContainer>
                <Heading size='lg' mb={8} textAlign='center'>
                    {name} RDS Template
                </Heading>
                <Table variant='simple' colorScheme='orange'>
                    <TableCaption>RDS Template</TableCaption>
                    <Thead>
                        <Tr backgroundColor={'brand.orange'}>
                            <Th fontSize={'lg'}>Attribute</Th>
                            <Th fontSize={'lg'}>Is Defaulted</Th>
                            <Th fontSize={'lg'} isNumeric>Defaulted Value</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>Database Engine</Td>
                            <Td>{String(attributes.databaseType !== undefined)}</Td>
                            <Td isNumeric>{attributes.databaseType ?? ''}</Td>
                        </Tr>
                        <Tr>
                            <Td>Instance Type</Td>
                            <Td>{String(attributes.instanceType !== undefined)}</Td>
                            <Td isNumeric>{attributes.instanceType ?? ''}</Td>
                        </Tr>
                        <Tr>
                            <Td>Volume Size</Td>
                            <Td>{String(attributes.storageSize !== undefined)}</Td>
                            <Td isNumeric>{attributes.storageSize ?? ''}</Td>
                        </Tr>                     
                        <Button marginTop={5} size="lg" onClick={onDelete}>
                            Delete
                        </Button>
                        <Button marginTop={5} marginLeft={5} size="lg" fontSize={'2xl'} onClick={createComponent}>
                            Create Component
                        </Button>
                    </Tbody>
                    <Tfoot>

                    </Tfoot>

                </Table>
            </TableContainer>
        </Card>
    );
}