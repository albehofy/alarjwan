import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import * as AOS from 'aos';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [RouterLink],
})
export class HeaderComponent implements OnInit, OnDestroy {
  images = [
    { name: 'image', src: 'assets/images/header1.png' },
    { name: 'image', src: 'assets/images/header2.png' },
    { name: 'image', src: 'assets/images/header1.png' },
    { name: 'image', src: 'assets/images/header2.png' },
    { name: 'image', src: 'assets/images/header1.png' },
    { name: 'image', src: 'assets/images/header2.png' },
    { name: 'image', src: 'assets/images/header1.png' },
    { name: 'image', src: 'assets/images/header2.png' },
  ];

  image = this.images[0];
  previousImage = this.images[0];
  fade = false;

  subscription!: Subscription;
  index = 0;

  ngOnInit() {
    this.subscription = interval(4000).subscribe(() => {
      this.previousImage = JSON.parse(JSON.stringify(this.image));
      this.index++;
      if (this.index >= this.images.length) {
        this.index = 0;
      }
      this.image = this.images[this.index];
      // this.fade = !this.fade; // toggle fade class to trigger transition
    });
    AOS.init({
      // Global settings:
      disable: false,
      startEvent: 'DOMContentLoaded',
      initClassName: 'aos-init',
      animatedClassName: 'aos-animate',
      useClassNames: false,
      disableMutationObserver: false,
      debounceDelay: 50,
      throttleDelay: 99,

      // Element settings:
      offset: 120,
      delay: 0,
      duration: 400,
      easing: 'ease',
      once: false,
      mirror: false,

      // Anchor placement:
      anchorPlacement: 'top-bottom',
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  toggleNavbar() {
    const navbar = document.querySelector('.navbar');
    navbar?.classList.toggle('active');
  }
}
