import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent implements OnInit {
login = {
  username: localStorage.key(0),
  password: ''

}
confirmPw = '';
check = false;
checkDisabled = true;
  message='ĐỔI Mật Khẩu Thành Công';
  constructor(private userService: UserService,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  checkConfirm():void{
    if (this.confirmPw !== this.login.password){
      this.check = true;
      this.checkDisabled = true
    }else {
      if (this.login.password.length<6){
        this.checkDisabled = true
      }else {this.checkDisabled = false}

      this.check= false
    }
  }
changePw(){
this.userService.changePassword(this.login).subscribe(res=>{

})
}
}
