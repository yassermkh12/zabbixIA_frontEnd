import { Conversation } from "./conversation";
import { User } from "./user";

export interface Messsage {
    id: number;
    users: Array<User>; 
    content: string;
    timestamp: Date;
    conversation: Conversation;
    contenuMessageTest : string;
    contenuAffichage: boolean;
    severityCounts: {
        notClassified: number;
        information: number;
        warning: number;
        average: number;
        high: number;
        disaster: number;
    };
}
