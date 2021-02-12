import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, ValidatorFn } from '@angular/forms';
// import custom validator to validate that password and confirm password fields match
import { MustMatch } from './_helpers/must-match.validator';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {

  submitted = false;

  registrationForm = this.fb.group(
    {
      firstName: [''],
      lastName: [''],
      username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]],
      retypePassword: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      newsletter: [false],
      acceptTerms: [false, Validators.requiredTrue]
    },
    {
      validator: MustMatch('password', 'retypePassword')
    }
  );

  constructor(private fb: FormBuilder) { }

  // getter for easy access to form fields
  get f() { return this.registrationForm.controls; }

  onSubmit() {
    console.warn(this.registrationForm.value);
    this.submitted = true;
    // stop here if form is invalid
    if (this.registrationForm.invalid) {
        return;
    }
    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registrationForm.value, null, 4));
  }

  ngOnInit(): void {
  }
}
