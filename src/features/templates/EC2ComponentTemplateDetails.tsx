import { TableContainer, Heading, TableCaption, Thead, Table, Tr, Th, Tbody, Td, Tfoot, propNames, Button } from "@chakra-ui/react";
import { Card } from "../../components/Card";

interface EC2ComponentTemplateProps {
    id: string;
    name: string;
    attributes: any;
    onDelete(): void;
    createComponent(): void;
}
export function EC2ComponentTemplateDetails({ id, name, attributes, onDelete, createComponent }: EC2ComponentTemplateProps): JSX.Element {
    return (
        <Card>
            <TableContainer>
                <Heading size='lg' mb={8} textAlign='center'>
                    {name} EC2 Template
                </Heading>
                <Table variant='simple' colorScheme='orange'>
                    <TableCaption>EC2 Template</TableCaption>
                    <Thead>
                        <Tr backgroundColor={'brand.orange'}>
                            <Th fontSize={'lg'}>Attribute</Th>
                            <Th fontSize={'lg'}>Is Defaulted</Th>
                            <Th fontSize={'lg'} isNumeric>Defaulted Value</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>Amazon Machine Image</Td>
                            <Td>{String(attributes.ami !== undefined)}</Td>
                            <Td isNumeric>{attributes.ami ?? ''}</Td>
                        </Tr>
                        <Tr>
                            <Td>Number of Instances</Td>
                            <Td>{String(attributes.numberOfInstances !== undefined)}</Td>
                            <Td isNumeric>{attributes.numberOfInstances ?? ''}</Td>
                        </Tr>
                        <Tr>
                            <Td>Instance Type</Td>
                            <Td>{String(attributes.instanceTypeIdentifier !== undefined)}</Td>
                            <Td isNumeric>{attributes.instanceTypeIdentifier ?? ''}</Td>
                        </Tr>
                        <Tr>
                            <Td>VPC</Td>
                            <Td>{String(attributes.vpcId !== undefined)}</Td>
                            <Td isNumeric>{attributes.vpcId ?? ''}</Td>
                        </Tr>
                        <Tr>
                            <Td>Subnet</Td>
                            <Td>{String(attributes.subnetId !== undefined)}</Td>
                            <Td isNumeric>{attributes.subnetId ?? ''}</Td>
                        </Tr>
                        <Tr>
                            <Td>Availability Zone</Td>
                            <Td>{String(attributes.availabilityZone !== undefined)}</Td>
                            <Td isNumeric>{attributes.availabilityZone ?? ''}</Td>
                        </Tr>
                        <Tr>
                            <Td>Volume Size</Td>
                            <Td>{String(attributes.volumeSize !== undefined)}</Td>
                            <Td isNumeric>{attributes.volumeSize ?? ''}</Td>
                        </Tr>
                        <Tr>
                            <Td>Ports</Td>
                            <Td>{String(attributes.ports !== undefined)}</Td>
                            <Td isNumeric>{attributes.ports ?? ''}</Td>
                        </Tr>
                        <Tr>
                            <Td>SingleDeployment</Td>
                            <Td>{String(attributes.singleDeployment !== undefined)}</Td>
                            <Td isNumeric>{attributes.singleDeployment ?? ''}</Td>
                        </Tr>
                        <Tr>
                            <Td>Key Name</Td>
                            <Td>{String(attributes.keyName !== undefined)}</Td>
                            <Td isNumeric>{attributes.keyName ?? ''}</Td>
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