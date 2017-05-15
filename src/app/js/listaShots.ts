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
  shots: any;
  filtro: string;
  paginaShots: number;
  shotsPorPagina: number;
  tamanhoGrande: any;
  stringBusca: string;

  constructor (private http: Http) {
    this.shots = [];
    this.tokenUsuario = '6ade2196ca410421ca4caa7bc18cd31e3822cbc2380393507bc8fda60258114f';
    this.stringBusca = '';

    // valor do filtro para busca de shots (comments, recent ou views)
    this.filtro = 'recent';
    this.paginaShots = 1;
    this.shotsPorPagina = 30;

    // tamanho grande padrão
    this.tamanhoGrande = true;
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
      this.getShots();
  }
}
