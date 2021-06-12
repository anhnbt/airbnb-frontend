import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Observable} from 'rxjs';
import {User} from '../../../models/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isCollapsed = true;
  isAuthenticated: boolean;

  constructor(
    public auth: AuthService
  ) {
  }

  logout(): void {
    this.auth.logout('login');
  }

  ngOnInit(): void {
  }
}
