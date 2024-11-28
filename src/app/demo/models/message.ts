import { User } from "./user";

export interface Message {
    text: string;
    ownerId: number,
    createdAt: number;

    // id: number;
    // users: Array<User>;     // Ou utilisez Array<User> si vous préférez une liste
    // content: string;
    // timestamp: string; 
}