import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { User } from '../model/User';
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
   
  ) { }

  ngOnInit(){

    window.scroll(0,0)
    
    if(environment.token == ""){
      this.router.navigate(["/login"])
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