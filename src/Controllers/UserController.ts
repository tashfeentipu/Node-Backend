import { Body, Get, JsonController, Post, QueryParam } from 'routing-controllers';
import { Service } from 'typedi';
import { UserService } from "../Services/UserServices";
import { LoginRequest, SignUpRequest, WalletLoginRequest } from '../Types/Users';

@JsonController("/users")
@Service()
export class UserController {

    constructor(private userService: UserService) { }

    @Post('/login')
    async loginController(@Body() loginRequest: LoginRequest): Promise<any> {
        return await this.userService.loginService(loginRequest)
    }

    @Post('/walletLogin')
    async walletLoginController(@Body() walletLoginRequest: WalletLoginRequest): Promise<any> {
        return await this.userService.walletLoginService(walletLoginRequest)
    }

    @Get('/getNonce')
    async getNonceController(@QueryParam("pubKey") pubKey: string): Promise<any> {
        return await this.userService.nonceService(pubKey)
    }

    @Post('/signUp')
    async signUp(@Body() signUpRequest: SignUpRequest): Promise<any> {
        return await this.userService.signUpService(signUpRequest);
    }
}