import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';

import { SobreComponent } from './sobre/sobre.component';

import { MenuComponent } from './menu/menu.component';
import { RodapeComponent } from './rodape/rodape.component';

import { CadastroComponent } from './cadastro/cadastro.component';
import { FormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { TemaComponent } from './tema/tema.component';
import { TemaDeleteComponent } from './delete/tema-delete/tema-delete.component';
import { TemaEditComponent } from './edit/tema-edit/tema-edit.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { PostagemEditComponent } from './edit/postagem-edit/postagem-edit.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SobreComponent,
    MenuComponent,
    RodapeComponent,
    CadastroComponent,
    TemaComponent,
    TemaDeleteComponent,
    TemaEditComponent,
    PostagemEditComponent,
  ],
  imports: [
    BrowserModule,
<<<<<<< HEAD:projetoE-nsino/src/app/app.module.ts
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
=======
    AppRoutingModule, 
    HttpClientModule,
    FormsModule
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }
  ],
>>>>>>> 6575f9ced152ac20734408d0a4199f4b57f537e1:src/app/app.module.ts
  bootstrap: [AppComponent]
})
export class AppModule { }
