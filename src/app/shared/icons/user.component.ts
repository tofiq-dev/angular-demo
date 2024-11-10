import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-user',
  standalone: true,
  imports: [],
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      [attr.width]="size"
      [attr.height]="size"
      viewBox="0 0 24 24"
    >
      <path
        fill="none"
        [attr.stroke]="color"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        d="M21 19.75c0-2.09-1.67-5.068-4-5.727m-2 5.727c0-2.651-2.686-6-6-6s-6 3.349-6 6m9-12.5a3 3 0 1 1-6 0a3 3 0 0 1 6 0m3 3a3 3 0 1 0 0-6"
      />
    </svg>
  `,
  styles: ``,
})
export class UserIcon {
  @Input() size = '32';
  @Input() color = 'currentColor';
}
