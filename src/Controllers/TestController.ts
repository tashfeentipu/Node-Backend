import { Authorized, Get, JsonController } from 'routing-controllers';
import { Service } from 'typedi';

@JsonController("/test")
@Service()
export class TestController {

    @Get('/serverRunning')
    async serverController(): Promise<string> {
        return "Server is Running"
    }
}