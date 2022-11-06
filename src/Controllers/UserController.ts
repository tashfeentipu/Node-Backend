import { Body, Get, JsonController, Post } from 'routing-controllers';
import { Service } from 'typedi';
import { UserService } from "../Services/UserServices";
import { LoginRequest, SignUpRequest } from '../Types/Users';

@JsonController("/users")
@Service()
export class UserController {

    constructor(private userService: UserService) { }

    @Get('/login')
    async loginController(@Body() loginRequest: LoginRequest): Promise<any> {
        return await this.userService.loginService(loginRequest);
    }

    @Post('/signUp')
    async signUp(@Body() signUpRequest: SignUpRequest): Promise<any> {
        return await this.userService.signUpService(signUpRequest);
    }
}