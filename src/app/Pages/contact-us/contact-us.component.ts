import { AfterViewInit, Component } from '@angular/core';
declare var AOS: any;
declare var feather: any;
@Component({
  selector: 'app-contact-us',
  imports: [],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    if (AOS) {
      AOS.init();
    }
    if (feather) {
      feather.replace();
    }
  }
}


