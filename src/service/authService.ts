import Auth from "@aws-amplify/auth";
import services from ".";
import { User } from "../features/auth/authSlice";

const ORG_ID = "compozelabs";
export default class AuthService {


    async signUp(email: string, password: string): Promise<User> {
        let sub: string;

        try {

            const user = await Auth.signIn(email, password) as any
            sub = user.attributes.sub

        } catch (error) {

            console.log('user does not exist, signing up')
            const newUser = await Auth.signUp({
                password,
                username: email,
                attributes: {
                    email, // optional
                }
            })
            sub = newUser.userSub;
        }

        await services.userService.registerUser(email, sub)

        return {
            username: email,
            orgId: ORG_ID

        }
    }

    async signIn(email: string, password: string): Promise<User> {
        const user = await Auth.signIn(email, password)

        return {
            username: user.username,
            orgId: ORG_ID
        };
    }

    async logout(): Promise<void> {
        await Auth.signOut();
    }

    async checkSession(): Promise<User> {
        await Auth.currentAuthenticatedUser();

        return await services.userService.getUser()
    }

    public async getToken(): Promise<string> {
        const currentUser = await Auth.currentAuthenticatedUser();

        return currentUser.getSignInUserSession().getIdToken().jwtToken
    }

}

export interface CognitoUser {
    username: string;
}