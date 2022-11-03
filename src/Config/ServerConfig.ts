import "reflect-metadata"
import { createExpressServer } from 'routing-controllers';
import { UserController } from '../Controllers/UserController';

// creates express app, registers all controller routes and returns you express app instance
export const server = () => {
    const app = createExpressServer({
        controllers: [UserController], // we specify controllers we want to use
    });
    const port = process.env["PORT"]
    // run express application on port 3000
    app.listen(port);

    console.log(`Server is listening on Port ${port}`);
}

