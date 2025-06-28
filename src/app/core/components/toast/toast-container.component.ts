// src/app/components/toast/toast-container.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, Toast } from '../../services/toast.service';
import { ToastComponent } from './toast.component';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule, ToastComponent],
  template: `
    <div class="toast-container position-fixed top-0 end-0 p-3" style="z-index: 1080;">
      @for (toast of toasts; track toast) {
        <app-toast
          [toast]="toast"
          (dismiss)="dismiss(toast.id)">
        </app-toast>
      }
    </div>
  `
})
export class ToastContainerComponent {
  toasts: Toast[] = [];

  constructor(private toastService: ToastService) {
    this.toastService.toasts$.subscribe(toasts => {
      this.toasts = toasts;
    });
  }

  dismiss(id: number) {
    this.toastService.dismiss(id);
  }
}
