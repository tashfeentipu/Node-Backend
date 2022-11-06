import { Body, Get, JsonController, Post } from 'routing-controllers';
import { UserService } from "../Services/UserServices";
import { LoginRequest, SignUpRequest } from '../Types/Users';

@JsonController("/users")
export class UserController {

    userService: UserService = new UserService()

    @Get('/login')
    async loginController(@Body() loginRequest: LoginRequest): Promise<any> {
        return await this.userService.loginService(loginRequest);
    }

    @Post('/signUp')
    async signUp(@Body() signUpRequest: SignUpRequest): Promise<any> {
        return await this.userService.signUpService(signUpRequest);
    }
}