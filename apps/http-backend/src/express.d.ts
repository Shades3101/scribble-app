import "express";

// Extend the Request interface to include the 'email' property
declare global {
    namespace Express {
        interface Request {
            userId?:string
        }
    }
}

export {};