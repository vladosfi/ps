import { IImage } from '../shared/_interfaces/image';

export interface IPaintingDetails {
    id: string;
    name: string;
    description: string;
    nameGb: string;
    descriptionGb: string;
    nameDe: string;
    descriptionDe: string;
    nameRu: string;
    descriptionRu: string;
    categoryId: number;
    category: string;
    sizeX: number;
    sizeY: number;
    sizeXIn: number;
    sizeYIn: number;
    available: boolean;
    url: string;
    imageFileName: string;
    images?: IImage[];
    pervImageUrl: string;
    nextImageUrl: string;
}
