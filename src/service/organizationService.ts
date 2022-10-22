import { Organization } from "../features/organization/organizationSlice";
import RestService from "./RestService";

export default class OrganizationService {

    constructor(protected readonly api: RestService,
        protected readonly compozeAPi: RestService) { }

    async getOrganization(): Promise<GetOrganizationResponse> {
        return await this.api.get<GetOrganizationResponse>(
            `/organization/users`,
        );
    }
    async addUser(orgId: string, userName: string): Promise<GetOrganizationResponse> {
        return await this.compozeAPi.post<GetOrganizationResponse>(
            `/organizations/${orgId}/users/creation`,
            {
                userName,
            }
        )
    }
}

interface GetOrganizationResponse {
    organization: Organization
}