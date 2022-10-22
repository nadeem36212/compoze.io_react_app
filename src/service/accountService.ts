import { Account } from '../features/account/accountSlice';
import RestService from './RestService';

export default class AccountService {
  constructor(protected readonly api: RestService) { }

  async addAccount(orgId: string, account: Account): Promise<Account> {
    return await this.api.post<Account>(
      `/organizations/${orgId}/accounts`,
      account
    );
  }

  async getAccounts(orgId: string): Promise<Account[]> {
    return await this.api.get<Account[]>(`/organizations/${orgId}/accounts`);
  }

  async updateAccount(orgId: string, account: Account): Promise<Account> {
    return await this.api.put<Account>(
      `/organizations/${orgId}/accounts`,
      account
    );
  }
  async getAccountMetaData(productName: string): Promise<any> {
    return await this.api.get<Account[]>(`/accounts/products/${productName}/metadata`);
  }

}



export interface GetAccountsResponse {
  accounts: Account[];
}
