import {Component, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {LocalStorageService} from '../../services/localStorage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit{

  // username = this.local.get('admin');
 username: string;
 checkToken: string;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


  constructor(private breakpointObserver: BreakpointObserver,
              private local: LocalStorageService,
              private router: Router) {}
  ngOnInit(): void{
    this.username = localStorage.key(localStorage.length - 1);
    this.checkToken = this.local.get(this.username);
  }

  logout(): any{
    this.local.delete(this.username);
    this.router.navigate(['/login']);
  }
}
