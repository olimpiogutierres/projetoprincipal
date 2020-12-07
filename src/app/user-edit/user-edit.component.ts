import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { ApiService } from '../service/api.service';
import { from } from 'rxjs';
import { first } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {


  public escolaridades: any;
  user: User = new User();
  editForm!: FormGroup;


  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) {
    let now = moment(); // add this 2 of 4
    console.log('hello world', now.format()); // add this 3 of 4
    console.log(now.add(7, 'days').format()); // add this 4of 4
  }

  ngOnInit() {
    this.escolaridades = [{ id: 1, desc: 'Infantil' }, { id: 2, desc: 'Fundamental' }, { id: 3, desc: 'Médio' }, { id: 4, desc: 'Superior' }];
    let userId = window.localStorage.getItem("editUserId");
    console.log('userId', userId)
    if (!userId) {
      alert("Invalid action.")
      this.router.navigate(['user-list']);
      return;
    }


    this.editForm = this.formBuilder.group({
      Id: [''],
      Nome: ['', Validators.required],
      Sobrenome: ['', Validators.required],
      Email: ['', Validators.required],
      DataNascimento: [''],
      Escolaridade: ['', Validators.required]
    });


    this.apiService.obterUsuarioPeloId(+userId)
      .subscribe((data: User) => {
        this.editForm.setValue(data);
        this.editForm.patchValue({ 'DataNascimento': moment(this.editForm.controls['DataNascimento'].value).format("yyyy/MM/DD").toString() })

        switch (data.Escolaridade) {
          case (1):
            this.editForm.patchValue({ 'Escolaridade': 'Infantil' });
            break;
          case (2):
            this.editForm.patchValue({ 'Escolaridade': 'Fundamental' });
            break;
          case (3):
            this.editForm.patchValue({ 'Escolaridade': 'Médio' });
            break;
          case (4):
            this.editForm.patchValue({ 'Escolaridade': 'Superior' });
            break;

        }
        console.log('data', data);
      }, error => {
        console.log('error', error);
      });

  }

  onSubmit() {
    this.editForm.value.Escolaridade= 3;
    this.apiService.atualizarUsuario(this.editForm.value)
      .subscribe(


        (data: any) => {

          console.log(data);
          if (data.status === 200) {
            alert('Usuario atualizado com sucesso.');
            this.router.navigate(['user-list']);
          } else {
            alert(data.message);
          }
        },
        error => {
          alert(error);
        });

    this.router.navigate(['user-list']);
  }



}
