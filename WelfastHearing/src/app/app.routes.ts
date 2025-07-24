import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

import { HearingAidsComponent } from './pages/hearing-aids/hearing-aids.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { ServicesComponent } from './pages/services/services.component';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { authGuard } from './Auth/auth.guard';

export const routes: Routes = [{
  path: '',
  component: HomeComponent,
  pathMatch: 'full'
},

{
  path: 'Hearing-aids',
  component: HearingAidsComponent,

},

{
  path: 'Blogs',
  component: BlogsComponent,

},{
  path: 'Admin-login',
  component: AdminLoginComponent,

},
{
  path: 'admin-dashboard',
  component: AdminDashboardComponent,
  canActivate:[authGuard]

},

{
  path: 'Contact-us',
  component: ContactUsComponent,
},

{
  path: 'Services',
  component: ServicesComponent,
},

];
