import Users from "../Schema/Users";
import { SignUpRequest } from "../Types/Users";

export class UserRepository {

    getLoginData = async (email: string): Promise<any> => {
        return Users.findOne({ email });
    }

    postSignUpData = async (signUpData: SignUpRequest): Promise<boolean> => {
        console.log(signUpData);
        
        try {
            await new Users(signUpData).save();
            return true;            
        } catch (error) {
            return false
        }
    }
}