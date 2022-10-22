import { User } from "../features/auth/authSlice";
import RestService from "./RestService";

export default class UserService {

    constructor(protected readonly compozeAPi: RestService,
        protected readonly unauthenticated: RestService) { }

    async registerUser(userName: string, sub: string): Promise<User> {
        const userResponse = await this.unauthenticated.unauthenticatedPost<UserResponse>(
            `/users/signups`,
            {
                userName,
                sub,
            }
        )
        return {
            username: userResponse.name,
            orgId: userResponse.orgId
        }
    }

    async getUser(): Promise<User> {
        const userResponse = await this.compozeAPi.get<UserResponse>(
            `/user`
        );
        return {
            username: userResponse.name,
            orgId: userResponse.orgId
        }
    }
}

interface UserResponse {
    id: string;
    name: string;
    authToken: string;
    orgId?: string;
}