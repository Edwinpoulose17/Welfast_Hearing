import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HearingAidsComponent } from './pages/products/hearing-aids/hearing-aids.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { ServicesComponent } from './pages/services/services.component';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { BlogDetailComponent } from './pages/blog-detail/blog-detail.component'; // NEW COMPONENT
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { authGuard } from './Auth/auth.guard';
import { DetailedPageComponent } from './pages/detailed-page/detailed-page.component';
import { ProductDetailComponent } from './pages/products/product-detail/product-detail.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { FAQComponent } from './pages/faq/faq.component';

export const routes: Routes = [
  {
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
  },
  // NEW: Individual blog post routes
  {
    path: 'blog/:slug',
    component: BlogDetailComponent,
    // This will handle URLs like: /blog/best-hearing-aids-2024
  },
  {
    path: 'Admin-login',
    component: AdminLoginComponent,
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [authGuard]
  },
  {
    path: 'Contact-us',
    component: ContactUsComponent,
  },
  {
    path: 'Services',
    component: ServicesComponent,
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
  },
  {
    path: 'FAQ',
    component: FAQComponent,
  },
  {
    path: 'why-choose-welfast',
    component: DetailedPageComponent,
    data:{type:'why-choose-welfast'}
  },
  {
    path: 'product-details',
    component: ProductDetailComponent,
    data:{type:'product-details'}
  },
  {
    path: 'service-details',
    component: DetailedPageComponent,
    data:{type:'service'}
  },
  // Optional: Redirect old blog URLs to new format
  {
    path: 'blogs/:slug',
    redirectTo: 'blog/:slug',
    pathMatch: 'full'
  },
  // Catch-all route (should be last)
  {
    path: '**',
    redirectTo: ''
  }
];
