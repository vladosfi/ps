import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable()
export class ImageService {
    baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    setMainImage(eventId: number, imageId: string) {
        return this.http.post(this.baseUrl + `events/${eventId}/setMainImage/${imageId}`, {});
    }

    deleteImage(eventId: number, imageId: string) {
        return this.http.delete(this.baseUrl + `events/${eventId}/delete/${imageId}`);
    }
}
