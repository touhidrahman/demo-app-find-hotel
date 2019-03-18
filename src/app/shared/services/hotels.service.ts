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
}
