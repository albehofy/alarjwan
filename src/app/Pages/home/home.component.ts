import { SubscriptionService } from './../../Services/subscription.service';
import { Component, OnInit } from '@angular/core';
import { SeparatorComponent } from './separator/separator.component';
import { HeaderComponent } from '../../Components/header/header.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';


// import * as AOS from 'aos';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SeparatorComponent, HeaderComponent, RouterLink , CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  {
    packages: any[] = [];
   constructor(
    private SubscriptionService: SubscriptionService
  ) { }

  ngOnInit() {
    this.loadPackages();
  }

  loadPackages(): void {
    this.SubscriptionService.getAllPackages().subscribe({
      next: (packages) => {
        console.log('Packages loaded:', packages);
        this.packages = packages;
      },
      error: (err: any) => {
        console.error('Error loading packages:', err);
      }
    });
  }


  scrollToSection(sectionId: string) {
  const el = document.getElementById(sectionId);
  if (el) {
    const yOffset = -80; // optional offset for fixed header
    const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}
}
