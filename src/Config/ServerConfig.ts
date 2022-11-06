import "reflect-metadata";
import { createExpressServer } from 'routing-controllers';
import { exportControllers } from "../Controllers";
import { authChecker } from "../Validations/AuthChecker";

// creates express app, registers all controller routes and returns you express app instance
export const server = () => {
    const app = createExpressServer({
        controllers: exportControllers, // we specify controllers we want to use
        authorizationChecker: authChecker
    });
    const port = process.env["PORT"]
    // run express application on port 3000
    app.listen(port);

    console.log(`Server is listening on Port ${port}`);
}

