import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'pe-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
  imports: [MatIconModule]
})
export class ButtonComponent {

  @Input() label: string = '';
  @Input() icon: string | null = null;
  @Input() disabled: boolean = false;
  @Output() onButtonClick: EventEmitter<any> = new EventEmitter;

  public onClick() {
    this.onButtonClick.emit();
  }
}
