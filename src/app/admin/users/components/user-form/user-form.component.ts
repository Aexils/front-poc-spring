import { Component, Input, Output, EventEmitter } from '@angular/core';
import {NgStyle} from '@angular/common';
import {ToastService} from '../../../../core/services/toast.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  templateUrl: './user-form.component.html',
  imports: [
  ],
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
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
