import { UserRepository } from "../Repositories/UserRepository";
import { LoginRequest, SignUpRequest } from "../Types/Users";

export class UserService {
    userRepository: UserRepository = new UserRepository()

    loginService = async (loginRequest: LoginRequest): Promise<any> => {
        let result = await this.userRepository.getLoginData(loginRequest.email);
        result = JSON.parse(JSON.stringify(result))
        return result
    }

    signUpService = async (signUpData: SignUpRequest): Promise<boolean> => {
        return await this.userRepository.postSignUpData(signUpData);
    }
}