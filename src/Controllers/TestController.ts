import { Authorized, Get, JsonController } from 'routing-controllers';
import { Service } from 'typedi';

@Authorized()
@JsonController("/test")
@Service()
export class TestController {

    @Get('/pages')
    async pagesController(): Promise<any> {
        return JSON.parse(JSON.stringify({ Pages: "Pages" }))
    }
}