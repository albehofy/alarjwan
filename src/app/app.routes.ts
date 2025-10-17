import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { AboutComponent } from './Pages/about/about.component';
import { ContactUsComponent } from './Pages/contact-us/contact-us.component';
import { SubscriptionComponent } from './Pages/subscription/subscription.component';
import { GlobalMenuComponent } from './Pages/global-menu/global-menu.component';
import { OrderPageComponent } from './Pages/order-page/order-page.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { LayoutComponent } from './Pages/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'subscription/:id', component: SubscriptionComponent },
      { path: 'contact-us', component: ContactUsComponent },
      { path: 'menu', component: GlobalMenuComponent },
      { path: 'confirm-order', component: OrderPageComponent },
    ],
  },

  // 👇 This handles ALL React dashboard paths
  {
    path: 'dashboard',
    component: DashboardComponent,
    children:[
      {
  path: '**',
  component: DashboardComponent,
},
    ]
  },
  {
    path: 'dashboard/**', // 👈 wildcard — anything under /dashboard will load React
    component: DashboardComponent,
  },

  // Optional: fallback route
  { path: '**', redirectTo: '' },
];
