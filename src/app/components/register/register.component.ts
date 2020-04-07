import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registro: FormGroup;


  constructor(private API: DataApiService,
    public FB: FormBuilder, 
    private _router: Router) { }

  ngOnInit(): void {
    this.registro = this.FB.group({
      nombre: [''],
      apPat: [''],
      apMat: [''],
      edad: [''],
    });
  }

  registrar(formR: any){
    
    if (formR.nombre == "" || formR.apePat == "" || formR.apeMat == "" || formR.edad == "") {
      swal("¡Error!", "Ingrese los datos faltantes", "error");
    } else {
      this.API.create(formR).subscribe(response => {

        console.log(response);
        swal("¡Hecho!", "Inicio de sesión exitoso", "success");
        this._router.navigate(['/profiles']);
      },error => {
        var errorMessage = <any>error;
        if (errorMessage != null) {
          console.log("error de registro")
          swal("¡Ups!", "No se pudo registrar el usuario", "error");
        }
      })

    }

  }

  exit(){
    this._router.navigate(['/profiles']);
  }


}
