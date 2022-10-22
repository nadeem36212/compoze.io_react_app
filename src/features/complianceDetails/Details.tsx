import React from 'react';
import styled from 'styled-components';
import { DataTable } from '../../components/Table';
import { ComplianceDetails } from './compliantDetailsSlice';

const Styles = styled.div`
  padding: 1rem;
  table {
    border-spacing: 0;
    border: 1px solid black;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      :last-child {
        border-right: 0;
      }
    }
  }
`;

type ComplianceDetailsProps = {
  accountId: string;
  nickName: string;
  accountComplianceDetails: ComplianceDetails[];
};
export default function DetailsPage({
  accountId,
  nickName,
  accountComplianceDetails,
}: ComplianceDetailsProps) {
  const columns = React.useMemo(
    () => [
      {
        Header: `Account Compliance Details`,
        columns: [
          {
            Header: 'Rule Name',
            accessor: 'ruleName',
          },
          {
            Header: 'Severity',
            accessor: 'severity',
          },
          {
            Header: 'Compliance Status',
            accessor: 'complianceStatus',
          },
        ],
      },
    ],
    []
  );

  return (
    <div className='Details container py-3'>
      <Styles>
        <DataTable
          title='Account Compliance Details'
          columns={columns}
          data={accountComplianceDetails}
        />
      </Styles>
    </div>
  );
}
