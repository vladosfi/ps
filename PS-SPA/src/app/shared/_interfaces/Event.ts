import { IImage } from "./image";

export interface IEvent {
    id: number;
    name: string;
    text: string;
    nameGb: string;
    textGb: string;
    nameDe: string;
    textDe: string;
    nameRu: string;
    textRu: string;
    author: string;
    createdOn: Date;
    mainImageUrl: string;
    images?: IImage[];
    imagesUrl: string[];
    imageFileName: string;
    isMain: boolean;
    eventDate: Date;
}
