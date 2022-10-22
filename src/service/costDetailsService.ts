import { CostDetails } from "../features/costs/costDetails/costDetailsSlice";
import RestService from "./RestService";

export default class CostDetailService {

    constructor(protected readonly api: RestService) { }

    async getCostDetails(accountId: string): Promise<CostDetails> {
        return await this.api.get<CostDetails>(
            `/organization/accounts/${accountId}/costs`,
        );
    }
}
