import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {DatePipe} from '@angular/common';
import {ModalComponent} from '../../shared/components/modal/modal';
import {UserService} from './user.service';
import {User} from '../../core/models/user.model';

@Component({
  selector: 'app-components-users',
  standalone: true,
  styleUrl: 'users.scss',
  templateUrl: 'users.html',
  imports: [MatTableModule, DatePipe, ModalComponent, ReactiveFormsModule],
})
export class UsersComponent implements OnInit{
  modalVisible = false;
  modalTitle = 'Modifier l\'utilisateur';

  dataSource: User[] = [];
  userForm!: FormGroup;
  userToEdit: User | null = null;

  displayedColumns: string[] = ['picture', 'name', 'email', 'role', 'createdAt', 'settings'];

  private readonly fb = inject(FormBuilder);
  private readonly userService = inject(UserService);

  async ngOnInit(): Promise<void> {
    this.dataSource = await this.userService.getAllUsers();
  }

  openModal(user: User): void {
    this.modalVisible = true;
    this.userToEdit = user;

    this.userForm = this.fb.group({
      id: [user.id, [Validators.required]],
      email: [user.email, [Validators.required, Validators.email]],
      name: [user.name, [Validators.required]],
      role: [user.role, [Validators.required]],
      picture: [user.picture, [Validators.required]],
      active: [user.active, [Validators.required]],
    });
  }

  closeModal(): void {
    this.modalVisible = false;
    this.userToEdit = null;
    this.userForm?.reset();
  }

  onSubmit(): void {
    if (this.userForm.invalid) return;

    const user: User = this.userForm.value;
    this.userService.updateUser(user).then(() => {
      console.log('Utilisateur mis à jour');
      this.closeModal();
      this.refreshUsers();
    }).catch((err) => {
      console.error('Erreur lors de la mise à jour :', err);
    });
  }

  private async refreshUsers(): Promise<void> {
    this.dataSource = await this.userService.getAllUsers();
  }
}
