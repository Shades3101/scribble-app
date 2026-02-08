import { JWT_SECRET } from "@repo/backend-common/config";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"

export function authMiddleware(req: Request, res: Response, next: NextFunction) {

    const authHeader = req.headers["authorization"] ?? "";
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

    try {
        const vtoken = jwt.verify(token, JWT_SECRET) as JwtPayload;

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