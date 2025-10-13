import { AfterViewInit, Component } from '@angular/core';
declare var AOS: any;
declare var feather: any;
import { FormsModule } from '@angular/forms';
import { ContactUsComponentService } from '../../Services/conact-us.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-contact-us',
  imports: [FormsModule,RouterLink],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss',
})
export class ContactUsComponent implements AfterViewInit {
  constructor(private contactUsService: ContactUsComponentService) {}
  contactForm = {
    fullName: '',
    email: '',
    phoneNumber: '',
    messageText: '',
  };
  ngAfterViewInit(): void {
    if (AOS) {
      AOS.init();
    }
    if (feather) {
      feather.replace();
    }
  }

  submitContactForm() {
    console.log('Contact Form Submitted:', this.contactForm);
    this.contactUsService.submitMessage(this.contactForm).subscribe({
      next: (response: any) => {
        console.log('تم إرسال الرسالة بنجاح', response);
      },
      error: (error: any) => {
        console.error('خطأ في إرسال الرسالة', error);
      },
    });
    alert('تم إرسال رسالتك بنجاح! سنقوم بالرد عليك قريبًا.');
    this.contactForm = {
      fullName: '',
      email: '',
      phoneNumber: '',
      messageText: '',
    };
  }
}
