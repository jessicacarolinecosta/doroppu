import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


// configurações
@Component({
  selector: 'app-root',
  templateUrl: '../view/listaShots.html',
  styleUrls: ['../css/listaShots.less']
})
export class ListaShots {
  tokenUsuario: string;
  dadosUsuario: any;
  shots: any;
  filtro: string;
  paginaShots: number;
  shotsPorPagina: number;
  tamanhoGrande: any;

  constructor (private http: Http) {
    this.shots = [];
    this.dadosUsuario = [];
    this.tokenUsuario = '6ade2196ca410421ca4caa7bc18cd31e3822cbc2380393507bc8fda60258114f';

    // workaround para não obter erro em console
    this.dadosUsuario.avatar_url = null;

    // valor do filtro para busca de shots (comments, recent ou views)
    this.filtro = 'recent';
    this.paginaShots = 1;
    this.shotsPorPagina = 30;

    // tamanho grande padrão
    this.tamanhoGrande = true;
  }

  // coletando informações do usuário
  public getPerfil() {
        this.http.get('https://api.dribbble.com/v1/user?access_token=' + this.tokenUsuario).subscribe(
          data => {
            // guardando informações coletadas
            this.dadosUsuario = JSON.parse(data['_body']);
          }
        );
  }

  // coletando shots mais recentes
  public getShots() {
      this.http.get('https://api.dribbble.com/v1/shots?access_token=' + this.tokenUsuario + '&sort=' + this.filtro + '&page=' + this.paginaShots + '&per_page=' + this.shotsPorPagina).subscribe(
        data => {
          // guardando informações coletadas
          this.shots = this.shots.concat(JSON.parse(data['_body']));
        }
      );
  }

  

  // muda o tamanho da shot baseado no parametro recebido
  public mudaTamanhoShots(grande) {
    this.tamanhoGrande = grande;
  }

  // funções executadas ao início
  public ngOnInit() {
      this.getPerfil();
      this.getShots();
  }
}
