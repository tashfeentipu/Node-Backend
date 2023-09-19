import { Service } from "typedi";
import Web3 from "web3";
import { UserRepository } from "../Repositories/UserRepository";
import { LoginRequest, SignUpRequest, WalletLoginRequest } from "../Types/Requests/users";
import { DecodeAddress, nonceString } from './../Helpers/DecodeAddress';
import { sendVerificationEmail } from "./EmailService";
const jwt = require('jsonwebtoken');

@Service()
export class UserService {
    web3: any = new Web3(new Web3.providers.HttpProvider(process.env["WEB3_PROVIDER"] || ""))
    constructor(private userRepository: UserRepository) { }

    loginService = async (loginRequest: LoginRequest): Promise<any> => {
        try {
            const user = await this.userRepository.getUser({ email: loginRequest.email });
            const token = jwt.sign(user, process.env["JWT_SECRET"]);
            return { token }

        } catch (error) {
            return false
        }
    }

    walletLoginService = async (walletLoginRequest: WalletLoginRequest): Promise<any> => {
        try {
            const user = await this.userRepository.getUser({ publicKey: walletLoginRequest.publicKey });
            const address = DecodeAddress(nonceString(user.nonce), walletLoginRequest.txHash);

            if (address === walletLoginRequest.publicKey) {
                const token = jwt.sign(user, process.env["JWT_SECRET"]);
                return { token }
            }
        } catch (error) {
            return false
        }
    }

    nonceService = async (pubKey: string): Promise<any> => {
        const user = await this.userRepository.getNonce(pubKey);
        sendVerificationEmail();
        return nonceString(user.nonce)
    }

    signUpService = async (signUpData: SignUpRequest): Promise<boolean> => {
        return await this.userRepository.saveUser(signUpData);
    }
}