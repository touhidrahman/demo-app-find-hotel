import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Hotel, PriceCategory } from '../models/hotel';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Order } from '../types/app.types';

const BASE_URL = environment.apiURL + 'hotels';

interface HotelFilter {
    rating?: { isGreaterThan?: boolean; value: number; sort?: boolean; order?: Order };
    distance_to_venue?: { isGreaterThan?: boolean; value: number; sort?: boolean; order?: Order };
    price_category?: { value: PriceCategory };
}

@Injectable({
    providedIn: 'root',
})
export class HotelsService {
    constructor(private http: HttpClient) {}

    getHotels(filter?: HotelFilter): Observable<Array<Hotel>> {
        const params = this.buildFilters(filter);
        return this.http.get<Array<Hotel>>(BASE_URL, { params });
    }

    getHotel(id: string): Observable<Hotel> {
        return this.http.get<Hotel>(`${BASE_URL}/${id}`);
    }

    updateHotel(id: string, data: Hotel | Partial<Hotel>): Observable<Hotel> {
        return this.http.put<Hotel>(`${BASE_URL}/${id}`, data);
    }

    deleteHotel(id: string): Observable<any> {
        return this.http.delete<Hotel>(`${BASE_URL}/${id}`);
    }

    private buildFilters(filter: HotelFilter): HttpParams {
        let params = new HttpParams();
        const sortItems = [];
        const orderItems = [];

        if (filter && filter.rating) {
            let ratingFilter = 'rating';
            filter.rating.isGreaterThan ? (ratingFilter += '_gte') : (ratingFilter += '_lte');
            if (filter.rating.sort) {
                sortItems.push('rating');
                orderItems.push(filter.rating.order ? filter.rating.order : Order.Ascending);
            }
            params = params.set(ratingFilter, filter.rating.value.toString());
        }

        if (filter && filter.distance_to_venue) {
            let distanceFilter = 'distance_to_venue';
            filter.distance_to_venue.isGreaterThan ? (distanceFilter += '_gte') : (distanceFilter += '_lte');
            if (filter.distance_to_venue.sort) {
                sortItems.push('distance_to_venue');
                orderItems.push(filter.distance_to_venue.order ? filter.distance_to_venue.order : Order.Ascending);
            }

            params = params.set(distanceFilter, filter.distance_to_venue.value.toString());
        }

        if (filter && filter.price_category) {
            params = params.set('price_category', filter.price_category.value);
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
