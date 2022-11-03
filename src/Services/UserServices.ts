import { UserRepository } from "../Repositories/UserRepository";
import { LoginRequest, SignUpRequest } from "../Types/Users";

export class UserService {
    userRepository: UserRepository = new UserRepository()

    loginService = async (loginRequest: LoginRequest): Promise<any> => {
        return await this.userRepository.getLoginData(loginRequest.email);
    }

    signUpService = async (signUpData: SignUpRequest): Promise<boolean> => {
        return await this.userRepository.postSignUpData(signUpData);
    }
}