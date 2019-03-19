import { Component, OnInit } from '@angular/core';
import { HotelsService, HotelFilter } from '../shared/services/hotels.service';
import { Observable } from 'rxjs';
import { Hotel } from '../shared/models/hotel';
import { Order } from '../shared/types/app.types';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-hotels',
    templateUrl: './hotels.component.html',
    styleUrls: [ './hotels.component.css' ],
})
export class HotelsComponent implements OnInit {
    distance: FormControl = new FormControl(1000);
    rating: FormControl = new FormControl(3);
    priceCategory: FormControl = new FormControl();

    hotels$: Observable<Array<Hotel>>;

    constructor(private hotelsService: HotelsService) {}

    ngOnInit() {
        this.hotels$ = this.hotelsService.getHotels();
        // this.hotels$ = this.hotelsService.getHotels({
        //     distance_to_venue: { value: 1500, sort: true, order: Order.Descending },
        // });
    }

    onApplyFilters() {
        const filter: HotelFilter = {};

        if (this.distance.value) {
            filter.distance_to_venue = {
                value: this.distance.value,
                sort: true,
            };
        }

        if (this.rating.value) {
            filter.rating = {
                value: this.rating.value,
                isGreaterThan: true,
            };
        }

        if (this.priceCategory.value) {
            filter.price_category = {
                value: this.priceCategory.value,
            };
        }

        this.hotels$ = this.hotelsService.getHotels(filter);
    }
}
