import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserService} from '../../../services/user.service';
import {DialogInputComponent} from '../../layout/dialog-input/dialog-input.component';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  user = {
    id: 4,
    createdDate: null,
    modifiedDate: null,
    name: '',
    username: '',
    email: '',
    password: '',
    gender: 0,
    dateOfBirth: null,
    phone: null,
    active: true,
    roles: [],
  };

  titleChangeName = 'Nhập tên mới';
  gender = '';
  action: 'Chỉnh sửa thành công';

  constructor(
    private router: Router,
    private userService: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    if (this.authService.checkAuthenticated()) {
      const id = this.authService.getLocal().id;
      this.userService.findById(id).subscribe(res => {
        this.user = res.data;
        this.checkGender();
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  openDialog(title: string): void {
    const dialogRef = this.dialog.open(DialogInputComponent, {
      width: '450px',
      data: {title, name: this.user.name, birthDay: this.user.dateOfBirth, email: this.user.email, phone: this.user.phone}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.user.name = result.name;
      this.user.dateOfBirth = result.birthDay;
      this.user.email = result.email;
      this.user.phone = result.phone;
      this.update();
    });
  }

  checkGender(): void {
    if (this.user.gender === 1) {
      this.gender = 'Nam';
    } else {
      this.gender = 'Nữ';
    }
  }

  openSnackBar(): void {
    this.snackBar.open('Sửa thành công', this.action, {
      duration: 2000,
    });
  }

  update(): void {
    this.userService.update(this.user, this.user.id).subscribe(res => {
      this.openSnackBar();
      this.user = res.data;
    });
  }
}
