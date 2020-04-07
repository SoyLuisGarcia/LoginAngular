import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataApiService } from 'src/app/services/data-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {


  registro: FormGroup;
  id;

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
      this.id = localStorage.getItem('id');
        this.API.updateUser(this.id, formR).subscribe(response => {
        console.log(response);
        swal("¡Hecho!", "Actualizado Exitosamente", "success");
        localStorage.setItem('id', '0');
        this._router.navigate(['/profiles']);
      },error => {
        var errorMessage = <any>error;
        if (errorMessage != null) {
          console.log("Error al actualizar")
          swal("¡Ups!", "No se pudo registrar el usuario", "error");
        }
      })


  }

  exit(){
    this._router.navigate(['/profiles']);
  }


}
