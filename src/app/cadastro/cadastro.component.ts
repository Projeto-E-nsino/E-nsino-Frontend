import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

    usuario: User = new User()
    confirmarSenha: string
    tipoUsuario: string

  constructor( private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    window.scroll(0,0)
  }

  confirmSenha(event:any) {
    this.confirmarSenha = event.target.value
    console.log(this.confirmarSenha)
  }

  tipoUser(event:any) {
    this.tipoUsuario = event.target.value
    console.log(this.tipoUsuario)
  }

  cadastrar() {
    this.usuario.tipo = this.tipoUsuario

    if(this.usuario.senha != this.confirmarSenha) {
      alert('As senhas não conferem!')
    }
    else {
      this.auth.cadastrar(this.usuario).subscribe((resp: User)=>{
        this.usuario = resp
        alert('Usuário cadastrado com sucesso!')
        this.router.navigate(['/login'])
      })
    }

  }

}
