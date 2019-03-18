import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelsComponent } from './hotels.component';
import { HotelDetailsComponent } from './hotel-details/hotel-details.component';

@NgModule({
    imports: [ CommonModule ],
    declarations: [ HotelsComponent, HotelDetailsComponent ],
})
export class HotelsModule {}
