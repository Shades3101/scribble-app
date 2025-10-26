import { JWT_SECRET } from "@repo/backend-common/config";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"

export function authMiddleware(req:Request, res: Response, next: NextFunction) {

    const token = req.headers["authorization"] ?? "";

    const vtoken = jwt.verify(token, JWT_SECRET) as JwtPayload;

    if(vtoken) {

        req.userId = vtoken.userId;
        next()
    }else {
        res.status(403).json({
            msg:"Unauthorized"
        })
    }


} 