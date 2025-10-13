import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuService } from '../../Services/menu.service';

interface ContactDetails {
  id: string
  name: string;
  address: string;
  additionalInfo: string;
  phoneNumber: string;
}

interface MenuItem {
  id: number;
  name: string;
  price: number;
}

interface PackageItem {
  id: number;
  categoryId: number;
  name: string;
  count: number;
}

interface Package {
  id: number;
  name: number; // السعر أو الاسم
  items: PackageItem[];
}

@Component({
  selector: 'app-order-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-page.component.html',
})
export class OrderPageComponent implements OnInit {
  contactDetails: ContactDetails = {
    id: '0',
    name: '',
    address: '',
    additionalInfo: '',
    phoneNumber: '',
  };

  items: any[] = [];
  menuItems: MenuItem[] = [];
  packages: Package[] = [];

  ngOnInit(): void {
    const savedMenu = localStorage.getItem('cartItems');
    this.menuItems = savedMenu ? JSON.parse(savedMenu) : [];

    const savedItems = localStorage.getItem('cartItems');
    this.items = savedItems ? JSON.parse(savedItems) : [];

    const savedPackages = localStorage.getItem('package');
    this.packages = savedPackages ? JSON.parse(savedPackages) : [];
  }

  constructor(private menuServ: MenuService) { }

  getItemName(menuItemId: number): string {
    const item = this.menuItems.find(m => m.id === menuItemId);
    return item ? item.name : '';
  }

  getItemPrice(menuItemId: number): number {
    const item = this.menuItems.find(m => m.id === menuItemId);
    return item ? item.price : 0;
  }

  get total(): number {
    const menuTotal = this.items.reduce(
      (sum: any, i: any) => sum + this.getItemPrice(i.menuItemId) * 1,
      0
    );

    const packageTotal = this.packages.reduce(
      (sum: number, pkg: Package) => sum + (typeof pkg.name === 'number' ? pkg.name : 0),
      0
    );

    return menuTotal + packageTotal;
  }

  submitOrder() {
    console.log(this.contactDetails)
    console.log(this.menuItems)
    console.log(this.packages)
    if(!this.contactDetails.name && !this.contactDetails.phoneNumber && !this.contactDetails.address) {
      alert('برجاء اكمال البيانات والمحاولة مرة اخرى'); 
      return;
    }
    // if (this.menuItems.length > 0 ) {
    //   let resutl = this.menuItems.map((item: any) => {
    //     return {
    //       menuItemId: item.id,
    //       quantity: item.quantity
    //     }
    //   })
    //   this.menuServ.requestOrder({ contactDetails: this.contactDetails, items: resutl }).subscribe({
    //     next: res => {
    //       localStorage.removeItem('cartItems');
    //     }
    //   })
    // }
    if (this.packages.length > 0) {
      let resutl = this.packages.map((item: any) => {
        return {
          packageId: item.id,
          selectedAddonIds: item.items.map((addons: any) => {
            return {
              addonId: addons.id,
              count: addons.count
            }
          })
        }
      })

      this.menuServ.requestPackge({ contactDetails: this.contactDetails, Packages: resutl }).subscribe({
        next: res => {
          localStorage.removeItem('package');
          alert('تم إرسال الطلب!');
        }
      })
    }
    // const payload = {

    //   contactDetails: this.contactDetails,
    //   items: this.items,
    //   packages: this.packages,
    // };
    // console.log('Order payload:', payload);
    
  }
}
