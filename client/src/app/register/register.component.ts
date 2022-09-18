import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  registerForm!: FormGroup;
  maxDate!: Date;
  validationErrors: string[] = [];

  constructor(
    private accountService: AccountService, 
    private toastr: ToastrService, 
    private fb: FormBuilder,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(12),
      ]],
      confirmPassword: ['', [
        Validators.required,
        this.matchValues('password'),
      ]]
    });

    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => {
        this.registerForm.controls['confirmPassword'].updateValueAndValidity();
      },
      error: err => console.error(err)
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      const comparorControl = control.parent?.get(matchTo);
      return control?.value === comparorControl?.value
        ? null
        : { isMatching: true };
    }
  }

  register() {
    this.accountService.register(this.registerForm.value).subscribe({
      next: (response: any) => {
        this.toastr.success("Welcome!");
        this.cancel();
        this.router.navigateByUrl('/members');
      },
      error: (err: any) => {
        this.validationErrors = err;
      }
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
