import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Account} from '../models/account';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  private userBehavior = new BehaviorSubject(new Account());
  public account = this.userBehavior.asObservable();

  updateAccount(data: Account): void {
    this.userBehavior.next(data);
  }
}
