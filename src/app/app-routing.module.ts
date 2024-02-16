import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WebsitesListComponent } from './websites-list/websites-list.component';
import { PasswordListComponent } from './password-list/password-list.component';

const routes: Routes = [
  {
    path: '', component: LoginComponent
  },
  {
    path: 'websites',
    component: WebsitesListComponent
  },
  {
    path: 'passwords',
    component: PasswordListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
