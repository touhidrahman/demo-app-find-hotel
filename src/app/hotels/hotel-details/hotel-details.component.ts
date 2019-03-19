import { Component, OnInit } from '@angular/core';
import { HotelsService } from 'src/app/shared/services/hotels.service';
import { RoomService } from 'src/app/shared/services/room.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Hotel } from 'src/app/shared/models/hotel';
import { Observable } from 'rxjs';
import { Room } from 'src/app/shared/models/room';
import { Order } from 'src/app/shared/types/app.types';

@Component({
    selector: 'app-hotel-details',
    templateUrl: './hotel-details.component.html',
    styleUrls: [ './hotel-details.component.css' ],
})
export class HotelDetailsComponent implements OnInit {
    hotel$: Observable<Hotel>;
    rooms$: Observable<Array<Room>>;

    constructor(
        private hotelsService: HotelsService,
        private roomService: RoomService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
    ) {}

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe((params) => {
            this.hotel$ = this.hotelsService.getHotel(params.get('id'));
            // this.rooms$ = this.roomService.getRoomsForHotel(params.get('id'));
        });
        this.rooms$ = this.roomService.getRoomsWithFilter({
            price_in_usd: { value: 350, isGreaterThan: true, sort: true, order: Order.Descending },
            max_occupancy: { value: 2, isGreaterThan: true, sort: true, order: Order.Descending },
        });
    }
}
