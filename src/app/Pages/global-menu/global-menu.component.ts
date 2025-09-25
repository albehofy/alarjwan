import { MenuService } from './../../Services/menu.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CartItem {
  name: string;
  price: number;
}

interface Dish {
  name: string;
  desc: string;
  img: string;
  price: number;
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

     constructor(
    private MenuService: MenuService
  ) { }

  ngOnInit(): void {
    this.loadCartFromStorage();
    this.loadAllMenuData();
  }
  loadAllMenuData(): void {
      this.MenuService.getAllMenuData().subscribe({
      next: (data) => {
        console.log('Packages loaded:', data);
        this.menuData = data;
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

  addToOrder(name: string, price: number): void {
    this.cartItems.push({ name, price });
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
    window.location.href = 'checkout.html';
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
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    this.cartTotal = this.cartItems.reduce((sum, item) => sum + item.price, 0);
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
