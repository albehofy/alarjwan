import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-separator',
  imports: [],
  templateUrl: './separator.component.html',
  styleUrl: './separator.component.scss'
})
export class SeparatorComponent {
  @Input() header:string = 'test';
  @Input() title:string = '';
  @Input() description:string = '';
}
