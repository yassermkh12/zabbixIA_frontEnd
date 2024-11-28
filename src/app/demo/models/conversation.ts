import { User } from "./user";

export interface Conversation {
    id: number;
    sessionId: string;
    usernameId: string;
    users: Array<User>;
}
