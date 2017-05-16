import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Headers} from '@angular/http';


// configurações
@Component({
  selector: 'app-root',
  templateUrl: '../view/listaShots.html',
  styleUrls: ['../css/listaShots.less']
})
export class ListaShots {
  tokenUsuario: string;
  stringBusca: string;
  filtro: string;

  paginaShots: number;
  shotsPorPagina: number;

  shots: any;
  shotDados: any;
  tamanhoGrande: any;
  autorization: any;
  codigoUsuario: any;
  jsonHeader: any;

  constructor (private http: Http) {
    this.shots = [];
    this.shotDados = [];
    this.tokenUsuario = '6ade2196ca410421ca4caa7bc18cd31e3822cbc2380393507bc8fda60258114f';
    this.stringBusca = '';

    // valor do filtro para busca de shots (comments, recent ou views)
    this.filtro = 'recent';
    this.paginaShots = 1;
    this.shotsPorPagina = 30;

    // tamanho grande padrão
    this.tamanhoGrande = true;

    this.autorization =  { Authorization: 'Bearer 6ade2196ca410421ca4caa7bc18cd31e3822cbc2380393507bc8fda60258114f' };

    // informação do usuario caso autorizado
    this.codigoUsuario = window.location;
    this.codigoUsuario = this.codigoUsuario.toString().split("code=");
    this.codigoUsuario = this.codigoUsuario[1];

    // se o usuário não está autorizado, chama autenticação
    if(this.codigoUsuario==null || this.codigoUsuario=='') {
      window.location.href = "https://dribbble.com/oauth/authorize?client_id=cf1d5516801f1146cf1e01760078efbca1daac719a37e8c80c51672e3b1b6b8c&scope=public+write";
    }
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

  public popularDados(shot) {
    // guarda o shot que foi clicado para mostrar a descricao
    this.shotDados = shot;

    // verifica se o usuário já deu like no shot
    this.http.get('https://api.dribbble.com/v1/shots/'+ shot.id +'/like?access_token=' + this.tokenUsuario).subscribe(
      data => {
        this.shotDados.liked = JSON.parse(data['_body']).id;
      }
    );

    // retira as tags em html
    this.shotDados.description = String(this.shotDados.description).replace(/<[^>]+>/gm, '')
  }

  // muda o tamanho da shot baseado no parametro recebido
  public mudaTamanhoShots(grande) {
    this.tamanhoGrande = grande;
  }

  // funções executadas ao início
  public ngOnInit() {
      this.getShots();
  }

  /*** Resolução pendente: CORS ***/
  public curtirShot(shotId) {


   var json = JSON.stringify({ "client_id" : "cf1d5516801f1146cf1e01760078efbca1daac719a37e8c80c51672e3b1b6b8c", "client_secret" : "3bae822e14f0cf450f12928e9fae6218f1c249ccaadd69cee7797cc0646af136", "code" : this.codigoUsuario });
   var params = 'json=' + json;
   var headersoptions = new Headers();


   headersoptions.append('Access-Control-Allow-Origin', 'http://127.0.0.1:4200');
   headersoptions.append('Access-Control-Expose-Headers', 'ETag, Link, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset');
   headersoptions.append('Access-Control-Allow-Credentials', 'true');
   headersoptions.append('Content-Type', 'application/jsonp');


  this.http.post('https://dribbble.com/oauth/token/', json, headersoptions).subscribe(data => {
     alert('ok');
    }, error => {
   });


   this.http.post('https://api.dribbble.com/v1/shots/'+ shotId +'/like',JSON.stringify({ "client_id" : "cf1d5516801f1146cf1e01760078efbca1daac719a37e8c80c51672e3b1b6b8c", "client_secret" : "3bae822e14f0cf450f12928e9fae6218f1c249ccaadd69cee7797cc0646af136", "code" : this.codigoUsuario }), { headers: this.autorization}).subscribe(data => {
      alert('ok');
     }, error => {
    });
  }


}
