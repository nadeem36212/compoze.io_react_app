import { ChevronRightIcon } from '@chakra-ui/icons';
import { IconButton, Spinner } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Row } from 'react-table';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { DataTable } from '../../components/Table';
import NavBar from '../../navigation/navbar';
import routes from '../../routes';
import {
  AccountComplianceSummary,
  fetchCompliance,
  selectCompliance,
} from './compliantSlice';

export default function CompliancePage() {
  const accountCompliances: AccountComplianceSummary[] | undefined =
    useAppSelector(selectCompliance);

  const dispatch = useAppDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchCompliance());
  }, []);

  const navigateToDetailsPage = (row: Row<any>) => {
    const account = accountCompliances?.find(
      (compliance) => compliance.accountId === row.values.accountId
    );
    if (account) {
      history.push(routes.COMPLIANCEDETAILS.path.replace(':id', account.id));
    }
  };

  const columns = React.useMemo(
    () => [
      {
        Header: 'AWS Account ID',
        accessor: 'accountId',
      },
      {
        Header: 'Nick Name',
        accessor: 'nickName',
      },
      {
        Header: 'Total Compliant Rules',
        accessor: (d: AccountComplianceSummary) =>
          d.complianceSummary.ruleCompliance.compliantExceeded
            ? `+${d.complianceSummary.ruleCompliance.compliantResources}`
            : d.complianceSummary.ruleCompliance.compliantResources,
      },
      {
        Header: 'Total Non Compliant Rules',
        accessor: (d: AccountComplianceSummary) =>
          d.complianceSummary.ruleCompliance.nonComplianceExeeded
            ? `+${d.complianceSummary.ruleCompliance.nonComplianceResources}`
            : d.complianceSummary.ruleCompliance.nonComplianceResources,
      },
      {
        Header: 'Total Compliant Resources',
        accessor: (d: AccountComplianceSummary) =>
          d.complianceSummary.resourceCompliance.compliantExceeded
            ? `+${d.complianceSummary.resourceCompliance.compliantResources}`
            : d.complianceSummary.resourceCompliance.compliantResources,
      },
      {
        Header: 'Total Non Compliant Resources',
        accessor: (d: AccountComplianceSummary) =>
          d.complianceSummary.resourceCompliance.nonComplianceExeeded
            ? `+${d.complianceSummary.resourceCompliance.nonComplianceResources}`
            : d.complianceSummary.resourceCompliance.nonComplianceResources,
      },
      {
        Header: ' ',
        Cell: (
          <IconButton
            w={20}
            bg='transparent'
            aria-label='view compliance details page'
            icon={<ChevronRightIcon color='black' w={20} h={10} />}
          />
        ),
      },
    ],
    []
  );

  return (
    <div className='App container py-3'>
      <NavBar />
      <div className='Compliance container py-3'>
        {accountCompliances ? (
          <DataTable
            title='Account Compliance'
            columns={columns}
            data={accountCompliances}
            onClick={navigateToDetailsPage}
          />
        ) : (
          <div>
            Loading <Spinner />
          </div>
        )}
      </div>
    </div>
  );
}
