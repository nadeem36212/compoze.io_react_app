import services from "../../service";
import { Organization } from "./organizationSlice";

export async function getOrganization(): Promise<Organization> {
    // return (await services.accountService.getAccounts(orgId)).accounts;
    return await (await services.organizationService.getOrganization()).organization
}

export async function addUser(orgId: string, userName: string): Promise<Organization> {
    return await (await services.organizationService.addUser(orgId, userName)).organization
}