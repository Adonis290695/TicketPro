import { Request } from "express";

export interface authRequest extends Request{
    usuario?: {
        id:string;
        email: string;
        role:"USER" | "ADMIN";
    };
}