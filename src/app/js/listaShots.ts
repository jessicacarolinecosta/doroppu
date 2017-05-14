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
  dadosUsuario: any;
  tokenUsuario: string;

  constructor (private http: Http) {
    this.dadosUsuario = [];
    this.tokenUsuario = '6ade2196ca410421ca4caa7bc18cd31e3822cbc2380393507bc8fda60258114f';

    // workaround para não obter erro em console
    this.dadosUsuario.avatar_url = null;
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

  // funções executadas ao início
  public ngOnInit() {
      this.getPerfil();
  }
}
