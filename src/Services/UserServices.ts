import { Service } from "typedi";
import { UserRepository } from "../Repositories/UserRepository";
import { LoginRequest, SignUpRequest } from "../Types/Users";
const jwt = require('jsonwebtoken');

@Service()
export class UserService {
    constructor(private userRepository: UserRepository) { }

    loginService = async (loginRequest: LoginRequest): Promise<any> => {
        try {
            const user = await this.userRepository.getUser(loginRequest.email);
            const token = jwt.sign(user, process.env["JWT_SECRET"]);
            return { token }

        } catch (error) {
            return false
        }
    }

    nonceService = async (pubKey: string): Promise<any> => {
        const result = await this.userRepository.getNonce(pubKey);
        if (!result) {
            const nonce = Date.now().toString()
            const userSaved = await this.userRepository.saveUser({ publicKey: pubKey, nonce })
            if(userSaved){
                return nonce
            }            
        }

        return result
    }

    signUpService = async (signUpData: SignUpRequest): Promise<boolean> => {
        return await this.userRepository.saveUser(signUpData);
    }
}