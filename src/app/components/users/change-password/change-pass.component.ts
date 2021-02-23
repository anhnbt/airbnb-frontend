import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {AuthService} from '../../../services/auth.service';


@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent implements OnInit {
  userForm: FormGroup;
  checkDisabled = true;
  checkHidden = true;
  passwordValue = '';
  confirmPasswordValue = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: [this.authService.getLocal().username, Validators.required],
      password: [null, [Validators.required, Validators.min(6)]],
      confirmPassword: [null, [Validators.required, Validators.min(6)]]
    });
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  get username(): AbstractControl {
    return this.userForm.get('username');
  }

  get password(): AbstractControl {
    return this.userForm.get('password');
  }

  get confirmPassword(): AbstractControl {
    return this.userForm.get('confirmPassword');
  }

  checkConfirm(): void {
    if (this.passwordValue == this.confirmPasswordValue && this.passwordValue.length >= 6) {
      this.checkDisabled = false;
      this.checkHidden = true;
    } else {
      this.checkDisabled = true;
      this.checkHidden = false;
    }

  }

  onSubmit(): void {
    this.userService.changePassword(this.userForm.value, this.authService.getLocal().id).subscribe(res => {
      this.openSnackBar('Cập nhật mật khẩu thành công!', 'Close');
    });
  }
}
