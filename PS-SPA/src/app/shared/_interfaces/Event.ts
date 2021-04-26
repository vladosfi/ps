import { IImage } from "./image";

export interface IEvent {
    id: number;
    name: string;
    text: string;
    createdOn: string;
    mainImage?: IImage;
    images?: IImage[];
    imageFileName: string;
}
