import { Component, OnInit } from '@angular/core';
import { HotelsService } from '../shared/services/hotels.service';
import { Observable } from 'rxjs';
import { Hotel } from '../shared/models/hotel';

@Component({
    selector: 'app-hotels',
    templateUrl: './hotels.component.html',
    styleUrls: [ './hotels.component.css' ],
})
export class HotelsComponent implements OnInit {
    hotels$: Observable<Array<Hotel>>;

    constructor(private hotelsService: HotelsService) {}

    ngOnInit() {
        this.hotels$ = this.hotelsService.getHotels();
    }
}
