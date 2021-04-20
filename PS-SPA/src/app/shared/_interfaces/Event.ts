import { IImage } from "./image";

export interface IEvent {
    id: number;
    name: string;
    text: string;
    createdOn: string;
    images?: IImage[];
}
