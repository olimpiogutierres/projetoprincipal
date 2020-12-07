import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = [];

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    // if (!window.localStorage.getItem('token')) {
    //   this.router.navigate(['login']);
    //   return;
    // }
    this.apiService.listarUsuarios()
      .subscribe((data: any) => {
        this.users = data;
      });
  }

  deletarUsuario(user: User): void {
    this.apiService.deletarUsuario(user.Id)
      .subscribe((data: any) => {
        this.users = this.users.filter(u => u !== user);
      })
  };

  editarUsuario(user: User): void {
    window.localStorage.removeItem("editUserId");
    window.localStorage.setItem("editUserId", user.Id.toString());
    this.router.navigate(['user-edit']);
  };

  adicionarUsuario(): void {
    this.router.navigate(['user-add']);
  };

}


