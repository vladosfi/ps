import { IImage } from "./image";

export interface IEvent {
    id: number;
    name: string;
    text: string;
    author: string;
    createdOn: string;
    //mainImage?: IImage;
    mainImageUrl: string;
    images?: IImage[];
    imageFileName: string;
}
