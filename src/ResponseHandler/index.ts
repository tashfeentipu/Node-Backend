import { Success, Error } from "./Type";

export interface Response<T> extends Success<T>, Error {
    code: string
}

export const HttpStatusCodes = {
    OK: "200",
    CREATED: "201",
    UNAUTHORIZED: "401",
    NOT_FOUND: "404",
    INTERNAL_SERVER_ERROR: "500",

}