import { Action } from 'routing-controllers';
const jwt = require('jsonwebtoken');

export const authChecker = async (action: Action, roles: string[]) => {
    let token = action.request.headers['authorization'];
    token = token.slice(7, token.length).trimLeft();

    if (!!jwt.verify(token, process.env["JWT_SECRET"])) return true;

    throw new Error("Not Authorized");
}