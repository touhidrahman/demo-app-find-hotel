import { Component } from '@angular/core';
import { HotelsService } from 'src/app/shared/services/hotels.service';
import { RoomService } from 'src/app/shared/services/room.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Hotel } from 'src/app/shared/models/hotel';
import { Room } from 'src/app/shared/models/room';
import { Order } from 'src/app/shared/types/app.types';

@Component({
    selector: 'app-hotel-details',
    templateUrl: './hotel-details.component.html',
    styleUrls: [ './hotel-details.component.css' ],
})
export class HotelDetailsComponent {
    rooms: Array<Room> = [];
    hotel: Hotel;
    loading = true;
    roomsIndex = 0;

    constructor(
        private hotelsService: HotelsService,
        private roomService: RoomService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
    ) {
        this.activatedRoute.params.subscribe((params) => {
            if (params) {
                this.getHotel(params.id);
                this.loadRooms(params.id);
            }
        });
    }

    getHotel(id: string) {
        this.hotelsService.getHotel(id).subscribe((value) => {
            this.hotel = value;
            this.loading = false;
        });
    }

    loadRooms(id: string) {
        this.roomService
            .getRoomsForHotel(
                id,
                {
                    price_in_usd: {
                        value: 0,
                        isGreaterThan: true,
                        sort: true,
                        order: Order.Ascending,
                    },
                },
                { start: this.roomsIndex, limit: 2 },
            )
            .subscribe((value) => {
                this.rooms = this.rooms.concat(value);
                this.roomsIndex += 2;
            });
    }
}
