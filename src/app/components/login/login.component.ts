import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { DataApiService } from 'src/app/services/data-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: FormGroup;
  public status: string;
  public token;

  constructor(
    private API: DataApiService,
    public FB: FormBuilder, 
    private _router: Router) { }

  ngOnInit(): void {
    this.login = this.FB.group({
      username: [''],
      password: ['']
    });
  }

  Login(formLogin: any) {

    if (formLogin.username == "" || formLogin.password == "") {
      swal("¡Error!", "Ingrese los datos faltantes", "error");
    } else {
      this.API.login(formLogin).subscribe(response => {
        
        console.log(response);
      
        if (response.token) {

      this.token = response.token;
      localStorage.setItem('token', this.token);
      swal("¡Hecho!", "Inicio de sesión exitoso", "success");
      this._router.navigate(['/profiles']);
    }

  },
      error => {
          var errorMessage = <any>error;
          if (errorMessage != null) {
            this.status = 'error';
            console.log("error de sesion")
            swal("¡Ups!", "Usuaio o contraseña incorrectas", "error");
          }
        })
      
    }
  }
}
