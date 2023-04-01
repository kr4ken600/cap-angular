import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ILoginRequest } from '../model/login.model';
import { LoginService } from '../services/login.service';
import { UtilService } from '../services/util.service';

// {
//   "email": "eve.holt@reqres.in",
//   "password": "cityslicka"
// }

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  formLogin?: FormGroup;
  isLoading: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private loginSvc: LoginService,
    private router: Router,
    private utilsSvc: UtilService
  ) {
    this.formLogin = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  loginClick() {
    this.isLoading = true;
    const req = this.formLogin?.value as ILoginRequest;
    this.loginSvc.login(req).subscribe({
      next: (res) => {
        this.utilsSvc.saveToken(res.token);
        this.router.navigate(['home'])
      },
      error: (err) => {
        this.isLoading = false;
        alert("Ocurrio un error")
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
