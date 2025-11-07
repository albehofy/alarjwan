import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./Pages/home/home.component";
import * as AOS from 'aos';
import { LoaderComponent } from "./Components/loader/loader.component";
import { FooterComponent } from "./Components/footer/footer.component";
import { MenuService } from './Services/menu.service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'alarjwan';
  isLoading = true;
  menuData = [];
  categories = [];

  constructor(private MenuService: MenuService) { }

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

    if (localStorage.getItem('menuData')) {
      this.menuData = JSON.parse(localStorage.getItem('menuData') || '[]');
      this.MenuService.Menu.next({ menuData: this.menuData })

    }
    if (localStorage.getItem('categories')) {
      this.categories = JSON.parse(localStorage.getItem('categories') || '[]');
      this.MenuService.Menu.next({ categories: this.categories })
    }
    // Load menu data
    this.loadAllMenuData();
  }
  loadAllMenuData(): void {
    this.MenuService.getAllMenuData().subscribe({
      next: (data: any) => {
        this.categories = data.flatMap((menu: any) =>
          menu.menu.map((cat: any) => ({
            id: cat.id ?? '0',
            name: cat.name,
            description: cat.description,
            image: cat.image,
            dishes: cat.items.map((dish: any) => ({
              id: dish.id ?? '0',
              name: dish.name,
              desc: dish.description,
              img: dish.image,
              price: dish.price,
            })),
          }))
        );

        this.menuData = data.map((menu: any) => ({
          name: menu.menuName,
          image: menu.image,
          thumb: menu.image,
        }));

        localStorage.setItem('menuData', JSON.stringify(this.menuData))
        localStorage.setItem('categories', JSON.stringify(this.categories))
        this.MenuService.Menu.next({ menuData: this.menuData, categories: this.categories })
      },
      error: (err: any) => {
        console.error('Error loading packages:', err);
      },
    });
  }
}
