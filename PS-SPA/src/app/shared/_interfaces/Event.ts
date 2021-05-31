import { IImage } from "./image";

export interface IEvent {
    id: number;
    name: string;
    text: string;
    author: string;
    createdOn: Date;
    //mainImage?: IImage;
    mainImageUrl: string;
    images?: IImage[];
    imagesUrl: string[];
    imageFileName: string;
    isMain: boolean;
}
