import { Button, 
  Spinner, 
  useInterval, 
  Input, 
  InputGroup, 
  InputRightElement, 
  Heading, 
  Stack, 
  Text,
   } from '@chakra-ui/react';
import './ProductDetail.css'
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { DataTable } from '../../../components/Table';
import NavBar from '../../../navigation/navbar';
import routes from '../../../routes';
import { Component } from '../../component/componentSlice';
import { fetchProductDetails, selectComponents } from './productDetailsSlice';
import { search } from '../../../images';
import DeleteIcon from '../../../images/Icons.svg'
import SettingButton from '../../../images/Button.png'
import OpenBox from '../../../images/openbox.svg'
import AddOpenBox from '../../../images/openbox1.svg'
import logo  from '../../../images/product-detail-logo.svg'
import arrow  from '../../../images/left-arrow.svg'
import ReactPaginate from 'react-paginate';

export default function ProductDetailsPage() {
  const history = useHistory();
  const params = useParams<{ name: string }>();
  const dispatch = useAppDispatch();
  const [pageCount, setPageCount] = useState(5);

  const [data, setData] = useState<any[]>([{
    img:logo,
    name:'Lorem ipsum',
    technology:'Lorem ipsum',
    status:'Lorem ipsum',
    dash:'...',
},
{
  img:logo,
  name:'Lorem ipsum',
  technology:'Lorem ipsum',
  status:'Lorem ipsum',
  dash:'...', 
},
{
  img:logo,
  name:'Lorem ipsum',
  technology:'Lorem ipsum',
  status:'Lorem ipsum',
  dash:'...', 
},
{
  img:logo,
  name:'Lorem ipsum',
  technology:'Lorem ipsum',
  status:'Lorem ipsum',
  dash:'...', 
}]);


  const fetchedComponents: Component[] = useAppSelector(selectComponents);

  useEffect(() => {
    dispatch(fetchProductDetails({ productName: params.name }));
  }, []);

  const navigateToCreateComponent = (name: string) => {

    history.push(routes.CREATECOMPONENT.path.replace(':name', name));
  };
  const navigateToProductTemplates = (name: string) => {

    history.push(routes.TEMPLATES.path.replace(':name', name));
  };

  const navigateToComponentDetails = (productName: string, componentName: string) => {

    history.push(routes.COMPONENTDETAILS.path.replace(':productName', productName).replace(':componentName', componentName));

  };
  // function Items({ currentItems}){
  //   return (
  //     <div className="items">
  //     {currentItems && currentItems.map((item) => (
  //       <div>
  //         <h3>Item #{item}</h3>
  //       </div>
  //     ))}
  //       </div>
  //   );
  // }
  const columns = React.useMemo(
    () => [
      {
        Header: '',
        accessor: 'img',
        Cell: tableProps => (
          <img
            src={tableProps.row.original.img}
            width={25}
            height={25}
            alt='Logo'
          />
        )
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'VPC Service',
        accessor: 'technology',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
      {
        Header: '',
        accessor: 'dash',
        Cell: () => (
          <div style={{flexDirection:"row", display:"flex", gap:3}}>
          <div style={{width:4, height:4, borderRadius:50, backgroundColor:"#423B35"}}></div>
          <div style={{width:4, height:4, borderRadius:50, backgroundColor:"#423B35"}}></div>
          <div style={{width:4, height:4, borderRadius:50, backgroundColor:"#423B35"}}></div>
          </div>
        )
      },
    ],
    []
  );
  useInterval(() => {
    dispatch(fetchProductDetails({ productName: params.name }));
  }, 5000);
// console.log("fetchProductDetails", fetchProductDetails);

  return (
    <div className='App container main-container'  >
      {/* <NavBar /> */}
      <div className='dlt-btn-container'>
        <div >
      <img src={arrow}  />
        </div>
        <Stack spacing={3} direction='row' align='center'>
        <Button  
        type='button' 
        leftIcon={<div style={{marginRight:-12, marginBottom:2}}>
          <img src={DeleteIcon} width={32} height={32} alt=''/></div>}>
        Delete account</Button>
      
        {/* <Button type='button'  > */}
          <img src={SettingButton} height={36} width={36}/>
          {/* </Button> */}
        </Stack>
      </div>
      <div className='  py-3' style={{backgroundColor: ""}} >
        {fetchedComponents ? (
          <div className='product-detail'>
            <div className='side-container'>

      <div className='account-container'>
          <div style={{backgroundColor:""}}>
            <Text className='heading'>Account Information</Text>
            </div>
            <div >
            <Text className='content'>Nick Name: Lorem Ipsum</Text>
            </div>
            <div >
            <Text className='content2'>AWS Account ID: 1058790878</Text>
            </div>
            <div >
            <Text className='content2'>Monitor Compliance: Lorem Ipsum</Text>
            </div>
            <div >
            <Text className='content2'>Custom Domain: 205.50.0.0.54</Text>
            </div>
            <div >
            <Text className='content2'>Region: Lorem Ipsum</Text>
            </div>
      </div>
      <div className='product-container'>
            <div style={{backgroundColor:""}}>
            <Text className='heading'>Product information</Text>
            </div>
            <div>
            <Text className='content'>Name: Lorem Ipsum</Text>
            </div>
            <div >
            <Text className='content2'>Account: 1058790878</Text>
            </div>
            <div >
            <Text className='content2'>Region: 205.50.0.0.54</Text>
            </div>
            <div >
            <Text className='content2'>Environments: Lorem Ipsum</Text>
            </div>
            
      </div>

      </div>
          <div className='inline-content-product-detail '>
          <div style={{flexDirection:"row", display:"flex", }} className="py-50">
            
                  <div style={{marginRight:20, marginTop:5}}>
                  <Heading textAlign='center' className='poroduct-detail-heading' 
                  style={{fontSize:24, fontWeight:600,}}>
                    {`Components`}
                  </Heading>
                  </div>
                  
            <div className='dib w-25'>   <InputGroup size='md'>
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
                  
                </div>
                <div style={{ display:"flex", 
                float:"right", marginBottom:20, 
                marginTop:20, width:"57%",}}>
                  <Stack spacing={3} direction='row' align=''>

                  <Button variant='outline' 
                  borderColor='#EA6E15' 
                  width='225px' 
                  height='40px' 
                  leftIcon={<div style={{marginRight:-12, marginBottom:2}}>
                    <img src={AddOpenBox} width={34} height={34} alt=''/></div>}>
                    <Text className='btn-text'>
                    Add Component RDS
                    </Text>
                    </Button>

                  <Button variant='solid' 
                  type='button'w='32%' 
                  bgColor='#749BF8' 
                  height='40px' leftIcon={<div style={{marginRight:-10, marginBottom:2}}>
                    <img src={OpenBox} width={34} height={34} alt=''/></div>}>
                    <Text className='btn2-text' >Add component EC2
                    </Text>
                    </Button>

                  <Button variant='solid' 
                  type='button'w='32%' 
                  height='40px' 
                  leftIcon={<div style={{marginRight:-12, marginBottom:2}}><img src={OpenBox} width={34} height={34} alt=''/></div>}>
                    <Text className='btn2-text'>
                      Create from template
                    </Text>
                    </Button>

                  </Stack>
                </div>
                
                  <div>
            <DataTable
              // title={`${params.name} Components`}
              columns={columns}
              data={data}
              onClick={(row) => {
                navigateToComponentDetails(params.name, row.original.name);
              }}
            />
            
            </div>
          
            {/* <Button
              className='createComponentButton'
              type='button'
              w='10%'
              onClick={() => navigateToCreateComponent(params.name)}
            >
              Create
            </Button>
            <Button
              alignContent={'center'}
              className='createTemplatesButton'
              type='button'
              marginLeft={'10px'}
              w='10%'
              onClick={() => navigateToProductTemplates(params.name)}
            >
              Templates
            </Button> */}
<div className='pagination-div'>
         <ReactPaginate
         nextLabel=">"
        //  onPageChange={handlePageClick}
        className='pagination'
         pageRangeDisplayed={3}
         marginPagesDisplayed={2}
         pageCount={pageCount}
         previousLabel="<"
         pageClassName="page-item"
         pageLinkClassName="page-link"
        //  previousClassName="page-item"
        //  previousLinkClassName="page-link"
        //  nextClassName="page-item"
        //  nextLinkClassName="page-link"
        //  breakLabel="..."
        //  breakClassName="page-item"
        //  breakLinkClassName="page-link"
        //  containerClassName="pagination"
       
         activeClassName="active"
      />
      </div>

          </div>
          </div>
        ) : (
          <div>
            Loading <Spinner />
          </div>
         )} 
         
      </div>
    </div >
  );
}


