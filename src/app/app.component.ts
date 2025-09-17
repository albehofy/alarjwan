import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./Pages/home/home.component";
import * as AOS from 'aos';
import { LoaderComponent } from "./Components/loader/loader.component";
import { FooterComponent } from "./Components/footer/footer.component";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'alarjwan';
  isLoading = true;

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false
    }, 2000);
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
      anchorPlacement: 'top-bottom'
    });
  }
}
