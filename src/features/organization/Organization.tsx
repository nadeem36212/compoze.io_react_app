import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Button, Spinner } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { DataTable } from '../../components/Table';
import NavBar from '../../navigation/navbar';
import {
  createUser,
  fetchOrganization,
  Organization,
  selectOrgState,
} from './organizationSlice';
import { isFulfilled } from '@reduxjs/toolkit';

export default function OrganizationPage() {
  const organization: Organization | undefined = useAppSelector(selectOrgState);
  const dispatch = useAppDispatch();
  const [userName, setUserName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const columns = React.useMemo(
    () => [
      {
        Header: 'UserName',
        accessor: 'userName',
      },
    ],
    []
  );
  function validateForm() {
    return validateEmail(userName);
  }

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    setIsLoading(true);
    event.preventDefault();
    const action = await dispatch(createUser({ orgId: organization?.orgId!, userName }));

    setIsLoading(false);
    const fulfilled = isFulfilled(action);
    if (fulfilled) {
      alert('Successfully added user');
      await dispatch(fetchOrganization());
      setUserName('');
    } else {
      alert('There was a problem adding the user, please try again');
    }
  }

  useEffect(() => {
    dispatch(fetchOrganization());
  }, []);

  return (
    <div className='Organization container py-3'>
      <NavBar />
      {organization ? (
        <div>
          <DataTable
            title='Compoze Labs Users'
            columns={columns}
            data={organization.users}
            onClick={() => {}}
          />
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='accountId'>
              <Form.Label>Email Address</Form.Label>
              <Form.Text>
                {' '}
                We'll send an email to this address to signup for the Compoze Platform
              </Form.Text>
              <Form.Control
                autoFocus
                type='userName'
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </Form.Group>
            <Button
              isLoading={isLoading}
              className='addButton'
              type='submit'
              disabled={!validateForm()}
            >
              Send Invite
            </Button>
          </Form>
        </div>
      ) : (
        <div>
          Loading <Spinner />
        </div>
      )}
    </div>
  );
}
