import { Component, inject, OnInit } from '@angular/core';
import { HomeComponentService } from '../../Services/home.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
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
