import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  myForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    // age: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    gender: new FormControl(''),
    dateOfBirth: new FormControl('')
  });

  list?: any[];
  user?: User;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.user = new User();
    // console.log(this.user.roles);
    this.myForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]*[0-9]*$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      phone: [''],
      email: ['', [Validators.required, Validators.email]],
      gender: [''],
        dateOfBirth: ['']
    },
      {validators: this.validateControlsValue('password', 'confirmPassword')}
    );
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.myForm.controls[controlName].hasError(errorName);
  }

  validateControlsValue(firstControlName: string, secondControlName: string): any {
    // tslint:disable-next-line:only-arrow-functions typedef
    return function(formGroup: FormGroup) {
      const { value: firstControlValue } = formGroup.get(firstControlName);
      const { value: secondControlValue } = formGroup.get(secondControlName);
      return firstControlValue === secondControlValue
        ? null
        : {
          valueNotMatch: {
            firstControlValue,
            secondControlValue
          }
        };
    };
  }

  onSubmit(): void{
    this.user = this.myForm.value;
    // @ts-ignore
    this.user?.roles = [{name: 'ROLE_USER'}];
    this.save();
    console.log(this.user?.roles);
    console.log(this.user);
    alert('Dang ky thanh cong');
    this.router.navigate(['/login']);
  }

  save(): void{
    this.userService.createUser(this.myForm.value).subscribe(res => {
      this.user = res.data;
    });
  }

}
