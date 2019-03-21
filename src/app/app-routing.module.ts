import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HotelsComponent } from './hotels/hotels.component';
import { HotelDetailsComponent } from './hotels/hotel-details/hotel-details.component';
import { AdminComponent } from './admin/admin.component';

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
