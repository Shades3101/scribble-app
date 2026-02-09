import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"

const SECRET_ENV = process.env.JWT_SECRET;

if (!SECRET_ENV) {
    throw new Error("JWT_SECRET environment variable is required");
}

export const SECRET: string = SECRET_ENV;

export function authMiddleware(req: Request, res: Response, next: NextFunction) {

    const authHeader = req.headers["authorization"] ?? "";
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

    try {
        const vtoken = jwt.verify(token, SECRET) as JwtPayload;

        if (vtoken && vtoken.userId) {
            req.userId = vtoken.userId;
            next()
        } else {
            res.status(401).json({
                msg: "Unauthorized"
            })
        }
    } catch (e) {
        res.status(401).json({
            msg: "Unauthorized"
        })
    }
} 