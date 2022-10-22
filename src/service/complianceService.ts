import { AccountComplianceSummary } from "../features/compliance/compliantSlice";
import { ComplianceDetails, ResourceSummary } from "../features/complianceDetails/compliantDetailsSlice";
import RestService from "./RestService";

export default class ComplianceService {
    constructor(protected readonly api: RestService) { }

    async getAccounts(): Promise<AccountComplianceSummary[]> {
        return (await this.api.get<GetComplianceResponse>(`/organization/accounts/compliances/summaries`)).complianceSummary
    }
    async getComplianceForAccount(accountId: string): Promise<AccountComplianceSummary> {
        return (await this.api.get<AccountComplianceSummary>(`/organization/accounts/${accountId}/compliances/summaries`))
    }
    async getAccountStatus(id: string): Promise<AccountComplianceSummary[]> {
        return (await this.api.get<GetComplianceResponse>(`/organization/accounts/${id}/compliances/summaries`)).complianceSummary
    }
    async getAccountComplianceDetails(accountId: string): Promise<ComplianceDetails[]> {
        return (await this.api.get<GetAccountComplianceDetailsResponse>(
            `/organization/accounts/${accountId}/compliances`)).rules
    }

    async getResourceInventory(accountId: string): Promise<ResourceSummary> {
        return (await this.api.get<GetResourceSummaryResponse>(
            `/organization/accounts/${accountId}/resources/summaries`)).resources
    }

}

interface GetComplianceResponse {
    complianceSummary: AccountComplianceSummary[]
}
interface GetAccountComplianceDetailsResponse {
    rules: ComplianceDetails[]
}
interface GetResourceSummaryResponse {
    resources: ResourceSummary
}