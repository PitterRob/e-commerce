import { Component, OnInit } from '@angular/core';

import { OfertasService } from '../ofertas.services'
import { Oferta } from '../shared/oferta.model'
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { CarrinhoService } from '../carrinho.service';


@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css']
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>

  private subjectPesquisa: Subject<string> = new Subject<string>()

  constructor(
    private ofertasService: OfertasService,
    public carrinhoService: CarrinhoService) { }

  ngOnInit() {
    this.ofertas = this.subjectPesquisa
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((termoDaBusca: string) => {
          if (termoDaBusca.trim() === '') {
            //retornar um observable de array de ofertas vazio caso preencha um campo vazio na pesquisa
            console.log('teste')
            return new Observable<Oferta[]>();
          }
          return this.ofertasService.pesquisaOfertas(termoDaBusca)
        }), catchError((err: any) => {
          console.log(err)
          return new Observable<Oferta[]>();
        }))
  }
  public pesquisa(termoDaBusca: string): void {

    this.subjectPesquisa.next(termoDaBusca)
  }
  public limpaPesquisa(): void {
    this.subjectPesquisa.next('')
  }
}
