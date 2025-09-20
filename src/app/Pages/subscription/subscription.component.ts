import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
}

interface SelectedItem {
  categoryId: string;
  name: string;
  count: number;
}

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {

  subscriptionName: string = 'اشتراك العائلة';
  numberOfPersons: number = 4;
  totalPrice: number = 350;

  categories: Category[] = [
    {
      id: 'appetizers',
      name: 'المقبلات',
      description: 'اختر من بين مجموعتنا المتنوعة من المقبلات الشهية',
      limit: 2,
      items: [
        { name: 'سلطات خضراء', description: 'خضار طازجة مع صلصة الليمون', image: 'https://static.photos/food/200x200/1', count: 0 },
        { name: 'شوربة الطماطم', description: 'شوربة طماطم كريمية', image: 'https://static.photos/food/200x200/2', count: 0 },
        { name: 'بطاطس مقلية', description: 'بطاطس مقلية مع بهارات خاصة', image: 'https://static.photos/food/200x200/3', count: 0 }
      ]
    },
    {
      id: 'mains',
      name: 'الأطباق الرئيسية',
      description: 'تشكيلة متميزة من الأطباق الرئيسية الشهية',
      limit: 3,
      items: [
        { name: 'طبق الأرز المميز', description: 'أرز بسمتي مع الدجاج المشوي', image: 'https://static.photos/food/200x200/4', count: 0 },
        { name: 'لحم مشوي', description: 'لحم مشوي على الفحم مع الخضار', image: 'https://static.photos/food/200x200/5', count: 0 },
        { name: 'سمك مشوي', description: 'سمك طازج مشوي مع الليمون', image: 'https://static.photos/food/200x200/6', count: 0 }
      ]
    },
    {
      id: 'desserts',
      name: 'الحلويات',
      description: 'حلويات شهية لإنهاء وجبتك بشكل مثالي',
      limit: 2,
      items: [
        { name: 'كريب كراميل', description: 'حلوى كريب كراميل بالكريمة', image: 'https://static.photos/food/200x200/7', count: 0 },
        { name: 'موز بالشوكولاتة', description: 'موز مغطى بالشوكولاتة الساخنة', image: 'https://static.photos/food/200x200/8', count: 0 },
        { name: 'تشيز كيك', description: 'كعكة الجبن بالتوت الأزرق', image: 'https://static.photos/food/200x200/9', count: 0 }
      ]
    },
    {
      id: 'drinks',
      name: 'المشروبات',
      description: 'تشكيلة متنوعة من المشروبات الطازجة',
      limit: 3,
      items: [
        { name: 'عصير طبيعي', description: 'عصير فريش من الفواكه الموسمية', image: 'https://static.photos/food/200x200/10', count: 0 },
        { name: 'قهوة تركية', description: 'قهوة تركية تقليدية مُحضرة طازجة', image: 'https://static.photos/food/200x200/11', count: 0 },
        { name: 'شاي بالنعناع', description: 'شاي أخضر مع النعناع الطازج', image: 'https://static.photos/food/200x200/12', count: 0 }
      ]
    }
  ];

  selectedItems: SelectedItem[] = [];
  showCart: boolean = false;

  ngOnInit(): void {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    });
  }

  increaseCount(category: Category, item: MenuItem): void {
    if (item.disabled) return;

    const currentTotal = category.items.reduce((sum, it) => sum + it.count, 0);
    if (currentTotal >= category.limit) {
      this.updateLimits(category);
      return;
    }

    item.count++;
    this.updateLimits(category);
    this.updateSelectedItems();
  }

  decreaseCount(category: Category, item: MenuItem): void {
    if (item.count > 0) {
      item.count--;
      this.updateLimits(category);
      this.updateSelectedItems();
    }
  }

  updateLimits(category: Category): void {
    const totalInCategory = category.items.reduce((sum, item) => sum + item.count, 0);
    const limitReached = totalInCategory >= category.limit;

    category.items.forEach(item => {
      item.disabled = limitReached && item.count === 0;
    });
  }

  updateSelectedItems(): void {
    this.selectedItems = [];

    this.categories.forEach(category => {
      category.items.forEach(item => {
        if (item.count > 0) {
          this.selectedItems.push({
            categoryId: category.id,
            name: item.name,
            count: item.count
          });
        }
      });
    });
  }

  toggleCart(): void {
    this.showCart = !this.showCart;
  }

  removeFromCart(itemToRemove: SelectedItem): void {
    this.categories.forEach(category => {
      if (category.id === itemToRemove.categoryId) {
        category.items.forEach(item => {
          if (item.name === itemToRemove.name) {
            item.count = 0;
          }
        });
        this.updateLimits(category);
      }
    });

    this.updateSelectedItems();
  }

  isAllCategoriesComplete(): boolean {
    return this.categories.every(category => {
      const totalSelected = category.items.reduce((sum, item) => sum + item.count, 0);
      return totalSelected === category.limit;
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

    alert(`تم تأكيد الاشتراك "${this.subscriptionName}" لعدد ${this.numberOfPersons} أشخاص. الإجمالي: ${this.totalPrice} ريال`);
  }

}
