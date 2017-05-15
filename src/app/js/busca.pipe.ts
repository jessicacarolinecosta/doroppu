import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'filtro'
})
export class Filtro implements PipeTransform {
    transform(items: any[], campo : string, stringBusca : string): any[] {
        //se não tiver string de busca, retorna o array cheio
        if (stringBusca=='') return items;

        //pesquisando o texto no titulo do shot e retorna array filtrado
        return items.filter( item => { return new RegExp(stringBusca, "i").test(item[campo]) });
    }
}
