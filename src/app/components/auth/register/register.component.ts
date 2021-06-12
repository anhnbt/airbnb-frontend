import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/user';
import {Response} from '../../../models/response';
import {NotificationService} from '../../shared/notification.service';

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
    phone: new FormControl(''),
    email: new FormControl(''),
    gender: new FormControl(''),
    dateOfBirth: new FormControl('')
  });

  list?: any[];
  user: User;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
        username: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]*[0-9]*$')]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
        phone: ['', [Validators.minLength(9), Validators.maxLength(10)]],
        email: ['', [Validators.required, Validators.email]],
        gender: [''],
        dateOfBirth: ['']
      },
      {validators: this.validateControlsValue('password', 'confirmPassword')}
    );
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.myForm.controls[controlName].hasError(errorName);
  }

  validateControlsValue(firstControlName: string, secondControlName: string): any {
    // tslint:disable-next-line:only-arrow-functions typedef
    return function(formGroup: FormGroup) {
      const {value: firstControlValue} = formGroup.get(firstControlName);
      const {value: secondControlValue} = formGroup.get(secondControlName);
      return firstControlValue === secondControlValue
        ? ''
        : {
          valueNotMatch: {
            firstControlValue,
            secondControlValue
          }
        };
    };
  }

  onSubmit(): void {
    this.user = this.myForm.value;
    this.user.roles = [{name: 'ROLE_USER'}];
    console.log(this.user);
    this.userService.create(this.user).subscribe((resp: Response) => {
      if (resp.status === 'CREATED') {
        this.notificationService.createNotification('success', 'AirBnb', resp.message);
        this.myForm.reset();
        // this.router.navigate(['/login']);
      } else {
        this.notificationService.createNotification('error', 'AirBnb Error', resp.message);
      }
    }, error => {
      console.log(error);
      this.notificationService.createNotification('error', 'Lỗi hệ thống', error)
    });
  }

}
