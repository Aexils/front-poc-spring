// src/app/components/toast/toast.component.ts
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Toast } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  @Input() toast!: Toast;
  @Output() dismiss = new EventEmitter<void>();
  visible = false;

  ngOnInit(): void {
    setTimeout(() => this.visible = true, 10);       // fade-in
    setTimeout(() => this.visible = false, 3800);    // fade-out
    setTimeout(() => this.dismiss.emit(), 4500);     // remove from DOM
  }
}
