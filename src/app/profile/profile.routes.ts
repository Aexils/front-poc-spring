import { Routes } from '@angular/router';
import {ProfileDashboardComponent} from './dashboard/components/dashboard.component';
import {ProfileUserComponent} from './user/components/user.component';
import {ProfileLayoutComponent} from './layout/components/layout.component';


export const profileRoutes: Routes = [
  {
    path: '',
    component: ProfileLayoutComponent, // Layout qui contient la sidebar
    children: [
      { path: '', component: ProfileDashboardComponent },
      { path: 'user', component: ProfileUserComponent }
      // tu peux ajouter d'autres sections ici : commandes, adresses, etc.
    ]
  }
];
