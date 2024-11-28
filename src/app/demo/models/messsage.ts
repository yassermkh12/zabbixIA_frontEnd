import { Conversation } from "./conversation";
import { User } from "./user";

export interface Messsage {
    id: number;
    users: Array<User>; 
    content: string;
    timestamp: string;
    conversation: Conversation; 
}
