import { Component, OnInit } from '@angular/core';
import { SeparatorComponent } from "./separator/separator.component";
import { HeaderComponent } from "../../Components/header/header.component";
import { RouterLink } from '@angular/router';

// import * as AOS from 'aos';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SeparatorComponent, HeaderComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  cats = [
    {
      name: 'snow leopard',
      binomial: 'Panthera uncia',
      photo: 'https://images.unsplash.com/photo-1546977532-4a61683ea4a0?w=1600'
    },
    {
      name: 'leopard',
      binomial: 'Panthera pardus',
      photo: 'https://images.unsplash.com/photo-1477949775154-d739b82400b3?w=1600'
    },
    {
      name: 'jaguar',
      binomial: 'Panthera onca',
      photo: 'https://images.unsplash.com/photo-1566544496485-02b11e54229b?w=1600'
    },
    {
      name: 'lion',
      binomial: 'Panthera leo',
      photo: 'https://images.unsplash.com/photo-1516740445505-4e35c7bd7c49?w=1600'
    },
    {
      name: 'tiger',
      binomial: 'Panthera tigris',
      photo: 'https://images.unsplash.com/photo-1569502166343-cf6039a40c9e?w=1600'
    }
  ];

 
}
