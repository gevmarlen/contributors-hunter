import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './pages/cart/cart.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RepositoryComponent } from './pages/repository/repository.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: ':org/:repo',
    component: RepositoryComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
