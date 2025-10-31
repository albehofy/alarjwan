import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MenuService } from '../../Services/menu.service';
import { RouterLink } from '@angular/router';

interface CartItem {
  name: string;
  id: string;
  quantity: number;
  price?: number;
}

interface Dish {
  name: string;
  desc: string;
  img: string;
  price: number;
  id: number;
  quantity: number;
}

@Component({
  selector: 'app-global-menu',
  templateUrl: './global-menu.component.html',
  styleUrls: ['./global-menu.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink],
})
export class GlobalMenuComponent implements OnInit {
  cartItems: CartItem[] = [];
  cartTotal: number = 0;
  showCart: boolean = false;

  cuisineTitle = 'المأكولات العالمية';
  cuisineSubtitle = 'اكتشف أطباق لذيذة من حول العالم';
  cuisineBgImage = "linear-gradient(rgba(99, 115, 89, 0.8), rgba(99, 115, 89, 0.8)), url('http://static.photos/food/1200x630/401')";

  selectedDish: Dish | null = null;
  showDishModal: boolean = false;

  menuData: any[] = [];
  categories: any = [];
  activeSectionId: any = null;
  showDetails: boolean = false;

  constructor(
    private MenuService: MenuService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCartFromStorage();
    this.loadAllMenuData();
  }

  // 🔹 Load menu data
  loadAllMenuData(): void {
    this.MenuService.getAllMenuData().subscribe({
      next: (data) => {
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

        if (this.menuData.length) {
          this.cuisineTitle = this.menuData[0].name;
          this.cuisineBgImage = this.menuData[0].image;
        }
      },
      error: (err: any) => {
        console.error('Error loading packages:', err);
      },
    });
  }

  // 🔹 Update cuisine header when clicking on slider
  updateCuisineHeader(name: string, imageUrl: string): void {
    this.cuisineTitle = `مأكولات ${name}`;
    this.cuisineSubtitle = `اكتشف أطباق ${name} اللذيذة`;
    this.cuisineBgImage = `linear-gradient(rgba(99, 115, 89, 0.8), rgba(99, 115, 89, 0.8)), url('${imageUrl}')`;
  }

  // 🔹 Add to cart
  addToOrder(id: any, name: any, quantity: any, price: any): void {
    this.cartItems.push({ name: name, id: id, quantity: 1, price: price });
    this.updateCartStorage();
    this.showCart = true;
  }

  // 🔹 View cart modal
  viewCart(): void {
    this.showCart = true;
  }

  closeCartModal(): void {
    this.showCart = false;
  }

  proceedToCheckout(): void {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    localStorage.setItem('cartTotal', this.cartTotal.toString());
    this.router.navigate(['/confirm-order']);
  }

  removeFromCart(index: number): void {
    this.cartItems.splice(index, 1);
    this.updateCartStorage();
    if (this.cartItems.length === 0) this.showCart = false;
  }

  private updateCartStorage(): void {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    this.cartTotal = this.cartItems.reduce((sum, item) => sum + (item.price || 0), 0);
    localStorage.setItem('cartTotal', this.cartTotal.toString());
  }

  private loadCartFromStorage(): void {
    const savedItems = localStorage.getItem('cartItems');
    const savedTotal = localStorage.getItem('cartTotal');
    if (savedItems) {
      try {
        this.cartItems = JSON.parse(savedItems);
        this.cartTotal = savedTotal ? parseFloat(savedTotal) : 0;
      } catch {
        this.cartItems = [];
        this.cartTotal = 0;
      }
    }
  }

  // 🔹 Dish modal functions
  openDishModal(dish: Dish): void {
    this.selectedDish = dish;
    this.showDishModal = true;
  }

  closeDishModal(): void {
    this.selectedDish = null;
    this.showDishModal = false;
  }

  // 🔹 Scroll to section smoothly
  scrollToSection(sectionId: any): void {
    const element = document.getElementById('section-' + sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // 🔹 Detect current visible section to highlight active tab
  @HostListener('window:scroll', [])
  onScroll(): void {
    for (const section of this.categories) {
      const el = document.getElementById('section-' + section.id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
          this.activeSectionId = section.id;
          break;
        }
      }
    }
  }

  // // 🔹 Go back to home
  // goBack(): void {
  //   this.router.navigate(['/home']);
  // }
  
}
