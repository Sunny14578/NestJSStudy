import { Long } from "typeorm";

export type SignupResDto = {
    id: number;
    name: string;
    email: string;
    phone: string;
}