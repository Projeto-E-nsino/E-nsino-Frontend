import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from 'src/app/model/Postagem';
import { Tema } from 'src/app/model/Tema';
import { User } from 'src/app/model/User';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';
import { AlertasService } from '../service/alertas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[]
  tituloOK: boolean

  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema: number
  areaTema: string

  usuario: User = new User()
  idUsuario = environment.id

  foto = environment.foto

  key = 'data'
  reverse = true

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
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
    this.temaService.refreshToken();
    this.postagemService.refreshToken();

    this.getAllTemas();
    this.getAllPostagens();
  }

  getAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }

  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) =>{
      this.tema = resp
    })
  }

  getAllPostagens(){
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp
    })
  }

  findByIdUsuario(){
    this.authService.getByIdUser(this.idUsuario).subscribe((resp: User) => {
      this.usuario = resp
    })

  }
  findByAreaTema(){
    if(this.areaTema == ''){
      this.getAllTemas()
    } else{
      this.temaService.getByAreaTema(this.areaTema).subscribe((resp: Tema[])=>{
        this.listaTemas = resp
      })
  }
  }

  publicar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.usuario.id = this.idUsuario
    this.postagem.usuario = this.usuario

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp
      this.alertas.showAlertSuccess('Postagem realizada com sucesso!')
      this.postagem = new Postagem()
      this.getAllPostagens()
    })

  }

  validaTitulo(){
    if(this.postagem.titulo.length < 5 || this.postagem.titulo.length > 45 ){
      let vtitulo = (<HTMLDivElement>document.getElementById('vtitulo'))
      vtitulo.innerHTML = 'Título: mín 5, máx 45 caracteres'
      vtitulo.style.color = "red"

    } else {
      let vtitulo = (<HTMLDivElement>document.getElementById('vtitulo'))
      vtitulo.innerHTML = ''
      vtitulo.style.backgroundColor = "transparent"

    }
  }

  validaTexto(){
    if(this.postagem.texto.length < 10 || this.postagem.texto.length > 1000){
      let vtexto = (<HTMLDivElement>document.getElementById('vtexto'))
      vtexto.innerHTML = 'Texto: mín 10, máx 1000 caracteres'
      vtexto.style.color = "red"
    } else {
      let vtexto = (<HTMLDivElement>document.getElementById('vtexto'))
      vtexto.innerHTML = (1000 - this.postagem.texto.length).toString()
      vtexto.style.color = "black"
    }
  }



}
