import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Room } from '../models/room';

const BASE_URL = environment.apiURL + 'rooms';

@Injectable({
    providedIn: 'root',
})
export class RoomService {
    constructor(private http: HttpClient) {}

    getRooms(): Observable<Array<Room>> {
        return this.http.get<Array<Room>>(BASE_URL);
    }
}
