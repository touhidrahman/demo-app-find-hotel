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
        this.hotels$ = this.hotelsService.getHotels();
    }
}
