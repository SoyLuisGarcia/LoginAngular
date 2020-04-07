import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditComponent } from './components/edit/edit.component';
import { DeleteComponent } from './components/delete/delete.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },

  {
    path: 'registro',
    component: RegisterComponent
  },
  {
    path: 'profiles',
    component: ProfileComponent
  },
  {
    path: 'edit',
    component: EditComponent
  },
  {
    path: 'eliminar',
    component: DeleteComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
