import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import swal from 'sweetalert';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  id;
  desactivar : FormGroup;
  
  constructor(private API: DataApiService,
    public FB: FormBuilder, 
    private _router: Router) { }

  ngOnInit(): void {
    this.desactivar = this.FB.group({
      nombre: ['x'],
      apPat: ['x'],
      apMat: ['x'],
      edad: [1],
      delete: ["True"],
    });
  }

  delete(formR: any){
    this.id = localStorage.getItem('id');
      this.API.updateUser(this.id, formR).subscribe(response => {
      console.log(response);
      swal("¡Hecho!", "Eliminado Exitosamente", "success");
      localStorage.setItem('id', '0');
      this._router.navigate(['/profiles']);
    },error => {
      var errorMessage = <any>error;
      if (errorMessage != null) {
        console.log("Error al Eliminar")
        swal("¡Ups!", "No se pudo eliminar el usuario", "error");
      }
    })
  }

  atras(){
    this._router.navigate(['/profiles']);
  }

}
