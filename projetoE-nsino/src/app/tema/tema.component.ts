import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { AuthService } from '../service/auth.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

tema: Tema = new Tema()
listaTemas: Tema[]

  constructor(
  private router: Router,
  private temaService: TemaService,
  private auth: AuthService
  ) { }

  ngOnInit() {
  if(environment.token == ''){
  alert('Sua sessão expirou ! Faça login novamente')
  this.router.navigate(['/login'])
  }
  this.findAllTemas()
  this.temaService.refreshToken()
  }

findAllTemas(){
this.temaService.getAllTema().subscribe((resp: Tema[])=> {
  this.listaTemas = resp
})

}

cadastrar() {
this.temaService.postTema(this.tema).subscribe((resp: Tema)=>{
this.tema = resp
alert('tema cadastrado com sucesso !')
this.findAllTemas()
this.tema = new Tema()
})

}
}
