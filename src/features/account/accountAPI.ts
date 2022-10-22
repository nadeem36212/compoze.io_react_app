import services from '../../service';
import { getOrganization } from '../organization/organizationApi';
import { Organization } from '../organization/organizationSlice';
import { Account } from './accountSlice';

export async function addAccount(
  account: Account
): Promise<Account> {
  //TODO: NEST ACCOUNT UNDER ORGANIZATION
  const organization: Organization = await getOrganization()
  return services.accountService.addAccount(organization.orgId, account);
}

export async function updateAccount(
  account: Account
): Promise<Account> {

  //TODO: NEST ACCOUNT UNDER ORGANIZATION
  const organization: Organization = await getOrganization()
  return services.accountService.updateAccount(organization.orgId, account);
}

export async function getAccounts(): Promise<Account[]> {


  const organization: Organization = await getOrganization()
  const accounts: Account[] = await services.accountService.getAccounts(organization.orgId);
  return accounts
}

export async function getAccountMetaData(productName: string): Promise<any> {

  return await services.accountService.getAccountMetaData(productName);
}