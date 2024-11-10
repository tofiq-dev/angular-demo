import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-globe',
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
        d="M12 21a9 9 0 1 0 0-18m0 18a9 9 0 1 1 0-18m0 18c2.761 0 3.941-5.163 3.941-9S14.761 3 12 3m0 18c-2.761 0-3.941-5.163-3.941-9S9.239 3 12 3M3.5 9h17m-17 6h17"
      />
    </svg>
  `,
  styles: ``,
})
export class GlobeIcon {
  @Input() size = '32';
  @Input() color = 'currentColor';
}
