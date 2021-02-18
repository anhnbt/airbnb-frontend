import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';


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

  constructor(private userService: UserService) { }

  ngOnInit(): void {


  }
changePw(){
this.userService.changePassword(this.login).subscribe(res=>{
  alert('ok')
})
}
}
