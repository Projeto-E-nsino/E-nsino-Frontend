import { Component, OnInit } from '@angular/core';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  usuario: User = new User
  confirmarSenha: string
  tipoUsuario: string
  emailOK: boolean
  nomeOK: boolean
  senhaOK: boolean


  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    window.scroll(0, 0)
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
    if(this.confirmarSenha.length < 6 ){
      let senha = (<HTMLDivElement>document.getElementById('senha'))
      senha.innerHTML = 'mínimo 6 caracteres'
      senha.style.color = "red"
      this.senhaOK = false
    } else {
      let senha = (<HTMLDivElement>document.getElementById('senha'))
      senha.innerHTML = ''
      senha.style.backgroundColor = "transparent"
      this.senhaOK = true
    }

  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value
  }

  validaNome(){
    if(this.usuario.nome.length < 1 ){
      let nome = (<HTMLDivElement>document.getElementById('nome'))
      nome.innerHTML = 'obrigatório'
      nome.style.color = "red"
      this.nomeOK = false
    }else {
      let nome = (<HTMLDivElement>document.getElementById('nome'))
      nome.innerHTML = ''
      nome.style.backgroundColor = "transparent"
      this.nomeOK = true
    }
  }

  tSenha(){
    if(this.usuario.senha.length < 6 ){
      let senha = (<HTMLDivElement>document.getElementById('senha'))
      senha.innerHTML = 'mínimo 6 caracteres'
      senha.style.color = "red"
      this.senhaOK = false
    } else {
      let senha = (<HTMLDivElement>document.getElementById('senha'))
      senha.innerHTML = ''
      senha.style.backgroundColor = "transparent"
      this.senhaOK = true
    }
  }

  validaEmail(){
    let regex = /.+\@.+\..+/
    if(this.usuario.usuario.match(regex)){
      let email = (<HTMLDivElement>document.getElementById('email'))
      email.innerHTML = ''
      email.style.color = ""
      email.style.backgroundColor = "transparent"
      this.emailOK = true
    } else {
      let email = (<HTMLDivElement>document.getElementById('email'))
      email.innerHTML = 'Email inválido'
      email.style.color = "red"
      this.emailOK = false
    }
  }

  cadastrar() {
    this.usuario.tipo = 'normal'
    if (this.usuario.senha != this.confirmarSenha || this.emailOK == false || this.nomeOK == false || this.senhaOK == false) {
     alert('Senhas não coincidem ou campos incorretos. Verifique.')
    }
    else {
      this.auth.cadastrar(this.usuario).subscribe((resp: User) => {
        this.usuario = resp
        alert('Usuário cadastrado com sucesso!')
        this.router.navigate(['/login'])
      })
    }

  }

}
