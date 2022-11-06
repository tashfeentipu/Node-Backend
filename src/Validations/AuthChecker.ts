import { Action } from 'routing-controllers';

export const authChecker = async (action: Action, roles: string[]) => {
    const token = action.request.headers['authorization'];

    if (token.slice(7, token.length).trimLeft() === "xyz") return true;

    throw new Error("Not Authorized");
}