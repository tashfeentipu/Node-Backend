import { Service } from "typedi";
import { UserRepository } from "../Repositories/UserRepository";
import { LoginRequest, SignUpRequest } from "../Types/Users";
const jwt = require('jsonwebtoken');

@Service()
export class UserService {
    constructor(private userRepository: UserRepository){}

    loginService = async (loginRequest: LoginRequest): Promise<any> => {
        try {
            const user = await this.userRepository.getUser(loginRequest.email);
            const token = jwt.sign(user, process.env["JWT_SECRET"]);
            return token
            
        } catch (error) {
            return false
        }
    }

    signUpService = async (signUpData: SignUpRequest): Promise<boolean> => {
        return await this.userRepository.saveUser(signUpData);
    }
}