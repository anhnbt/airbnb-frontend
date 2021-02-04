import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    password: new FormControl('')
  });
  constructor(private fb: FormBuilder,
              private router: Router,
              private userService: UserService) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]*[0-9]*$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.myForm.controls[controlName].hasError(errorName);
  }


  onSubmit(): void{
    this.userService.login(this.myForm.value).subscribe(res => {
      console.log(res.data);
      this.router.navigate(['']);
    });

  }

}
