import {Component, inject} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {BillingAddress, Customer, ShippingAddress} from '../../../shared/models/customer.model';
import {AuthStore} from '../../../core/store/auth.store';
import {CustomerService} from '../../../core/services/custom.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile-user',
  standalone: true,
  templateUrl: './user.component.html',
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['./user.component.scss']
})
export class ProfileUserComponent {
  form!: FormGroup;
  customer? = inject(AuthStore).customer()
  private customService = inject(CustomerService)
  private router = inject(Router);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: [''],
      billingAddresses: this.fb.array([]),
      shippingAddresses: this.fb.array([]),
    });

    if (this.customer) {
      this.loadCustomer();
    } else {
      this.addBillingAddress();
      this.addShippingAddress();
    }
  }

  get billingAddresses(): FormArray {
    return this.form.get('billingAddresses') as FormArray;
  }

  get shippingAddresses(): FormArray {
    return this.form.get('shippingAddresses') as FormArray;
  }

  private createAddressGroup(address?: BillingAddress | ShippingAddress): FormGroup {
    return this.fb.group({
      street: [address?.street || '', Validators.required],
      city: [address?.city || '', Validators.required],
      province: [address?.province || '', Validators.required],
      postalCode: [address?.postalCode || '', Validators.required],
      country: [address?.country || '', Validators.required],
    });
  }

  addBillingAddress(): void {
    this.billingAddresses.push(this.createAddressGroup());
  }

  addShippingAddress(): void {
    this.shippingAddresses.push(this.createAddressGroup());
  }

  removeBillingAddress(index: number): void {
    this.billingAddresses.removeAt(index);
  }

  removeShippingAddress(index: number): void {
    this.shippingAddresses.removeAt(index);
  }

  private loadCustomer(): void {
    this.form.patchValue({
      firstName: this.customer?.firstName,
      lastName: this.customer?.lastName,
      phone: this.customer?.phone,
    });

    this.customer?.billingAddresses.forEach(addr => this.billingAddresses.push(this.createAddressGroup(addr)));
    this.customer?.shippingAddresses.forEach(addr => this.shippingAddresses.push(this.createAddressGroup(addr)));
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) return;

    const formValue = this.form.value as Customer;
    await this.customService.updateCustomer(formValue)
    await this.router.navigate(['/profile/user']);
  }
}
