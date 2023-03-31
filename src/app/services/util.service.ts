import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  isLogged = new Subject<boolean>();

  constructor() { }

  saveToken(token: string): void{
    localStorage.setItem('TOKEN', token);
    this.isLogged.next(true);
  }

  getToken(): string | null{
    return localStorage.getItem('TOKEN');
  }

  deleteToken(): void{
    localStorage.removeItem('TOKEN');
    this.isLogged.next(false);
  }
}
