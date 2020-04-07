import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
 
  users: User[];
  body; any;
  user: User;
  status;



  constructor(private API: DataApiService, private route: Router, public FB: FormBuilder) { }

  ngOnInit(): void {

    this.pagValid();
    this.getUsers(); 

  }


  getUsers(){
    this.API.getUsers().subscribe(response => {
      console.log(response);
      this.users = response;
      this.status = '';
    })
  }

  edit(id){
    localStorage.setItem('id', id);
    this.route.navigate(['edit']);
  }

  delet(id){
    localStorage.setItem('id', id);
    this.route.navigate(['eliminar']);
  }


  redirect(){
    this.route.navigate(['registro']);
  }

  exit(){
    localStorage.setItem('token', '0');
    swal("¡Hecho!", "Cierre de sesion exitoso", "success");
    this.route.navigate(['']);
  }

  pagValid(){
    if(localStorage.getItem('token') == '0'){
      this.route.navigate(['']);
    }
  }
}
