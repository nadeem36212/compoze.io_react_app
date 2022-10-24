import React, { useEffect, useState } from 'react';
import './ProductPage.css'
import { Row } from 'react-table';
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { DataTable } from '../../components/Table';
import NavBar from '../../navigation/navbar';
import routes from '../../routes';
import { User, selectUser } from '../auth/authSlice';
import {
  fetchProducts,
  ProductInformation,
  selectProducts,
} from './productSlice';
import { Button, Spinner, Thead, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { search } from '../../images';
import ReactPaginate from 'react-paginate';

export function ProductPage() {
  
  const products: ProductInformation[] = useAppSelector(selectProducts);

  const dispatch = useAppDispatch();
  const user: User = useAppSelector(selectUser)!;
  const history = useHistory();
  const [pageCount, setPageCount] = useState(5);
  const [data, setData] = useState<any[]>([{
    name:'Lorem Ipsum',
    accountId:'Lorem Ipsum',
    region:'Region',
    environments:"Lorem Ipsum"
}]);
  useEffect(() => {
    
    dispatch(fetchProducts({ orgId: user.orgId! }));
  }, []);

  const navigateToDetailsPage = (row: Row<any>) => {
    const product = products?.find(
      (product) => product.name === row.values.name
    );
    if (product) {
      history.push(routes.PRODUCTDETAILS.path.replace(':name', product.name));
    }
  };

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Account',
        accessor: 'accountId',
      },
      
      {
        Header: 'Region',
        accessor: 'region',
      },
     {
        Header: 'Environments',
        accessor: 'environments',
        Cell: () => (
          <div style={{marginLeft:55}}>
            {products[0].environments[0].name}
          </div>
        )
      },
    ],
    []
  );
  const navigateToProductCreatePage = () => {
    history.push(routes.CREATEPRODUCT.path);

  }
 
  
  return (
    <div className='mainContainer container py-3'>
      {/* <NavBar /> */}
      <div className='searchInput'>   <InputGroup size='md'>
                    <Input
                        pr='4.5rem'
                        type={'text'}
                        placeholder='Search'
                        w='305px'
                    />
                    <InputRightElement width='4.5rem'>
                      <img src={search} alt='' />
                    </InputRightElement>
                    </InputGroup>
        </div>
        
      {products ? (
        <div className='table'>
          <DataTable
            // title='Your Compoze Products'
            columns={columns}
            data={products}
            onClick={navigateToDetailsPage}
          />
          {/* <Button
            className='createProductButton'
            type='button'
            w='10%'
            onClick={() => navigateToProductCreatePage()}
          >
            Create
          </Button> */}
        </div>
      ) : (
        <div>
          Loading <Spinner />
        </div>
      )}
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
  );
}
