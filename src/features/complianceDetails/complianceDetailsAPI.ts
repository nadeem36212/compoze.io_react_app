import services from "../../service";
import { ComplianceDetails, ResourceSummary } from "./compliantDetailsSlice";

export function getAccountComplianceDetails(accountId: string): Promise<ComplianceDetails[]> {

    return services.complianceService.getAccountComplianceDetails(accountId)
}

export function getResourceInventory(accountId: string): Promise<ResourceSummary> {

    return services.complianceService.getResourceInventory(accountId)
}
