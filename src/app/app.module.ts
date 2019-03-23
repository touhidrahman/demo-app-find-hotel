import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HotelsComponent } from './hotels/hotels.component';
import { HotelDetailsComponent } from './hotels/hotel-details/hotel-details.component';
import { AdminComponent } from './admin/admin.component';
import { CreateHotelComponent } from './hotels/create-hotel/create-hotel.component';
import { BookingDetailsComponent } from './bookings/booking-details/booking-details.component';

@NgModule({
    declarations: [
        AppComponent,
        HotelsComponent,
        HotelDetailsComponent,
        AdminComponent,
        CreateHotelComponent,
        BookingDetailsComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
    ],
    providers: [],
    bootstrap: [ AppComponent ],
})
export class AppModule {}
