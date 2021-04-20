import { IImage } from "src/app/shared/_interfaces/image";

export interface IEvent {
    id: number;
    name: string;
    text: string;
    createdOn: Date;
    isMain: boolean;
    images?: IImage[];
}
