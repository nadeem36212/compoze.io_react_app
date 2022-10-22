import { Spinner } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import NavBar from '../../navigation/navbar';
import { AccountComplianceSummary } from '../compliance/compliantSlice';
import {
  ComplianceDetails,
  fetchComplianceDetails,
  fetchComplianceStatus,
  fetchResourceInventory,
  ResourceSummary as ResourceInventory,
  selectAccountComplianceStatus,
  selectComplianceDetails,
  selectResourceInventory,
} from './compliantDetailsSlice';

import { Details2 } from './Details2';
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

export default function ComplianceDetailsPage() {
  const params = useParams<{ id: string }>();

  const accountComplianceDetails: ComplianceDetails[] | undefined =
    useAppSelector(selectComplianceDetails);

  const resourceInventory: ResourceInventory | undefined = useAppSelector(
    selectResourceInventory
  );
  const accountComplianceStatus: AccountComplianceSummary | undefined =
    useAppSelector(selectAccountComplianceStatus);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchComplianceDetails({ id: params.id }));
    dispatch(fetchResourceInventory({ id: params.id }));
    dispatch(fetchComplianceStatus({ id: params.id }));
  }, []);

  return (
    <div className='App container py-3'>
      <NavBar />
      <div className='ComplianceDetails container py-3'>
        {accountComplianceDetails &&
        resourceInventory &&
        accountComplianceStatus ? (
          <Details2
            resourceInventory={resourceInventory}
            accountComplianceStatus={accountComplianceStatus}
            accountComplianceDetails={accountComplianceDetails}
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
