import { Body, Get, JsonController, Post, QueryParam } from 'routing-controllers';
import { Service } from 'typedi';
import { UserService } from "../Services/UserServices";
import { LoginRequest, SignUpRequest, WalletLoginRequest } from '../Types/Requests/users';
import { HttpStatusCodes, Response } from '../ResponseHandler';
import { LoginResponse } from '../Types/Responses/users';

@JsonController("/users")
@Service()
export class UserController {

    constructor(private userService: UserService) { }

    @Post('/login')
    async loginController(@Body() loginRequest: LoginRequest): Promise<Response<LoginResponse>> {
        const { token } = await this.userService.loginService(loginRequest)
        if (token) {
            return {
                code: HttpStatusCodes.OK,
                data: {
                    token
                }
            }
        }
        return {
            code: HttpStatusCodes.NOT_FOUND,
            message: "Resource Not Found"
        }
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
    async signUp(@Body() signUpRequest: SignUpRequest): Promise<Response<string>> {
        const result = await this.userService.signUpService(signUpRequest);
        if (result) {
            return {
                code: HttpStatusCodes.CREATED,
                data: "USER CREATED"
            }
        }
        return {
            code: HttpStatusCodes.NOT_FOUND,
            message: "Resource Not Found"
        }

    }
}