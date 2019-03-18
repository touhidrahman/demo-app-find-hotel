import { Component, OnInit } from '@angular/core';
import { HotelsService } from 'src/app/shared/services/hotels.service';
import { RoomService } from 'src/app/shared/services/room.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Hotel } from 'src/app/shared/models/hotel';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-hotel-details',
    templateUrl: './hotel-details.component.html',
    styleUrls: [ './hotel-details.component.css' ],
})
export class HotelDetailsComponent implements OnInit {
    hotel$: Observable<Hotel>;

    constructor(
        private hotelsService: HotelsService,
        private roomService: RoomService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
    ) {}

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe((params) => {
            this.hotel$ = this.hotelsService.getHotel(params.get('id'));
        });
    }
}
