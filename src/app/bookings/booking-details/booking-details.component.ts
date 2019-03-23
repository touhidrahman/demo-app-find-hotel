import { Component, OnInit } from '@angular/core';
import { HotelsService } from 'src/app/shared/services/hotels.service';
import { RoomService } from 'src/app/shared/services/room.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Room } from 'src/app/shared/models/room';
import { Hotel } from 'src/app/shared/models/hotel';

@Component({
    selector: 'app-booking-details',
    templateUrl: './booking-details.component.html',
    styleUrls: [ './booking-details.component.css' ],
})
export class BookingDetailsComponent implements OnInit {
    room: Room;
    hotel: Hotel;

    // mock dates for check in / out
    today = new Date();
    dayAfterTomorrow = new Date(this.today.valueOf()).setDate(
        this.today.getDate() + 2,
    );

    constructor(
        private hotelsService: HotelsService,
        private roomService: RoomService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
    ) {
        this.activatedRoute.params.subscribe((params) => {
            if (params) {
                this.getRoom(params.id);
            }
        });
    }

    ngOnInit() {}

    private getRoom(id: string) {
        this.roomService.getRoom(id).subscribe((room) => {
            this.room = room;
            this.getHotel(room.hotelId);
        });
    }

    private getHotel(id: string): void {
        this.hotelsService.getHotel(id).subscribe((hotel) => {
            this.hotel = hotel;
        });
    }
}
