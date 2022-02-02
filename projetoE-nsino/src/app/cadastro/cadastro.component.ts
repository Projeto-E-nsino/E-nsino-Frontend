import { Component, OnInit } from '@angular/core';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router'
import { AlertasService } from '../service/alertas.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  usuario: User = new User
  confirmarSenha: string
  tipoUsuario: string

  constructor(
    private auth: AuthService,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
    console.log(this.confirmarSenha)
  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value
    console.log(this.tipoUsuario)
  }

  cadastrar() {
    this.usuario.tipo = 'normal'

    if (this.usuario.senha != this.confirmarSenha) {
      this.alertas.showAlertInfo('As senhas não conferem!')
    }
    else {
      this.auth.cadastrar(this.usuario).subscribe((resp: User) => {
        this.usuario = resp
        this.alertas.showAlertSuccess('Usuário cadastrado com sucesso!')
        this.router.navigate(['/login'])
      })
    }

  }

}