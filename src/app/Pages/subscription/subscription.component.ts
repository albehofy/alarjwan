import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SubscriptionService } from '../../Services/subscription.service';

interface MenuItem {
  name: string;
  description: string;
  image: string;
  count: number;
  disabled?: boolean;
}

interface Category {
  id: string;
  name: string;
  description: string;
  limit: number;
  items: MenuItem[];
  addons?: any[];
}

interface SelectedItem {
  id: string;
  categoryId: string;
  name: string;
  count: number;
}

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
})
export class SubscriptionComponent implements OnInit {
  packageId!: number;
  packageData: any;
  subscriptionName: string = '';
  numberOfPersons: number = 0;
  totalPrice: number = 0;
  constructor(
    private route: ActivatedRoute,
    private subscriptionService: SubscriptionService
  ) {}

  categories: Category[] = [];

  selectedItems: SelectedItem[] = [];
  showCart: boolean = false;

  ngOnInit(): void {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });
    this.loadpackageData();
  }

  loadpackageData(): void {
    this.packageId = Number(this.route.snapshot.paramMap.get('id'));
    this.subscriptionService.getPackageById(this.packageId).subscribe({
      next: (data) => {
        this.packageData = data;
        console.log('packageData', this.packageData);
        this.subscriptionName = this.packageData.name;
        this.numberOfPersons = this.packageData.persons;
        this.totalPrice = this.packageData.price;
        this.packageData.sections.forEach((section: any) => {
          section.addons = section.addons.map((addon: any) => ({
            ...addon,
            count: 0,
            disabled: false,
          }));
        });
      },
      error: (error) => {
        console.error('Error fetching package data:', error);
      },
    });
  }

  increaseCount(section: any, item: MenuItem): void {
    if (item.disabled) return;

    const currentTotal = section.addons.reduce(
      (sum: number, it: any) => sum + it.count,
      0
    );
    if (currentTotal >= section.limit) {
      this.updateLimits(section);
      return;
    }

    item.count++;
    this.updateLimits(section);
    this.updateSelectedItems();
  }

  decreaseCount(section: any, item: MenuItem): void {
    if (item.count > 0) {
      item.count--;
      this.updateLimits(section);
      this.updateSelectedItems();
    }
  }

  updateLimits(section: any): void {
    const totalInCategory = section.addons.reduce(
      (sum: number, item: any) => sum + item.count,
      0
    );
    const limitReached = totalInCategory >= section.limit;

    section.addons.forEach((item: any) => {
      item.disabled = limitReached && item.count === 0;
    });
  }

  updateSelectedItems(): void {
    debugger;
    this.selectedItems = [];

    this.packageData.sections.forEach((section: any) => {
      section.addons.forEach((item: any) => {
        if (item.count > 0) {
          this.selectedItems.push({
            id: item.id,
            categoryId: section.id,
            name: item.recipeName,
            count: item.count,
          });
        }
      });
    });
  }

  toggleCart(): void {
    console.log('Toggling cart visibility');
    this.showCart = !this.showCart;
  }

  removeFromCart(itemToRemove: SelectedItem): void {
    this.packageData.sections.forEach((section: any) => {
      if (section.id === itemToRemove.categoryId) {
        section.addons.forEach((item: any) => {
          if (item.name === itemToRemove.name) {
            item.count = 0;
          }
        });
        this.updateLimits(section);
      }
    });

    this.updateSelectedItems();
  }

  isAllCategoriesComplete(): boolean {
    return this.packageData.sections.every((section: any) => {
      const totalSelected = section.addons.reduce(
        (sum: number, item: any) => sum + item.count,
        0
      );
      return totalSelected === section.limit;
    });
  }

  confirmOrder(): void {
    if (!this.isAllCategoriesComplete()) {
      alert('يرجى اختيار جميع الأصناف المتاحة في كل فئة قبل تأكيد الاشتراك.');
      return;
    }

    if (this.selectedItems.length === 0) {
      alert('يرجى اختيار الأصناف أولاً');
      return;
    }
    console.log('Order confirmed:', this.selectedItems);
    alert(
      `تم تأكيد الاشتراك "${this.subscriptionName}" الإجمالي: ${this.totalPrice} ريال`
    );
    
  }

  resetSelection(): void {
    this.packageData.sections.forEach((section: any) => {
      section.addons.forEach((item: any) => {
        item.count = 0;
        item.disabled = false;
      });
    });
    this.selectedItems = [];
    this.showCart = false;
  }
}
