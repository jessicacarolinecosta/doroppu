import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ListaShots } from './js/listaShots';
import { Filtro } from './js/busca.pipe';

@NgModule({
  declarations: [
    ListaShots,
    Filtro
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [ListaShots]
})
export class AppModule { }
