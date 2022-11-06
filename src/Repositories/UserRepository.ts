import { Service } from "typedi";
import Users from "../Schema/Users";
import { SignUpRequest } from "../Types/Users";

@Service()
export class UserRepository {

    async getUser(email: string): Promise<any> {
        return JSON.parse(JSON.stringify(await Users.findOne({ email })));
    }

    async saveUser(signUpData: SignUpRequest): Promise<boolean> {
        try {
            await new Users(signUpData).save();
            return true;
        } catch (error) {
            return false
        }
    }
}