import { ChevronRightIcon ,ChevronDownIcon} from '@chakra-ui/icons'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    Button,
    TableContainer,
    InputGroup,
    Input,
    InputRightElement,
    Icon,
    Link,
  } from '@chakra-ui/react'
import React, { useState } from 'react'
import ModalForm from '../../components/Modal'
import { search } from '../../images'
import AccountPage from './Account'
import {AddIcon} from '@chakra-ui/icons';
import { Account, fetchAccounts, selectAccountState, } from './accountSlice'
import { useAppSelector } from '../../app/hooks'

export const AccountList = ()=>{
    const [open, isOpen] = useState<boolean>(false);
    const [expanded, setExpanded] = useState<string[]>([]);
    const account: Account[] = useAppSelector(selectAccountState);
    console.log('account is =====', account);
    

    const [data, setData] = useState<any[]>([{
        id:'497487485',
        name:'AlbeSan',
        region:'5 +Region',
        status:'Lorem ipsum',
    },
    {
        id:'497487485',
        name:'AlbeSan',
        region:'5 +Region',
        status:'Lorem ipsum',
    },
{
        id:'497487485',
        name:'AlbeSan',
        region:'5 +Region',
        status:'Lorem ipsum',
    }]);

    const [cols, setCols] = useState<any>({
        id:'AWS Account ID',
        name:'Nick Name',
        region:'Region',
        status:'Status',
    });

    const toggleAccountForm = ()=>{
        isOpen(!open);
    }

    const loadProducts = (data:any)=>{
        if(expanded.includes(data.id)){
            setExpanded(expanded.filter(e=>e!==data.id));
        }else{
            setExpanded(expanded.concat(data.id))
        }
    }

    return (

        <div className='inline-content'>
             <ModalForm 
                body={<AccountPage />}
                title="Create New Account"
                isOpen={open}
                actionTitle="Create New Account"
                onClose ={toggleAccountForm}
                onConfirm={() => {
                }}
            />
            <div className='block'>
                <div className='dib w-50'>   <InputGroup size='md'>
                    <Input
                        pr='4.5rem'
                        type={'text'}
                        placeholder='Search'
                    />
                    <InputRightElement width='4.5rem'>
                      <img src={search} alt='' />
                    </InputRightElement>
                    </InputGroup>
                </div>
                <div className='dib right w-50'> 
                    <Button variant='outline' className='primary' onClick={toggleAccountForm}><AddIcon mr={2} /> Add account</Button>
                </div>
            </div>
            <TableContainer>
            <Table variant='simple'>
                <Thead>
                <Tr>
                    <Th></Th>
                    {Object.keys(cols).map(key=>(
                        <Th key={`col_${key}`}>{cols[key]}</Th>
                    ))}
                </Tr>
                </Thead>
                <Tbody>
                    {data.map((item,index)=>(
                        <React.Fragment  key={`row_${index}`}>
                            <Tr>
                                <Td className={expanded.includes(item.id) ? 'bottom-border-0':''}><Icon className='link-icon' onClick={()=>loadProducts(item)}  as={expanded.includes(item.id) ? ChevronDownIcon: ChevronRightIcon} /></Td>
                                {Object.keys(cols).map(key=>(
                                    <Td className={expanded.includes(item.id) ? 'bottom-border-0':''} key={`row_${index}_col_${key}`}>{item[key]}</Td>
                                ))}
                            </Tr>

                            {expanded.includes(item.id) && (
                                <Tr>
                                    <Td textAlign={'right'} colSpan={Object.keys(cols).length+1} className="top-border-0">
                                          <Button className='secondary' variant='ghost'>
                                          + Add a new product
                                            </Button>
                                        <Table variant='simple'>
                                            <Thead>
                                                <Tr>
                                                    <Th>Name</Th>
                                                    <Th>Account</Th>
                                                    <Th>Region</Th>
                                                    <Th>Environments</Th>
                                                </Tr>
                                            </Thead>
                                            <Tbody>
                                                <Tr>

                                                </Tr>
                                            </Tbody>
                                        </Table>
                                    </Td>
                                </Tr>
                            )}
                        </React.Fragment>
                    ))}
                </Tbody>
                {/* <Tfoot>
                <Tr>
                    <Th>To convert</Th>
                    <Th>into</Th>
                    <Th isNumeric>multiply by</Th>
                </Tr>
                </Tfoot> */}
            </Table>
            </TableContainer>
        </div>
    )
}