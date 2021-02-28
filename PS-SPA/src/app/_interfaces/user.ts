import { IPhoto } from "./photo";

export interface IUser {
    id: number;
    username: string;
    knownAs: string;
    age: number;
    gender: string;
    created: Date;
    lastActive: Date;
    photoUrl: string;
    city: string;
    country: string; 
    interests?: string;
    introduction?: string;
    photos?: IPhoto[];
}
