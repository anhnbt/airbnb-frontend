import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
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
