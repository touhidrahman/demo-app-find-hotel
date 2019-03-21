import { Component, OnInit } from '@angular/core';
import { HotelsService } from 'src/app/shared/services/hotels.service';
import {
    FormGroup,
    FormBuilder,
    Validators,
    FormArray,
    FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-create-hotel',
    templateUrl: './create-hotel.component.html',
    styleUrls: [ './create-hotel.component.css' ],
})
export class CreateHotelComponent {
    hotel: FormGroup;
    amenitiesArr = [
        'free_parking',
        'free_wifi',
        'pets',
        'restaurant',
        'gym',
        'pool',
        'spa',
    ];
    v: any;

    constructor(
        private hotelsService: HotelsService,
        private formBuilder: FormBuilder,
        private router: Router,
    ) {
        this.hotel = this.formBuilder.group({
            name: [ '', Validators.required ],
            description: '',
            distance_to_venue: [
                null,
                Validators.compose([ Validators.min(0), Validators.max(4000) ]),
            ],
            rating: [
                null,
                Validators.compose([ Validators.min(0), Validators.max(5) ]),
            ],
            price_category: '',
            amenities: this.formBuilder.array(
                this.amenitiesArr.map((amenity) => {
                    return new FormControl(false);
                }),
            ),
        });
    }

    onSaveHotel() {
        const rawValue = this.hotel.value;
        // modify amenities array
        rawValue.amenities = this.getCheckedAmenities();

        this.hotelsService.createHotel(rawValue).subscribe((value) => {
            if (value) {
                window.alert('New hotel was created.');
                this.router.navigate([ '/admin' ]);
            }
        });
    }

    private getCheckedAmenities() {
        const checkedArray = this.hotel.get('amenities').value;
        const res = [];
        for (let i = 0; i <= this.amenitiesArr.length; i++) {
            if (checkedArray[i]) {
                res.push(this.amenitiesArr[i]);
            }
        }
        return res;
    }
}
