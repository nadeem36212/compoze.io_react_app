import { isFulfilled } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Button, Spinner } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { DataTable } from '../../components/Table';
import NavBar from '../../navigation/navbar';
import {
  Account,
  createAccount,
  editAccount,
  fetchAccounts,
  selectAccountIsLoading,
  selectAccountState,
} from './accountSlice';
import './Account.css';
import { Stack } from '@chakra-ui/react';

export default function AccountPage() {
  const accounts = useAppSelector(selectAccountState);
  const accountIsLoading = useAppSelector(selectAccountIsLoading);

  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  const [accountId, setAccountId] = useState('');
  const [id, setId] = useState('');
  const [hostedZoneId, setHostedZoneId] = useState('');
  const [nickName, setNickName] = useState('');
  const [trackCompliance, setTrackCompliance] = useState(false);

  useEffect(() => {
    dispatch(fetchAccounts());
  }, []);

  function validateForm() {
    return (
      accountId.length > 0 &&
      nickName.length > 0
    );
  }

  const clearForm = (fulfilled: boolean) => {
    setIsLoading(false);

    if (fulfilled) {
      alert('Successfully added account');
      setAccountId('');
      setNickName('');
      setHostedZoneId('');
      setTrackCompliance(false);

      setEditMode(false);
    } else {
      alert('There was a problem adding the account, please try again');
    }
  };

  async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    setIsLoading(true);

    event.preventDefault();
    // IT IS WORTH NOTING - trackCost is defaulted to true here. Maybe not the most intuitive place for it but here we are

    // TODO: If editMode === true, editAccount instead of createAccount.
    // Need some check if already exists acct with same accountId?

    if (editMode) {
      const action = await dispatch(
        editAccount({
          account: {
            id,
            accountId,
            name: nickName,
            hostedZoneId: hostedZoneId === "" ? undefined : hostedZoneId,
            trackCompliance,
            trackCost: true,
            regions: []
          },
        })
      );
      clearForm(isFulfilled(action));
    } else {
      const action = await dispatch(
        createAccount({
          account: {
            id,
            accountId,
            name: nickName,
            trackCompliance,
            hostedZoneId: hostedZoneId === "" ? undefined : hostedZoneId,
            trackCost: true,
            regions: []
          },
        })
      );
      clearForm(isFulfilled(action));
    }
  }

  
  const onClick = (row: any) => {
    setEditMode(true);
    const accountToEdit: Account = row.values;
    console.log(accountToEdit);
    setAccountId(accountToEdit.accountId ?? '');
    setNickName(accountToEdit.name ?? '');
    row.values.boolean === 'true'
      ? setTrackCompliance(true)
      : setTrackCompliance(false);
  };

  console.log(accounts);

  return (
    <div className='App'>
      <div className='Account'>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='accountId'>
            <Stack spacing={0} mb={5}>
              <Form.Label>AWS Account ID</Form.Label>
             
              <Form.Control
                autoFocus
                type='accountId'
                value={accountId}
                onChange={(e) => setAccountId(e.target.value)}
              />
            </Stack>
          </Form.Group>
          <Form.Group controlId='nickName'>
            <Stack spacing={0} mb={5}>
              <Form.Label>Nick Name</Form.Label>
              <Form.Control
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
              />
            </Stack>
          </Form.Group>
          <Form.Group controlId='hostedZoneId'>
            <Stack spacing={0} mb={5}>
              <Form.Label>ARN</Form.Label>
           
              <Form.Control
                value={hostedZoneId}
                onChange={(e) => setHostedZoneId(e.target.value)}
              />
            </Stack>
          </Form.Group>
            <div className='block right'>
              <Button width={102} variant={'outline'} className="primary" type='submit' >Save</Button>
            </div>
         
        </Form>
        {/* <Markdown /> */}
      </div>
    </div>
  );
}

