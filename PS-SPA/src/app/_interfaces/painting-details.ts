export interface IPaintingDetails {
    id: string;
    name: string;
    description: string;
    categoryId: number;
    sizeX: number;
    sizeY: number;
    available: boolean;
    imageUrl: string;
    pervImageUrl: string;
    nextImageUrl: string;
}
