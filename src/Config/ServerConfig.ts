import "reflect-metadata";
import { createExpressServer, useContainer } from 'routing-controllers';
import { authChecker } from "../Validations/AuthChecker";
import { Container } from 'typedi';

// creates express app, registers all controller routes and returns you express app instance
export const server = (dirname: string) => {

    useContainer(Container);

    const app = createExpressServer({
        cors: {
            origin: "*",
            methods: "GET,PUT,POST,DELETE",
        },
        controllers: [dirname + "/Controllers/*.ts"], // we specify controllers we want to use
        authorizationChecker: authChecker,
    });
    const port = process.env["PORT"]
    // run express application on port 3000
    app.listen(port);

    console.log(`Server is listening on Port ${port}`);
}

