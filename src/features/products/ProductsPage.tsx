import React, { useEffect } from 'react';
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
import { Button, Spinner } from '@chakra-ui/react';

export function ProductPage() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'AWS Account ID',
        accessor: 'accountId',
      },
      {
        Header: 'AWS Region',
        accessor: 'region',
      },
      // {
      //     Header: 'Environments',
      //     accessor: 'environments',
      // },
      {
        Header: 'Product Name',
        accessor: 'name',
      },
    ],
    []
  );
  const products: ProductInformation[] = useAppSelector(selectProducts);

  const dispatch = useAppDispatch();
  const user: User = useAppSelector(selectUser)!;
  const history = useHistory();

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

  const navigateToProductCreatePage = () => {
    history.push(routes.CREATEPRODUCT.path);

  }
  return (
    <div className='Products container py-3'>
      <NavBar />

      {products ? (
        <div>
          <DataTable
            // title='Your Compoze Products'
            columns={columns}
            data={products}
            onClick={navigateToDetailsPage}
          />
          <Button
            className='createProductButton'
            type='button'
            w='10%'
            onClick={() => navigateToProductCreatePage()}
          >
            Create
          </Button>
        </div>
      ) : (
        <div>
          Loading <Spinner />
        </div>
      )}
    </div>
  );
}
