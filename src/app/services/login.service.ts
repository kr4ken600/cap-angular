import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginRequest, ILoginResponse } from '../model/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(req: ILoginRequest){
    return this.http.post<ILoginResponse>("https://reqres.in/api/login", req);
  }
}
