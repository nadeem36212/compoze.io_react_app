import {
  Flex,
  Button,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react';

import NavBar from "../../../navigation/navbar";
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import ConfirmProductCreate from './ConfirmProductCreate';
import CreateForm from './CreateForm';
import SelectAccount from './SelectAccount';
import { Account, fetchAccounts, selectAccountState } from '../../account/accountSlice';
import SelectProductName from './SelectProductName';
import SelectRegion from './SelectRegion';
import { CompozeFormOption } from '../../../components/form/CompozeFormOption';
import { createNewProduct } from '../productSlice';
import EnvironmentSelection from './EnvironmentSelection';
import routes from '../../../routes';


export default function CreateProductPage() {
  const [account, setAccount] = useState<Account>()
  const [region, setRegion] = useState({} as CompozeFormOption)
  const [environments, setEnvironments] = useState<string>()
  const [regionOptions, setRegionOptions] = useState([] as CompozeFormOption[])
  const [name, setName] = useState('')
  const [formFilledOut, setFormFilledOut] = useState(false)
  const accounts = useAppSelector(selectAccountState);

  const history = useHistory();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAccounts());
  }, []);

  const navigateToProductsPage = () => {
    history.push(routes.PRODUCTS.path);
  }
  const accountOptions = accounts.map(account => {
    return { value: account.accountId, displayName: account.name };
  });
  const steps = [
    {
      label: 'Provide a Name', content: <SelectProductName setName={(name: any) => {
        setName(name)
      }} />
    },
    {
      label: 'Select Account', content: <SelectAccount onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedAccount = event.target.value;
        const account = accounts.find(account => account.name === selectedAccount)!;
        setAccount(account)
        setRegionOptions(account.regions.map(region => {
          return { value: region.id, displayName: region.region };
        }))
      }} accountOptions={accountOptions} />
    },
    {
      label: 'Region', content: <SelectRegion regionOptions={regionOptions} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedRegion = regionOptions.find(option => option.displayName === event.target.value)!;
        setRegion(selectedRegion);
      }}
      />
    },
    { label: 'Environments', content: <EnvironmentSelection setEnvironments={setEnvironments} /> }
  ];


  const finishForm = () => {
    setFormFilledOut(true);
  }

  return (
    <div className='App container py-3'>
      <NavBar />
      {
        (accounts) &&
        <div className='CreateComponent container py-3'>
          {!formFilledOut &&
            <CreateForm heading='Create Your Product' steps={steps} finishForm={() => finishForm()} />
          }
          {formFilledOut &&
            <ConfirmProductCreate name={name} account={account!} region={region} environments={environments!}

              onSubmit={(account: Account, region: CompozeFormOption, name: string) => {
                console.log(account, region, name)

                dispatch(createNewProduct(
                  {
                    accountId: account.id,
                    name: name,
                    region: region.displayName,
                    createVpc: true,
                    environments: environments!.split(',')
                  }
                ))
                  .then(() => {
                    navigateToProductsPage();
                  })
              }}
            />
          }
        </div>
      }

    </div >
  );
}




