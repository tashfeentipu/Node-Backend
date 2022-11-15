import { Service } from "typedi";
import Web3 from "web3";
import { UserRepository } from "../Repositories/UserRepository";
import { LoginRequest, SignUpRequest, WalletLoginRequest } from "../Types/Users";
import * as ethUtil from 'ethereumjs-util';
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
            const msgToSign = `I want to sign ${user.nonce}`
            const msgBuffer = ethUtil.toBuffer(this.web3.utils.toHex(msgToSign));
            const msgHash = ethUtil.hashPersonalMessage(msgBuffer);
            const signatureParams = ethUtil.fromRpcSig(walletLoginRequest.txHash);
            const publicKey = ethUtil.ecrecover(
                msgHash,
                signatureParams.v,
                signatureParams.r,
                signatureParams.s
            );
            const addressBuffer = ethUtil.publicToAddress(publicKey);
            const address = ethUtil.bufferToHex(addressBuffer);
           
            if (address === walletLoginRequest.publicKey) {
                const token = jwt.sign(user, process.env["JWT_SECRET"]);
                return { token }
            }
        } catch (error) {
            return false
        }
    }

    nonceService = async (pubKey: string): Promise<any> => {
        return await this.userRepository.getNonce(pubKey);
    }

    signUpService = async (signUpData: SignUpRequest): Promise<boolean> => {
        return await this.userRepository.saveUser(signUpData);
    }
}