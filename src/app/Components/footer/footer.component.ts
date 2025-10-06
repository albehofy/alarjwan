import { Component, inject, OnInit } from '@angular/core';
import { HomeComponentService } from '../../Services/home.service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit{
  private settings = inject(HomeComponentService)
  ngOnInit() {
    this.settings.getSiteSetting().subscribe({
      next:(res)=>{
        console.log(res)
      }
    })
  }
}
