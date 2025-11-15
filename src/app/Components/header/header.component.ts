import { Component, OnInit, OnDestroy, inject, Output, EventEmitter } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import * as AOS from 'aos';
import { RouterLink } from '@angular/router';
import { HomeComponentService } from '../../Services/home.service';

interface backgroundInterface {
  name: string,
  src: string
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [RouterLink],
})
export class HeaderComponent implements OnInit, OnDestroy {
  header = '';
  description = '';
  title = '';
  hasSubscription= false; 

  images: Array<backgroundInterface> = [
  ];

  image = this.images[0];
  previousImage = this.images[0];
  fade = false;

  subscription!: Subscription;
  index = 0;



  private homeService = inject(HomeComponentService)

  ngOnInit() {
    this.homeService.getHomeData().subscribe({
      next: (res) => {
        console.log(res)
        this.header = res.header;
        this.description = res.description;
        this.title = res.title
        this.images = res.images.map((img: string, index: number = 0) => ({
          name: `image ${++index} for slider`,
          src: img
        }))

      }
    })
    if (this.images.length > 0) {
      this.hasSubscription = true; 
      this.subscription = interval(4000).subscribe(() => {
        this.previousImage = JSON.parse(JSON.stringify(this.image));
        this.index++;
        if (this.index >= this.images.length) {
          this.index = 0;
        }
        this.image = this.images[this.index];
        // this.fade = !this.fade; // toggle fade class to trigger transition
      });
    }
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
    if(this.hasSubscription){
      this.subscription.unsubscribe();
    }
  }

  toggleNavbar() {
    const navbar = document.querySelector('.navbar');
    navbar?.classList.toggle('active');
  }

  @Output() scrollToSection = new EventEmitter<string>();

  scroll(sectionId: string) {
    this.scrollToSection.emit(sectionId);
  }
}
