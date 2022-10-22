import { AccountCost } from '../features/costs/costSlice';
import RestService from './RestService';

export default class CostsService {
  constructor(protected readonly api: RestService) { }

  async getCosts(orgId: string): Promise<AccountCost[]> {

    const costResponse: CostResponse[] = await this.api.get<CostResponse[]>(
      `/organizations/${orgId}/accounts/costs`
    );

    return costResponse
      .filter((account) => {
        return !isNaN(parseFloat(account.amount))
      })
      .map((account: CostResponse) => {

        const periodSplit = account.period.split(' - ');
        const amountSplit = account.amount.split('.');
        const amountShortened = amountSplit[0] === "0" ? "0.00" : amountSplit[0] + '.' + amountSplit[1].slice(0, 2);
        const forecastAmountSplit = account.forecastAmount.split('.');
        const forecastAmountShortened =
          forecastAmountSplit[0] + '.' + forecastAmountSplit[1].slice(0, 2);

        return {
          accountId: account.accountId,
          periodStart: periodSplit[0],
          periodEnd: periodSplit[1],
          nickName: account.nickName,
          totalCost: `${account.unit} $${amountShortened}`,
          forecastedAmount: `${account.unit} $${forecastAmountShortened}`,
        };
      });
  }
}

interface CostResponse {
  amount: string;
  forecastAmount: string;
  accountId: string;
  nickName: string;
  unit: string;
  period: string;
  granularity: string;
}
