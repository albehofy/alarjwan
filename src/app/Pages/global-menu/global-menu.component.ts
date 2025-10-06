import { MenuService } from './../../Services/menu.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface CartItem {
  name: string;
  id: string;
  quantity:number, 
  price?:number;
}

interface Dish {
  name: string;
  desc: string;
  img: string;
  price: number;
  id: number , 
  quantity:number,
}

@Component({
  selector: 'app-global-menu',
  templateUrl: './global-menu.component.html',
  styleUrls: ['./global-menu.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class GlobalMenuComponent implements OnInit {
  cartItems: CartItem[] = [];
  cartTotal: number = 0;
  showCart: boolean = false;

  cuisineTitle = 'المأكولات العالمية';
  cuisineSubtitle = 'اكتشف أطباق لذيذة من حول العالم';
  cuisineBgImage = "linear-gradient(rgba(99, 115, 89, 0.8), rgba(99, 115, 89, 0.8)), url('http://static.photos/food/1200x630/401')";

  // Dish Modal State
  selectedDish: Dish | null = null;
  showDishModal: boolean = false;

  menuData: any[] = [];
  dishes: Dish[] = [];
  categories: any = []
  constructor(
    private MenuService: MenuService,
    private router: Router
  ) { }

  AllLists: Array<any> = []

  ngOnInit(): void {
    this.loadCartFromStorage();
    this.loadAllMenuData();
  }
loadAllMenuData(): void {
  this.MenuService.getAllMenuData().subscribe({
    next: (data) => {
      this.categories = data.flatMap((menu: any) =>
        menu.menu.map((cat: any) => ({
          id: cat.id ?? '0',
          name: cat.name,
          description: cat.description,
          dishes: cat.items.map((dish: any) => ({
            id: dish.id ?? '0',
            name: dish.name,
            desc: dish.description,
            img: dish.image,
            price: dish.price
          }))
        }))
      );

      // save for slider
      this.menuData = data.map((menu: any) => ({
        name: menu.menuName,
        image: menu.image,
        thumb: menu.image
      }));

      console.log('Packages loaded:', this.categories);
      this.cuisineTitle = this.menuData[0].name;
      this.cuisineBgImage= this.menuData[0].iamge
    },
    error: (err: any) => {
      console.error('Error loading packages:', err);
    }
  });
}


  updateCuisineHeader(name: string, imageUrl: string): void {
    this.cuisineTitle = `مأكولات ${name}`;
    this.cuisineSubtitle = `اكتشف أطباق ${name} اللذيذة`;
    this.cuisineBgImage = `linear-gradient(rgba(99, 115, 89, 0.8), rgba(99, 115, 89, 0.8)), url('${imageUrl}')`;
  }

  addToOrder(id: any, name:any ,quantity: any, price:any): void {
    this.cartItems.push({ name:name, id:id,quantity:1,price:price });
    this.updateCartStorage();
    this.showCart = true;
  }

  viewCart(): void {
    this.showCart = true;
  }

  closeCartModal(): void {
    this.showCart = false;
  }

  proceedToCheckout(): void {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    localStorage.setItem('cartTotal', this.cartTotal.toString());
    // window.location.href = 'checkout.html';
    this.router.navigate(['/confirm-order'])
  }

  // 🆕 Remove item from cart
  removeFromCart(index: number): void {
    this.cartItems.splice(index, 1);
    this.updateCartStorage();

    // Auto-close cart if empty
    if (this.cartItems.length === 0) {
      this.showCart = false;
    }
  }

  // 📦 Save cart state
  private updateCartStorage(): void {
    debugger;
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    this.cartTotal = this.cartItems.reduce((sum, item) => sum + (item.price||0), 0);
    localStorage.setItem('cartTotal', this.cartTotal.toString());
  }

  // 🔄 Load saved cart
  private loadCartFromStorage(): void {
    const savedItems = localStorage.getItem('cartItems');
    const savedTotal = localStorage.getItem('cartTotal');

    if (savedItems) {
      try {
        this.cartItems = JSON.parse(savedItems);
        this.cartTotal = savedTotal ? parseFloat(savedTotal) : 0;
      } catch (e) {
        console.error('Failed to parse cart from local storage', e);
        this.cartItems = [];
        this.cartTotal = 0;
      }
    }
  }

  // 🧾 Dish Modal Functions
  openDishModal(dish: Dish): void {
    this.selectedDish = dish;
    this.showDishModal = true;
  }

  closeDishModal(): void {
    this.selectedDish = null;
    this.showDishModal = false;
  }
}
