import { Component, Input, Output, EventEmitter } from '@angular/core';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.html',
  imports: [
  ],
  styleUrls: ['./modal.scss']
})
export class ModalComponent {
  @Input() title = '';
  @Input() show = false;
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  onConfirm() {
    this.confirm.emit();
  }
}
