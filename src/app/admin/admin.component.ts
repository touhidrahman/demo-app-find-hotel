import { Component, OnInit } from '@angular/core';
import { HotelsService } from '../shared/services/hotels.service';
import { Observable } from 'rxjs';
import { Hotel } from '../shared/models/hotel';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: [ './admin.component.scss' ],
})
export class AdminComponent implements OnInit {
    hotels$: Observable<Array<Hotel>>;

    constructor(private hotelsService: HotelsService) {}

    ngOnInit() {
        this.loadHotels();
    }

    onDeleteHotel(hotel: Hotel) {
        // TODO: This will be a custom modal to confirm user actions. However, use simple alert for now
        const confirm = window.confirm('Are you sure to delete this hotel?');
        if (confirm) {
            this.hotelsService.deleteHotel(hotel.id).subscribe((value) => {
                this.loadHotels();
            });
        }
    }

    private loadHotels(): void {
        this.hotels$ = this.hotelsService.getHotels();
    }
}
