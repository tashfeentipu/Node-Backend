import { Service } from "typedi";
import Users from "../Schema/Users";
import { SignUpRequest } from "../Types/Users";

@Service()
export class UserRepository {

    async getUser(query: any): Promise<any> {
        return JSON.parse(JSON.stringify(await Users.findOne(query)));
    }

    async getNonce(publicKey: string): Promise<any> {
        let result = await Users.findOne({ publicKey }).select("nonce")
        if (!result) {
            try {
                const { _id, nonce } = await new Users({ publicKey }).save()
                result = { _id, nonce }
            } catch (error) {
                return false
            }
        }
        return JSON.parse(JSON.stringify(result));
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