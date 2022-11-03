import { server } from "./Config/ServerConfig";
import { mongoConfig } from "./Config/MongoConfig";

export const initializeServer = () => {
    // Initialize DB
    mongoConfig()
    //Initialize Server
    server()
}
