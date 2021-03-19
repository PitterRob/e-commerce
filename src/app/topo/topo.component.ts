import { Component, OnInit } from '@angular/core';

import { OfertasService } from '../ofertas.services';
import { Oferta } from '../shared/oferta.model';
import { of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

import { CarrinhoService } from '../carrinho.service';


@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css']
})
export class TopoComponent implements OnInit {

  public ofertas: Oferta[];

  private subjectPesquisa: Subject<string> = new Subject<string>();

  constructor(
    private ofertasService: OfertasService,
    public carrinhoService: CarrinhoService) { }

  ngOnInit() {

    this.subjectPesquisa.pipe(
      map((event: any) => {
        return event;
      })
      , filter(res => res.length > 1)
      , debounceTime(500)
      , distinctUntilChanged()
    ).subscribe((termoDaBusca: string) => {
      if (termoDaBusca === '') {
        return of([]);
      } else {
        this.ofertasService.pesquisaOfertas(termoDaBusca)
          .subscribe((res) => {
            this.ofertas = res;
          }, (err) => {

          });
      }

    });

  }
  public pesquisa(termoDaBusca: string): void {

    this.subjectPesquisa.next(termoDaBusca);
  }
  public limpaPesquisa(): void {
    this.ofertas = [];
  }
}
