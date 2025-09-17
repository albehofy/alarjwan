import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { CommonModule } from '@angular/common';
interface MenuItem {
  name: string;
  description: string;
  price: number;
  image: string;
  count: number;
}

interface Category {
  id: string;
  name: string;
  description: string;
  items: MenuItem[];
}

@Component({
  selector: 'app-subscription',
  imports: [CommonModule],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.scss'
})
export class SubscriptionComponent implements OnInit {
  categories: Category[] = [
    {
      id: 'appetizers',
      name: 'المقبلات',
      description: 'اختر من بين مجموعتنا المتنوعة من المقبلات الشهية',
      items: [
        { name: 'سلطات خضراء', description: 'خضار طازجة مع صلصة الليمون', price: 35, image: 'https://static.photos/food/200x200/1', count: 0 },
        { name: 'شوربة الطماطم', description: 'شوربة طماطم كريمية', price: 30, image: 'https://static.photos/food/200x200/2', count: 0 },
        { name: 'بطاطس مقلية', description: 'بطاطس مقلية مع بهارات خاصة', price: 25, image: 'https://static.photos/food/200x200/3', count: 0 }
      ]
    },
    {
      id: 'mains',
      name: 'الأطباق الرئيسية',
      description: 'تشكيلة متميزة من الأطباق الرئيسية الشهية',
      items: [
        { name: 'طبق الأرز المميز', description: 'أرز بسمتي مع الدجاج المشوي', price: 85, image: 'https://static.photos/food/200x200/4', count: 0 },
        { name: 'لحم مشوي', description: 'لحم مشوي على الفحم مع الخضار', price: 120, image: 'https://static.photos/food/200x200/5', count: 0 },
        { name: 'سمك مشوي', description: 'سمك طازج مشوي مع الليمون', price: 95, image: 'https://static.photos/food/200x200/6', count: 0 }
      ]
    },
    {
      id: 'desserts',
      name: 'الحلويات',
      description: 'حلويات شهية لإنهاء وجبتك بشكل مثالي',
      items: [
        { name: 'كريب كراميل', description: 'حلوى كريب كراميل بالكريمة', price: 50, image: 'https://static.photos/food/200x200/7', count: 0 },
        { name: 'موز بالشوكولاتة', description: 'موز مغطى بالشوكولاتة الساخنة', price: 45, image: 'https://static.photos/food/200x200/8', count: 0 },
        { name: 'تشيز كيك', description: 'كعكة الجبن بالتوت الأزرق', price: 55, image: 'https://static.photos/food/200x200/9', count: 0 }
      ]
    },
    {
      id: 'drinks',
      name: 'المشروبات',
      description: 'تشكيلة متنوعة من المشروبات الطازجة',
      items: [
        { name: 'عصير طبيعي', description: 'عصير فRESH من الفواكه الموسمية', price: 25, image: 'https://static.photos/food/200x200/10', count: 0 },
        { name: 'قهوة تركية', description: 'قهوة تركية تقليدية مُحضرة طازجة', price: 20, image: 'https://static.photos/food/200x200/11', count: 0 },
        { name: 'شاي بالنعناع', description: 'شاي أخضر مع النعناع الطازج', price: 15, image: 'https://static.photos/food/200x200/12', count: 0 }
      ]
    }
  ];

  selectedItems: { name: string; count: number; price: number; total: number }[] = [];
  totalPrice: number = 0;

  ngOnInit(): void {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    });
  }

  increaseCount(item: MenuItem): void {
    item.count++;
    this.updateOrderSummary();
  }

  decreaseCount(item: MenuItem): void {
    if (item.count > 0) {
      item.count--;
      this.updateOrderSummary();
    }
  }

  updateOrderSummary(): void {
    this.selectedItems = [];
    this.totalPrice = 0;

    this.categories.forEach(category => {
      category.items.forEach(item => {
        if (item.count > 0) {
          const totalItemPrice = item.price * item.count;
          this.selectedItems.push({
            name: item.name,
            count: item.count,
            price: item.price,
            total: totalItemPrice
          });
          this.totalPrice += totalItemPrice;
        }
      });
    });
  }

  confirmOrder(): void {
    if (this.selectedItems.length > 0) {
      alert('تم تأكيد الطلب! الإجمالي: ' + this.totalPrice + ' ريال');
    } else {
      alert('يرجى اختيار أصناف قبل تأكيد الطلب');
    }
  }
}