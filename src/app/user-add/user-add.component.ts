
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  addForm!: FormGroup;
  submitted: any;
  escolaridades: any;


  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) {
  }

  minDate = new Date(1900, 0, 1);
  maxDate = new Date(new Date().setDate(new Date().getDate() - 1))

  ngOnInit(): void {
    this.escolaridades = [{ id: 1, desc: 'Infantil' }, { id: 2, desc: 'Fundamental' }, { id: 3, desc: 'Médio' }, { id: 4, desc: 'Superior' }];
    this.submitted = false;
    this.addForm = this.formBuilder.group({
      id: [],
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      datanascimento: ['', Validators.required],
      escolaridade: ['', Validators.required]
    });
  }

  get f() { return this.addForm.controls; }

  onSubmit() {

    this.submitted = true;
    if (this.addForm.invalid)
      return;

    this.apiService.criarUsuario(this.addForm.value).subscribe(d => (this.router.navigate(['user-list'])));
  }

}
