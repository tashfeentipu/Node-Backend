import { Authorized, Get, JsonController } from 'routing-controllers';

@Authorized()
@JsonController("/test")
export class TestController {

    @Get('/pages')
    async pagesController(): Promise<any> {
        return JSON.parse(JSON.stringify({ Pages: "Pages" }))
    }
}