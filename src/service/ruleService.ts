import { RuleDetails } from "../features/rule/ruleDetailsSlice";
import RestService from "./RestService";

export default class RuleService {

    constructor(protected readonly api: RestService) { }

    async getRuleDetails(name: string, accountId: string): Promise<RuleDetails> {
        return await this.api.get<RuleDetails>(
            `/organization/accounts/${accountId}/rules/${name}`,
        );
    }

    public async evaluateRule(name: string, accountId: string): Promise<void> {
        await this.api.post<string>(
            `/organization/accounts/${accountId}/rules/${name}/evaluations`,
        );
    }

}
