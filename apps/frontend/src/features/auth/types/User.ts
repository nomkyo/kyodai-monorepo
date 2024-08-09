import { Ticket } from "../../tickets/types/Ticket";

export type User ={
    email: string;
    address?: string;
    tickets: Ticket[];
};

export type UserResponse = {
    user: User;
}