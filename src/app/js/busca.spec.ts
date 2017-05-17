import { TestBed, async } from '@angular/core/testing';

import { Filtro } from './busca.pipe';

describe('Teste de filtros', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        Filtro
      ],
    }).compileComponents();
  }));

  it('Deve retornar um array não nulo, pois não está buscando nada', async(() => {
    let testFiltro: Filtro;
    let itens;
    this.itens = [];
    this.itens[0] = [];
    this.itens[0]['title'] = "teste";

    testFiltro = new Filtro();

    expect(testFiltro.transform(this.itens, 'title', '')).not.toEqual([]);

  }));

  it('Deve retornar um array não nulo, pois existe no array', async(() => {
    let testFiltro: Filtro;
    let itens;
    this.itens = [];
    this.itens[0] = [];
    this.itens[0]['title'] = "teste";

    testFiltro = new Filtro();

    expect(testFiltro.transform(this.itens, 'title', 'teste')).not.toEqual([]);

  }));

  it('Deve retornar um array nulo', async(() => {
    let testFiltro: Filtro;
    let itens;
    this.itens = [];
    this.itens[0] = [];
    this.itens[0]['title'] = "teste";

    testFiltro = new Filtro();

    expect(testFiltro.transform(this.itens, 'title', 'palavra')).toEqual([]);

  }));

});
