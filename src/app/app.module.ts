import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HotelsComponent } from './hotels/hotels.component';
import { HotelDetailsComponent } from './hotels/hotel-details/hotel-details.component';

@NgModule({
    declarations: [ AppComponent, HotelsComponent, HotelDetailsComponent ],
    imports: [ BrowserModule, AppRoutingModule, HttpClientModule ],
    providers: [],
    bootstrap: [ AppComponent ],
})
export class AppModule {}
