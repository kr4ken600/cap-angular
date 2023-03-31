import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate{

  constructor(private utilSvc: UtilService, private router: Router) { }

  canActivate(){
    const isLogeged = Boolean(this.utilSvc.getToken());
    if(!isLogeged){
      this.router.navigate(['login']);
    }
    return isLogeged;
  }
}
