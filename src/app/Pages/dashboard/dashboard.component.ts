import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
// React imports removed; we'll load the built bundle instead
@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, OnDestroy {
  constructor(private el: ElementRef) {}

  ngOnInit() {
    // Inject the built dashboard CSS
    const cssHref = '/assets/dashboard/assets/index-CMSx6hGa.css';
    if (!document.querySelector(`link[href="${cssHref}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = cssHref;
      document.head.appendChild(link);
    }

    // Ensure root container exists
    let container = this.el.nativeElement.querySelector(
      '#root'
    ) as HTMLElement | null;
    if (!container) {
      container = document.createElement('div');
      container.id = 'root';
      this.el.nativeElement.appendChild(container);
    }

    // Inject the built dashboard JS bundle
    const scriptSrc = '/assets/dashboard/assets/index-DT7sx_Ns.js';
    if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
      const script = document.createElement('script');
      script.type = 'module';
      script.crossOrigin = '';
      script.src = scriptSrc;
      document.body.appendChild(script);
    }
  }

  ngOnDestroy() {
    // No explicit unmount available from built bundle; rely on Angular teardown
  }
}
