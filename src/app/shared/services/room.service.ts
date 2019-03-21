import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Room } from '../models/room';
import { Order } from '../types/app.types';

const BASE_URL = environment.apiURL + 'rooms';

export interface RoomFilter {
    price_in_usd?: {
        isGreaterThan?: boolean;
        value: number;
        sort?: boolean;
        order?: Order;
    };
    max_occupancy?: {
        isGreaterThan?: boolean;
        value: number;
        sort?: boolean;
        order?: Order;
    };
}

export interface PaginationConfig {
    start: number;
    limit: number;
}

@Injectable({
    providedIn: 'root',
})
export class RoomService {
    constructor(private http: HttpClient) {}

    getRooms(): Observable<Array<Room>> {
        return this.http.get<Array<Room>>(BASE_URL);
    }

    getRoomsForHotel(
        hotelId: string,
        filter?: RoomFilter,
        pagination?: PaginationConfig,
    ): Observable<Array<Room>> {
        let params = this.buildFilters(filter);
        params = params.set('hotelId', hotelId);

        if (pagination.start) {
            params = params.set('_start', pagination.start.toString());
        }
        if (pagination.limit) {
            params = params.set('_limit', pagination.limit.toString());
        }

        return this.http.get<Array<Room>>(BASE_URL, { params });
    }

    getRoomsWithFilter(filter: RoomFilter): Observable<Array<Room>> {
        const params = this.buildFilters(filter);

        return this.http.get<Array<Room>>(BASE_URL, { params });
    }

    updateRoom(id: string, toUpdate: Room | Partial<Room>): Observable<Room> {
        return this.http.put<Room>(`${BASE_URL}/${id}`, toUpdate);
    }

    deleteRoom(id: string): Observable<any> {
        return this.http.delete<Room>(`${BASE_URL}/${id}`);
    }

    getRoom(id: string): Observable<Room> {
        return this.http.get<Room>(`${BASE_URL}/${id}`);
    }

    private buildFilters(filter: RoomFilter): HttpParams {
        let params = new HttpParams();
        const sortItems = [];
        const orderItems = [];

        if (filter && filter.price_in_usd) {
            let priceFilter = 'price_in_usd';
            filter.price_in_usd.isGreaterThan
                ? (priceFilter += '_gte')
                : (priceFilter += '_lte');
            if (filter.price_in_usd.sort) {
                sortItems.push('price_in_usd');
                orderItems.push(
                    filter.price_in_usd.order
                        ? filter.price_in_usd.order
                        : Order.Ascending,
                );
            }
            params = params.set(
                priceFilter,
                filter.price_in_usd.value.toString(),
            );
        }

        if (filter && filter.max_occupancy) {
            let occupyFilter = 'max_occupancy';
            filter.max_occupancy.isGreaterThan
                ? (occupyFilter += '_gte')
                : (occupyFilter += '_lte');
            if (filter.max_occupancy.sort) {
                sortItems.push('max_occupancy');
                orderItems.push(
                    filter.max_occupancy.order
                        ? filter.max_occupancy.order
                        : Order.Ascending,
                );
            }

            params = params.set(
                occupyFilter,
                filter.max_occupancy.value.toString(),
            );
        }

        if (sortItems.length > 0) {
            params = params.set('_sort', sortItems.join(','));
        }
        if (orderItems.length > 0) {
            params = params.set('_order', orderItems.join(','));
        }

        return params;
    }
}
