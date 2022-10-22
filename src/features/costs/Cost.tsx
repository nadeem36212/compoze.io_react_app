import { DataTable } from '../../components/Table';
import React, { useEffect } from 'react';
import { AccountCost, fetchCosts, selectCost } from './costSlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import NavBar from '../../navigation/navbar';
import { selectUser, User } from '../auth/authSlice';
import { Spinner } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import routes from '../../routes';
import { Row } from 'react-table';

export function Cost() {
  const accounts: AccountCost[] = useAppSelector(selectCost);
  const user: User = useAppSelector(selectUser)!;
  const dispatch = useAppDispatch();
  const history = useHistory();

  const navigateToDetailsPage = (row: Row<any>) => {
    const account = accounts?.find(
      (compliance) => compliance.accountId === row.values.accountId
    );
    if (account) {
      history.push(routes.COSTDETAILS.path.replace(':id', account.accountId));
    }
  };
  useEffect(() => {
    dispatch(fetchCosts({ orgId: user.orgId! }));
  }, []);

  const columns = React.useMemo(
    () => [

      {
        Header: 'Account Nickname',
        accessor: 'nickName',
      },
      {
        Header: 'AWS Account ID',
        accessor: 'accountId',
      },
      {
        Header: 'Period Start',
        accessor: 'periodStart',
      },
      {
        Header: 'Period End',
        accessor: 'periodEnd',
      },
      {
        Header: 'Total Cost',
        accessor: 'totalCost',
      },
      {
        Header: 'Forecast Cost For The Month',
        accessor: 'forecastedAmount',
      },
    ],
    []
  );

  return (
    <div className='App container py-3'>
      <NavBar />

      {accounts && accounts.length > 0 ? (
        <DataTable
          title='AWS Accounts Cost'
          columns={columns}
          data={accounts}
          onClick={navigateToDetailsPage}

        />
      ) : (
        <div>
          Loading <Spinner />
        </div>
      )}
    </div>
  );
}
