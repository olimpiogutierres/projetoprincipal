import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserAddComponent } from './user-add/user-add.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserListComponent } from './user-list/user-list.component';


const routes: Routes = [
  
  { path: '', component: UserListComponent },
  { path: '*', component: UserListComponent },
  { path: 'user-add', component: UserAddComponent },
  { path: 'user-list', component: UserListComponent },
  { path: 'user-edit', component: UserEditComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
