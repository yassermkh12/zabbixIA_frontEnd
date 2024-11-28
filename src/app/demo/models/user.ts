import { Message } from './message';
import { Role } from './role';

export interface User {
    id: number;
    name: string;
    image: string;
    status: string;
    messages: Message[];
    lastSeen: string;

    email: string;
    username: string;
    password: string;
    roles: Array<Role>;
    firstName: string;
    lastName: string;
    verificationCode: number,
    verificationCodeExpiration: string,
}