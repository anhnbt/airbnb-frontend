import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogContentComponent} from '../layout/dialog-content/dialog-content.component';
import {DialogInputComponent} from '../layout/dialog-input/dialog-input.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {log} from 'util';

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
  username = localStorage.key(0);
  gender = '';
  action: 'Chỉnh sửa thành công';

  constructor(private userService: UserService,
              private dialog: MatDialog,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.userService.getOneByUsername(this.username).subscribe(res => {
      console.log(res.data),

        this.user = res.data,
        this.checkGender();
    });

    console.log(this.user.gender + 'aaaa');
  }

  openDialog(title: string): void {
    const dialogRef = this.dialog.open(DialogInputComponent, {
      width: '450px',
      data: {title: title, name: this.user.name, birthDay: this.user.dateOfBirth, email: this.user.email, phone: this.user.phone}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed +' + result);
      this.user.name = result.name;
      this.user.dateOfBirth = result.birthDay;
      this.user.email = result.email;
      this.user.phone = result.phone;
      this.updateUserProfile();

    });
  }

  checkGender(): void {
    if (this.user.gender == 1) {
      this.gender = 'Nam';
    } else {
      this.gender = 'Nu';
    }
  }

  openSnackBar() {
    this._snackBar.open('Sửa thành công', this.action, {
      duration: 2000,
    });
  }

  updateUserProfile(): void {
    this.userService.editUser(this.user).subscribe(res => {
      this.openSnackBar(),
        this.user = res.data;

    });
  }
}
