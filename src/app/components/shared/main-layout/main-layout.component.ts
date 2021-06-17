import { Component, OnInit } from '@angular/core';
import {Account} from '../../../models/account';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map, shareReplay} from 'rxjs/operators';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {

  account: Account;
  isAuthenticated: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public auth: AuthService) {
  }

  async ngOnInit(): Promise<void> {
    this.isAuthenticated = await this.auth.checkAuthenticated();
  }

  logout(): any {
    this.auth.logout('login');
  }

}
