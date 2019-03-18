import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hotel } from '../models/hotel';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const BASE_URL = environment.apiURL + 'hotels';

@Injectable({
    providedIn: 'root',
})
export class HotelsService {
    constructor(private http: HttpClient) {}

    getHotels(): Observable<Array<Hotel>> {
        return this.http.get<Array<Hotel>>(BASE_URL);
    }

    getHotel(id: string): Observable<Hotel> {
        return this.http.get<Hotel>(`${BASE_URL}/${id}`);
    }

    updateHotel(id: string, data: Partial<Hotel>): Observable<Hotel> {
        return this.http.put<Hotel>(`${BASE_URL}/${id}`, data);
    }

    deleteHotel(id: string): Observable<any> {
        return this.http.delete<Hotel>(`${BASE_URL}/${id}`);
    }
}
