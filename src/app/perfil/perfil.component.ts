import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { User } from '../model/User';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {


  usuario: User = new User()
  idUsuario = environment.id

  key = 'data'
  reverse = true

  foto = environment.foto
  nome = environment.nome

  constructor(
    private router: Router,

    private authService: AuthService,
    private alertas: AlertasService,

  ) { }

  ngOnInit(){

    window.scroll(0,0)

    if(environment.token == ""){
      this.router.navigate(["/login"])
      this.alertas.showAlertInfo('Sua sessão expirou! Por favor, faça login novamente')
    }

    this.authService.refreshToken();
    this.findByIdUsuario();
    this.authService.getByIdUser(this.idUsuario);

  }


  findByIdUsuario(){
    this.authService.getByIdUser(this.idUsuario).subscribe((resp: User) => {
      this.usuario = resp
    })



}
}
