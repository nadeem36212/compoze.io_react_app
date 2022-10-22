import services from "../../service";
import { AccountComplianceSummary } from "./compliantSlice";

// A mock function to mimic making an async request for data
export function getCompliance(): Promise<AccountComplianceSummary[]> {

    return services.complianceService.getAccounts();
}
export function getComplianceByAccountID(accountId: string): Promise<AccountComplianceSummary> {

    return services.complianceService.getComplianceForAccount(accountId);
}
