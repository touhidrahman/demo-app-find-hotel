import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HotelsComponent } from './hotels/hotels.component';
import { HotelDetailsComponent } from './hotels/hotel-details/hotel-details.component';
import { AdminComponent } from './admin/admin.component';
import { CreateHotelComponent } from './hotels/create-hotel/create-hotel.component';

const routes: Routes = [
    {
        path: '',
        component: HotelsComponent,
    },
    {
        path: 'hotels',
        component: HotelsComponent,
    },
    {
        path: 'hotels/new',
        component: CreateHotelComponent,
    },
    {
        path: 'hotels/:id',
        component: HotelDetailsComponent,
    },
    {
        path: 'admin',
        component: AdminComponent,
    },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ],
})
export class AppRoutingModule {}
